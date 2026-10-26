/**
 * Sentry config — Node.js server side.
 *
 * Capture errori din Server Actions, API routes, middleware Node.
 * DSN-ul vine din NEXT_PUBLIC_SENTRY_DSN (același ca pe client).
 */

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

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
  })
}
