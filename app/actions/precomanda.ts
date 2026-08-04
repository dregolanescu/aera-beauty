'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { Resend } from 'resend'
import * as Sentry from '@sentry/nextjs'
import { getSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/ratelimit'
import { domainAcceptsEmail } from '@/lib/email-mx'
import {
  buildLeadNotificationHtml,
  buildLeadNotificationSubject,
} from '@/lib/email/lead-notification'
import { buildUserConfirmationHtml } from '@/lib/email/user-confirmation'

const GDPR_CONSENT_VERSION = 'v1-2026-05'

const schema = z.object({
  name: z
    .string()
    .min(3, 'Numele este obligatoriu')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Te rugăm să introduci numele și prenumele',
    ),
  email: z.string().email('Format email invalid'),
  phone: z.string().optional().default(''),
  city: z.string().optional().default(''),
  brand: z.enum(['aqua-mineral', 'oliere-paris', 'redefine-matcha', 'toate'], {
    message: 'Selectează un brand',
  }),
  product: z.string().optional().default(''),
  message: z
    .string()
    .max(500, 'Mesajul poate avea maximum 500 de caractere')
    .optional()
    .default(''),
  gdprConsent: z.literal('on', {
    message: 'Acordul GDPR este obligatoriu',
  }),
  marketingOptIn: z.string().optional(),
})

export type PrecomandaResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function hashIp(ip: string): string {
  const salt = process.env.GDPR_IP_SALT ?? 'aera-dev-salt'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export async function submitPrecomanda(
  formData: FormData,
): Promise<PrecomandaResult> {
  // 0. Honeypot — dacă botul a completat câmpul „website", returnăm silent
  //    success ca să nu afle că a fost prins. Nu trimitem email, nu salvăm în DB.
  const honeypot = formData.get('website')
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    console.log('[precomanda] Honeypot triggered — silently rejecting submission')
    return { ok: true }
  }

  // 1. Validate
  const raw = Object.fromEntries(formData.entries())
  // Eliminăm câmpul honeypot din raw înainte de parse (Zod nu trebuie să-l vadă)
  delete (raw as Record<string, unknown>).website
  const parsed = schema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (key && !fieldErrors[String(key)]) {
        fieldErrors[String(key)] = issue.message
      }
    }
    return {
      ok: false,
      error: 'Te rugăm să completezi câmpurile obligatorii.',
      fieldErrors,
    }
  }

  const d = parsed.data
  const hdrs = await headers()
  const rawIp =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    hdrs.get('x-real-ip') ??
    'unknown'
  const ipHashed = hashIp(rawIp)
  const userAgent = hdrs.get('user-agent') ?? 'unknown'
  const timestamp = new Date().toISOString()

  // 1.5. Rate limiting — max 5 cereri pe minut per IP
  const rl = await checkRateLimit(rawIp)
  if (!rl.success) {
    console.warn('[ratelimit] Blocked submission from', ipHashed, 'reset in', rl.resetSeconds, 's')
    return {
      ok: false,
      error: `Prea multe \u00eencerc\u0103ri. Te rug\u0103m s\u0103 \u00eencerci din nou \u00een ${rl.resetSeconds} secunde.`,
    }
  }
  const marketingOptIn = d.marketingOptIn === 'on'

  // 1.6. Verificare domeniu email (MX) — respinge domenii care nu primesc email.
  //      Fail-open: un lookup DNS neconcludent nu blochează lead-ul.
  if (!(await domainAcceptsEmail(d.email))) {
    return {
      ok: false,
      error: 'Adresa de email pare invalidă.',
      fieldErrors: {
        email:
          'Domeniul acestei adrese nu pare să primească email-uri. Verifică adresa.',
      },
    }
  }

  // 2. Insert into Supabase (graceful if not configured)
  let leadId: string | undefined
  const supabase = getSupabase()

  if (supabase) {
    const { data: row, error: dbError } = await supabase
      .from('precomenzi')
      .insert({
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        city: d.city || null,
        brand: d.brand,
        product: d.product || null,
        message: d.message || null,
        marketing_optin: marketingOptIn,
        gdpr_accepted_at: timestamp,
        gdpr_text_version: GDPR_CONSENT_VERSION,
        ip_hashed: ipHashed,
        user_agent: userAgent,
        status: 'new',
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('[precomanda] Supabase insert error:', dbError)
      // Don't fail the user — log, alert, and continue
      Sentry.captureException(
        new Error(`[precomanda] Supabase insert failed: ${dbError.message}`),
        {
          level: 'error',
          tags: { form: 'precomanda', step: 'db_insert' },
          extra: { code: dbError.code, details: dbError.details, hint: dbError.hint },
        },
      )
    } else {
      leadId = row?.id
    }
  } else {
    console.log(
      '[precomanda] Supabase not configured — logging audit data:',
      JSON.stringify(
        {
          timestamp,
          ipHashed,
          userAgent,
          gdprVersion: GDPR_CONSENT_VERSION,
          marketingOptIn,
          payload: {
            name: d.name,
            email: d.email,
            phone: d.phone,
            city: d.city,
            brand: d.brand,
            product: d.product,
            message: d.message,
          },
        },
        null,
        2,
      ),
    )
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(
        '[precomanda] Supabase not configured in production — lead not persisted',
        'warning',
      )
    }
  }

  // 3. Send emails via Resend (graceful if not configured)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)

    // 3a. Notification to office
    try {
      const { error: officeErr } = await resend.emails.send({
        from: 'AERA Beauty <noreply@aerabeauty.ro>',
        to: 'office@aerabeauty.ro',
        subject: buildLeadNotificationSubject(d.name, d.brand),
        html: buildLeadNotificationHtml({
          name: d.name,
          email: d.email,
          phone: d.phone,
          city: d.city,
          brand: d.brand,
          product: d.product,
          message: d.message,
          marketingOptIn,
          timestamp,
          ipHashed,
          gdprVersion: GDPR_CONSENT_VERSION,
          leadId,
        }),
      })
      if (officeErr) {
        console.error('[precomanda] Resend office email error:', officeErr)
        Sentry.captureException(
          new Error(`[precomanda] Resend office send failed: ${officeErr.message}`),
          { tags: { form: 'precomanda', step: 'email_office' }, extra: { officeErr } },
        )
      }
    } catch (err) {
      console.error('[precomanda] Resend office email threw:', err)
      Sentry.captureException(err, {
        tags: { form: 'precomanda', step: 'email_office' },
      })
    }

    // 3b. Confirmation to user
    try {
      const { error: userErr } = await resend.emails.send({
        from: 'AERA Beauty <noreply@aerabeauty.ro>',
        to: d.email,
        subject: 'Am primit cererea ta - AERA Beauty',
        html: buildUserConfirmationHtml(d.name),
      })
      if (userErr) {
        console.error('[precomanda] Resend user email error:', userErr)
        Sentry.captureException(
          new Error(`[precomanda] Resend user confirmation send failed: ${userErr.message}`),
          { tags: { form: 'precomanda', step: 'email_user' }, extra: { userErr } },
        )
      }
    } catch (err) {
      console.error('[precomanda] Resend user email threw:', err)
      Sentry.captureException(err, {
        tags: { form: 'precomanda', step: 'email_user' },
      })
    }
  } else {
    console.log('[precomanda] Resend not configured — skipping emails')
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(
        '[precomanda] Resend not configured in production — no emails sent',
        'warning',
      )
    }
  }

  return { ok: true }
}
