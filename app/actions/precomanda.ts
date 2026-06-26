'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/ratelimit'
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
      // Don't fail the user — log and continue
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
  }

  // 3. Send emails via Resend (graceful if not configured)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)

    // 3a. Notification to office
    try {
      await resend.emails.send({
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
    } catch (err) {
      console.error('[precomanda] Resend office email error:', err)
    }

    // 3b. Confirmation to user
    try {
      await resend.emails.send({
        from: 'AERA Beauty <noreply@aerabeauty.ro>',
        to: d.email,
        subject: 'Am primit cererea ta - AERA Beauty',
        html: buildUserConfirmationHtml(d.name),
      })
    } catch (err) {
      console.error('[precomanda] Resend user email error:', err)
    }
  } else {
    console.log('[precomanda] Resend not configured — skipping emails')
  }

  return { ok: true }
}
