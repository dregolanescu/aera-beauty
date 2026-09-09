import { createHmac, timingSafeEqual } from 'node:crypto'
import * as Sentry from '@sentry/nextjs'
import { Resend } from 'resend'

// Crypto + Resend → rulăm în Node runtime, niciodată edge. Endpoint dinamic.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ResendEvent = {
  type: string
  created_at?: string
  data?: {
    email_id?: string
    to?: string | string[]
    from?: string
    subject?: string
    bounce?: { type?: string; subType?: string; message?: string }
  }
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

/**
 * Verifică semnătura Svix folosită de Resend pentru webhook-uri, manual (fără dependința
 * `svix`). Secretul are forma `whsec_<base64>`. Conținutul semnat este
 * `${svix-id}.${svix-timestamp}.${payload}`, semnat HMAC-SHA256, comparat base64.
 */
function verifySignature(payload: string, headers: Headers, secret: string): boolean {
  const id = headers.get('svix-id')
  const timestamp = headers.get('svix-timestamp')
  const signature = headers.get('svix-signature')
  if (!id || !timestamp || !signature) return false

  // Anti-replay: acceptăm doar mesaje din ultimele 5 minute.
  const ts = Number(timestamp)
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false

  const key = secret.startsWith('whsec_') ? secret.slice(6) : secret
  const keyBytes = Buffer.from(key, 'base64')
  const signedContent = `${id}.${timestamp}.${payload}`
  const expected = createHmac('sha256', keyBytes)
    .update(signedContent)
    .digest('base64')

  // Headerul poate conține mai multe semnături, separate prin spațiu: „v1,<sig> v1,<sig2>".
  return signature.split(' ').some((part) => {
    const [, sig] = part.split(',')
    return sig ? timingSafeEqualStr(sig, expected) : false
  })
}

/**
 * Doar domeniul destinatarului, pentru loguri și pentru context în Sentry. Adresa
 * completă a unui vizitator e dată cu caracter personal: rămâne exclusiv în alerta
 * trimisă către office@ (operatorul datelor) și în dashboardul Resend.
 */
function recipientDomain(to: string): string {
  const first = to.split(',')[0]?.trim() ?? ''
  const domain = first.split('@')[1]?.trim()
  return domain ? domain : 'necunoscut'
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error('[resend-webhook] RESEND_WEBHOOK_SECRET lipsește')
    Sentry.captureMessage(
      '[resend-webhook] RESEND_WEBHOOK_SECRET not configured',
      'error',
    )
    return new Response('Webhook not configured', { status: 500 })
  }

  const payload = await req.text()
  if (!verifySignature(payload, req.headers, secret)) {
    return new Response('Invalid signature', { status: 401 })
  }

  let event: ResendEvent
  try {
    event = JSON.parse(payload) as ResendEvent
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  if (event.type === 'email.bounced' || event.type === 'email.complained') {
    const toRaw = event.data?.to
    const to = Array.isArray(toRaw) ? toRaw.join(', ') : (toRaw ?? 'necunoscut')
    const subject = event.data?.subject ?? '(fără subiect)'
    const reason =
      event.data?.bounce?.message ?? event.data?.bounce?.type ?? event.type
    const kind = event.type === 'email.complained' ? 'plângere (spam)' : 'bounce'
    const emailId = event.data?.email_id ?? 'necunoscut'

    // Un bounce nu e o eroare de aplicație, ci un eveniment de business: Resend îl are
    // deja în dashboard și în suppression list, iar office@ primește alerta de mai jos.
    // Nu îl mai raportăm în Sentry — fiecare adresă tastată greșit de un vizitator
    // redeschidea același issue ca „regresie". În Sentry ajunge doar eșecul alertei.
    // Pentru corelare logăm email_id-ul din Resend și domeniul, nu adresa.
    console.warn(
      `[resend-webhook] ${event.type} · email_id=${emailId} · domeniu=${recipientDomain(to)}`,
    )

    // Alertă la office ca echipa să reia contactul pe alt canal. Nu trimitem dacă
    // însuși destinatarul problematic e office@ (ar fi inutil / risc de buclă).
    const resendKey = process.env.RESEND_API_KEY
    const isOffice = String(toRaw ?? '').includes('office@aerabeauty.ro')
    if (resendKey && !isOffice) {
      try {
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: 'AERA Beauty <noreply@aerabeauty.ro>',
          to: 'office@aerabeauty.ro',
          subject: `Atenție: email către ${to} a dat ${kind}`,
          text:
            `Un email trimis din site nu a ajuns la destinatar.\n\n` +
            `Destinatar: ${to}\n` +
            `Subiect: ${subject}\n` +
            `Motiv: ${reason}\n` +
            `Tip eveniment: ${event.type}\n` +
            `ID Resend: ${emailId}\n\n` +
            `Dacă era o confirmare de formular, contactează persoana pe alt canal ` +
            `(telefon/WhatsApp) sau verifică dacă adresa a fost tastată greșit.`,
        })
      } catch (err) {
        console.error(
          `[resend-webhook] alerta către office@ a eșuat · email_id=${emailId}:`,
          err,
        )
        Sentry.captureException(err, {
          tags: {
            area: 'resend_webhook',
            step: 'alert_email',
            event_type: event.type,
          },
          extra: { email_id: emailId, recipient_domain: recipientDomain(to) },
        })
      }
    }
  }

  return new Response('ok', { status: 200 })
}
