'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { Resend } from 'resend'
import { getSupabase } from '@/lib/supabase'
import {
  buildColaborareNotificationHtml,
  buildColaborareNotificationSubject,
} from '@/lib/email/colaborare-notification'
import { buildColaborareConfirmationHtml } from '@/lib/email/colaborare-confirmation'

const GDPR_CONSENT_VERSION = 'v1-2026-05'

const schema = z.object({
  brand: z.enum(['aqua-mineral', 'oliere-paris', 'redefine-matcha'], {
    message: 'Brand invalid',
  }),
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
  profile: z.string().min(1, 'Selectează profilul'),
  profileOther: z.string().optional().default(''),
  interest: z.array(z.string()).optional().default([]),
  products: z.array(z.string()).optional().default([]),
  benefits: z.array(z.string()).optional().default([]),
  followUp: z.enum(['whatsapp', 'email', 'telefon'], {
    message: 'Selectează modalitatea de follow-up',
  }),
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

export type ColaborareResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function hashIp(ip: string): string {
  const salt = process.env.GDPR_IP_SALT ?? 'aera-dev-salt'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

// Helper: collect array fields din FormData (checkboxes cu același name)
function collectArray(formData: FormData, name: string): string[] {
  return formData.getAll(name).map(String).filter(Boolean)
}

export async function submitColaborare(
  formData: FormData,
): Promise<ColaborareResult> {
  // 1. Pregătire payload — Object.fromEntries lasă afară câmpurile lipsă
  //    (Zod's .optional()/.default() le va gestiona corect — nu null).
  //    Apoi suprapunem array-urile pentru multi-checkbox.
  const raw: Record<string, unknown> = Object.fromEntries(formData.entries())
  raw.interest = collectArray(formData, 'interest')
  raw.products = collectArray(formData, 'products')
  raw.benefits = collectArray(formData, 'benefits')

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
  const marketingOptIn = d.marketingOptIn === 'on'

  // 2. Insert în Supabase (graceful dacă nu e configurat)
  let leadId: string | undefined
  const supabase = getSupabase()

  if (supabase) {
    const { data: row, error: dbError } = await supabase
      .from('colaborari')
      .insert({
        brand: d.brand,
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        city: d.city || null,
        profile: d.profile,
        profile_other: d.profileOther || null,
        interest: d.interest,
        products: d.products,
        benefits: d.benefits,
        follow_up: d.followUp,
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
      console.error('[colaborare] Supabase insert error:', dbError)
    } else {
      leadId = row?.id
    }
  } else {
    console.log(
      '[colaborare] Supabase not configured — logging audit data:',
      JSON.stringify(
        {
          timestamp,
          ipHashed,
          userAgent,
          gdprVersion: GDPR_CONSENT_VERSION,
          marketingOptIn,
          payload: d,
        },
        null,
        2,
      ),
    )
  }

  // 3. Send emails via Resend (graceful dacă nu e configurat)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)

    // 3a. Notificare la office
    try {
      await resend.emails.send({
        from: 'AERA Beauty <noreply@aerabeauty.ro>',
        to: 'office@aerabeauty.ro',
        subject: buildColaborareNotificationSubject(d.name, d.brand),
        html: buildColaborareNotificationHtml({
          brand: d.brand,
          name: d.name,
          email: d.email,
          phone: d.phone,
          city: d.city,
          profile: d.profile,
          profileOther: d.profileOther,
          interest: d.interest,
          products: d.products,
          benefits: d.benefits,
          followUp: d.followUp,
          message: d.message,
          marketingOptIn,
          timestamp,
          ipHashed,
          gdprVersion: GDPR_CONSENT_VERSION,
          leadId,
        }),
      })
    } catch (err) {
      console.error('[colaborare] Resend office email error:', err)
    }

    // 3b. Confirmare către user
    try {
      await resend.emails.send({
        from: 'AERA Beauty <noreply@aerabeauty.ro>',
        to: d.email,
        subject: 'Am primit cererea ta de colaborare - AERA Beauty',
        html: buildColaborareConfirmationHtml(d.name, d.brand),
      })
    } catch (err) {
      console.error('[colaborare] Resend user email error:', err)
    }
  } else {
    console.log('[colaborare] Resend not configured — skipping emails')
  }

  return { ok: true }
}
