/**
 * Sentry config — Node.js server side.
 *
 * Capture errori din Server Actions, API routes, middleware Node.
 * DSN-ul vine din NEXT_PUBLIC_SENTRY_DSN (același ca pe client).
 */

import * as Sentry from '@sentry/nextjs'
import type { Event } from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

/**
 * Headere care nu trebuie să ajungă în Sentry. SDK-ul atașează headerele requestului la
 * evenimentele de pe server, iar cron-ul de keep-alive primește `Authorization: Bearer
 * <CRON_SECRET>` (verificat pe 26 oct 2026: secretul apărea întreg în eveniment).
 */
const SENSITIVE_HEADERS = /^(authorization|cookie|set-cookie|proxy-authorization)$/i

function scrubRequest<T extends Event>(event: T): T {
  const request = event.request
  if (request?.headers) {
    for (const name of Object.keys(request.headers)) {
      if (SENSITIVE_HEADERS.test(name)) delete request.headers[name]
    }
  }
  if (request?.cookies) delete request.cookies
  return event
}

if (dsn) {
  Sentry.init({
    dsn,

    // Tracing rate similar cu clientul
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    debug: false,

    environment: process.env.NODE_ENV,

    // Intenționat FĂRĂ ignoreErrors pentru erori de rețea („fetch failed", ECONNRESET,
    // ETIMEDOUT). Pe server, apelurile de rețea țin de formulare (Supabase, Resend,
    // Turnstile) și de cron-ul de keep-alive: puține și toate importante. Când proiectul
    // Supabase e pe pauză, insert-ul din formular eșuează exact cu „TypeError: fetch
    // failed", iar filtrul vechi arunca tocmai alerta despre lead-urile pierdute
    // (reprodus pe 26 oct 2026 cu supabase-js 2.105 + @sentry/nextjs 10.61).

    beforeSend: scrubRequest,
    beforeSendTransaction: scrubRequest,
  })
}
