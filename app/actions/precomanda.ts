'use server'

import { z } from 'zod'
import { headers } from 'next/headers'

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
  message: z.string().max(500, 'Mesajul poate avea maximum 500 de caractere').optional().default(''),
  gdprConsent: z.literal('on', {
    message: 'Acordul GDPR este obligatoriu',
  }),
  marketingOptIn: z.string().optional(),
})

export type PrecomandaResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

export async function submitPrecomanda(
  formData: FormData,
): Promise<PrecomandaResult> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = schema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (key && !fieldErrors[String(key)]) {
        fieldErrors[String(key)] = issue.message
      }
    }
    return { ok: false, error: 'Te rugăm să completezi câmpurile obligatorii.', fieldErrors }
  }

  // Audit log structure (for future Supabase insert)
  const hdrs = await headers()
  const auditLog = {
    timestamp: new Date().toISOString(),
    ip: hdrs.get('x-forwarded-for') ?? hdrs.get('x-real-ip') ?? 'unknown',
    userAgent: hdrs.get('user-agent') ?? 'unknown',
    gdprConsentVersion: GDPR_CONSENT_VERSION,
    marketingOptIn: parsed.data.marketingOptIn === 'on',
    payload: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
      brand: parsed.data.brand,
      product: parsed.data.product,
      message: parsed.data.message,
    },
  }

  // TODO: Insert into Supabase table `precomenzi`
  // TODO: Send notification email to office@aerabeauty.ro via Resend
  // TODO: Send confirmation email to user
  // TODO: If marketingOptIn, trigger double opt-in flow
  console.log('[precomanda] Audit log:', JSON.stringify(auditLog, null, 2))

  return { ok: true }
}
