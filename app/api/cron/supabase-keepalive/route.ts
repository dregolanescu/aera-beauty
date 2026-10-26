import { timingSafeEqual } from 'node:crypto'
import * as Sentry from '@sentry/nextjs'
import { getSupabase } from '@/lib/supabase'

/**
 * Keep-alive Supabase rulat de Vercel Cron, din oră în oră (programul e în vercel.json).
 *
 * De ce există: proiectul Supabase e pe planul Free, care e pus pe pauză după 7 zile
 * cu „activitate insuficientă". Site-ul atinge baza de date doar când cineva trimite
 * un formular, așa că singura activitate era keep-alive-ul din GitHub Actions: un
 * singur request pe zi. Supabase a trimis avertisment de pauză și așa (aug + oct 2026);
 * documentația lor cere „a few user requests to the database each day".
 *
 * La fiecare rulare:
 *   1. scrie (upsert) rândul propriu în `public.keepalive` (id = 2, source = vercel-cron);
 *   2. citește toate rândurile din `keepalive`;
 *   3. verifică rândul scris de GitHub Actions (id = 1): dacă n-a mai fost actualizat de
 *      peste 24h (workflow dezactivat de GitHub, secrete greșite etc.), alertă în Sentry.
 * Simetric, workflow-ul din GitHub verifică rândul ăsta și devine roșu dacă Vercel tace.
 *
 * Nu atinge niciodată `precomenzi` / `colaborari` (date GDPR).
 *
 * Securitate: Vercel trimite automat `Authorization: Bearer <CRON_SECRET>` la fiecare
 * invocare. Fără CRON_SECRET setat în proiect, endpoint-ul refuză tot (fail closed).
 *
 * ATENȚIE la mutarea pe alt cont Vercel: planul Hobby acceptă doar cron-uri zilnice, iar
 * un program din oră în oră face deploy-ul să pice. Pe Hobby, pune în vercel.json un
 * program zilnic (de ex. „7 9 * * *"); GitHub Actions rămâne sursa de volum.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const VERCEL_ROW_ID = 2
const GITHUB_ROW_ID = 1
/** Workflow-ul din GitHub rulează la 3 ore, dar GitHub poate întârzia programările cu ore. */
const GITHUB_STALE_AFTER_HOURS = 24
const DB_TIMEOUT_MS = 10_000

type KeepaliveRow = { id: number; last_ping: string; source: string | null }
type DbError = { message?: string; code?: string }

function isAuthorized(header: string | null, secret: string): boolean {
  const received = Buffer.from(header ?? '')
  const expected = Buffer.from(`Bearer ${secret}`)
  return received.length === expected.length && timingSafeEqual(received, expected)
}

/**
 * Mesajul trimis în Sentry e fix, iar eroarea brută merge în `extra`: când proiectul e
 * pe pauză, eroarea de la supabase-js e „TypeError: fetch failed", iar un mesaj stabil
 * grupează toate rulările eșuate într-un singur issue.
 */
function reportDbFailure(step: 'write' | 'read', error: DbError): void {
  console.error(`[keepalive] Supabase ${step} failed:`, error)
  Sentry.captureMessage(`[keepalive] Supabase ${step} failed (proiect pe pauză sau inaccesibil?)`, {
    level: 'error',
    tags: { job: 'supabase-keepalive', step },
    extra: { error_message: error.message ?? null, error_code: error.code ?? null },
    fingerprint: ['supabase-keepalive', 'db-failure', step],
  })
}

async function respond(body: Record<string, unknown>, status: number, reported: boolean) {
  // Funcția e înghețată imediat după răspuns, deci trimitem evenimentele Sentry înainte.
  if (reported) await Sentry.flush(2000)
  return Response.json(body, { status })
}

export async function GET(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.error('[keepalive] CRON_SECRET lipsește din variabilele de mediu')
    Sentry.captureMessage('[keepalive] CRON_SECRET not configured', {
      level: 'error',
      tags: { job: 'supabase-keepalive' },
      fingerprint: ['supabase-keepalive', 'cron-secret-missing'],
    })
    return respond({ ok: false, error: 'cron_not_configured' }, 500, true)
  }

  if (!isAuthorized(req.headers.get('authorization'), secret)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = getSupabase()
  if (!supabase) {
    console.error('[keepalive] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY lipsesc')
    Sentry.captureMessage('[keepalive] Supabase env not configured', {
      level: 'error',
      tags: { job: 'supabase-keepalive' },
      fingerprint: ['supabase-keepalive', 'supabase-env-missing'],
    })
    return respond({ ok: false, error: 'supabase_not_configured' }, 500, true)
  }

  const now = new Date()

  try {
    // 1) Scriere reală — rândul Vercel
    const { error: writeError } = await supabase
      .from('keepalive')
      .upsert(
        { id: VERCEL_ROW_ID, last_ping: now.toISOString(), source: 'vercel-cron' },
        { onConflict: 'id' },
      )
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
    if (writeError) {
      reportDbFailure('write', writeError)
      return respond({ ok: false, step: 'write' }, 503, true)
    }

    // 2) Citire — toate rândurile
    const { data, error: readError } = await supabase
      .from('keepalive')
      .select('id, last_ping, source')
      .order('id')
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
    if (readError) {
      reportDbFailure('read', readError)
      return respond({ ok: false, step: 'read' }, 503, true)
    }

    // 3) Heartbeat-ul din GitHub Actions trebuie să fie proaspăt
    const rows = (data ?? []) as KeepaliveRow[]
    const github = rows.find((row) => row.id === GITHUB_ROW_ID)
    const githubLastPing = github ? Date.parse(github.last_ping) : Number.NaN
    const githubAgeHours = Number.isNaN(githubLastPing)
      ? null
      : Math.round(((now.getTime() - githubLastPing) / 3_600_000) * 10) / 10

    const githubStale = githubAgeHours === null || githubAgeHours > GITHUB_STALE_AFTER_HOURS
    if (githubStale) {
      console.warn('[keepalive] GitHub Actions keep-alive stale:', githubAgeHours, 'h')
      Sentry.captureMessage('[keepalive] GitHub Actions keep-alive nu mai scrie în Supabase', {
        level: 'warning',
        tags: { job: 'supabase-keepalive' },
        extra: { github_age_hours: githubAgeHours, github_last_ping: github?.last_ping ?? null },
        fingerprint: ['supabase-keepalive', 'github-stale'],
      })
    }

    return respond(
      { ok: true, wrote: now.toISOString(), github_age_hours: githubAgeHours },
      200,
      githubStale,
    )
  } catch (err) {
    console.error('[keepalive] unexpected error:', err)
    Sentry.captureException(err, {
      tags: { job: 'supabase-keepalive', step: 'unexpected' },
      fingerprint: ['supabase-keepalive', 'unexpected'],
    })
    return respond({ ok: false, step: 'unexpected' }, 500, true)
  }
}
