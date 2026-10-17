/**
 * Verificarea Cloudflare Turnstile (anti-bot) pe server, pentru formulare.
 *
 * Activă doar când sunt setate AMBELE variabile de mediu:
 *   - NEXT_PUBLIC_TURNSTILE_SITE_KEY: cheia publică (intră în build, randează widgetul)
 *   - TURNSTILE_SECRET_KEY: cheia secretă (doar pe server)
 * Cu una singură, formularele merg exact ca înainte: serverul nu cere un token
 * pe care pagina nu are cum să-l trimită.
 *
 * Token lipsă sau respins de Cloudflare: cererea e blocată (altfel un bot ar
 * trimite pur și simplu fără token).
 * Cloudflare indisponibil (rețea, timeout, eroare internă) sau cheie secretă
 * greșită: cererea trece și raportăm în Sentry. Nu pierdem lead-uri, iar
 * honeypot-ul și rate limit-ul rămân active.
 */

import * as Sentry from '@sentry/nextjs'
import type { TurnstileAction } from '@/lib/turnstile-config'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Tokenurile Turnstile au maximum 2048 de caractere. */
const MAX_TOKEN_LENGTH = 2048

type SiteverifyResponse = {
  success: boolean
  'error-codes'?: string[]
  action?: string
  hostname?: string
}

export type TurnstileResult = { ok: true } | { ok: false; reason: string }

export async function verifyTurnstile(
  token: FormDataEntryValue | null,
  { action, ip }: { action: TurnstileAction; ip?: string },
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return { ok: true }

  if (typeof token !== 'string' || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: 'missing-input-response' }
  }

  const body = new URLSearchParams({ secret, response: token })
  if (ip && ip !== 'unknown') body.set('remoteip', ip)

  let data: SiteverifyResponse
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data = (await res.json()) as SiteverifyResponse
  } catch (err) {
    return passWithoutCheck(action, 'siteverify indisponibil', String(err))
  }

  if (!data.success) {
    const codes = data['error-codes'] ?? []
    if (codes.includes('invalid-input-secret') || codes.includes('missing-input-secret')) {
      // Configurare greșită în Vercel, nu un bot: nu blocăm vizitatorii.
      return passWithoutCheck(action, 'cheie secretă invalidă', codes.join(','), 'error')
    }
    if (codes.includes('internal-error')) {
      return passWithoutCheck(action, 'eroare internă Cloudflare', codes.join(','))
    }
    return { ok: false, reason: codes.join(',') || 'unknown' }
  }

  // Tokenul trebuie să vină din widgetul acestui formular.
  if (data.action && data.action !== action) {
    return { ok: false, reason: `action-mismatch:${data.action}` }
  }

  return { ok: true }
}

function passWithoutCheck(
  action: TurnstileAction,
  what: string,
  detail: string,
  level: 'warning' | 'error' = 'warning',
): TurnstileResult {
  console.error(`[turnstile] ${what} (${action}) — cererea trece fără verificare:`, detail)
  // Mesaj fix, fără textul erorii originale: Sentry ignoră „fetch failed" & co.
  Sentry.captureMessage(`[turnstile] ${what} — cerere acceptată fără verificare`, {
    level,
    tags: { area: 'turnstile', form: action },
    extra: { detail },
  })
  return { ok: true }
}
