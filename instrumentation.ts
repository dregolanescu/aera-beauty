/**
 * Next.js instrumentation hook — încarcă Sentry pe runtime corect
 * (Node.js pentru server, Edge pentru middleware/edge functions).
 *
 * Acest fișier e auto-detectat de Next.js când există în root.
 * Documentație: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */

import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

// Export hook-ul pentru Next.js 15+ ca să captăm erori de request
export const onRequestError = Sentry.captureRequestError
