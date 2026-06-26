/**
 * Sentry config — Edge runtime (middleware, edge functions).
 *
 * Vercel rulează unele rute pe edge (V8 isolates, nu Node).
 * Acest config se aplică acolo. DSN-ul vine din NEXT_PUBLIC_SENTRY_DSN.
 */

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    debug: false,
    environment: process.env.NODE_ENV,
  })
}
