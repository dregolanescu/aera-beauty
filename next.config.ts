import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

/**
 * Security headers aplicate pe toate rutele.
 *
 * Notă: NU includem Content-Security-Policy ENFORCED aici — implementarea curată
 * necesită nonce-uri generate per request din middleware. În schimb folosim
 * Content-Security-Policy-Report-Only ca să observăm ce ar fi blocat fără să
 * spargem nimic. După 2-3 zile cu rapoarte curate, putem trece la enforce.
 *
 * Pentru verificarea scorului: https://securityheaders.com
 */

// CSP în mod report-only — pragmatic pentru Next.js (permite inline scripts pentru hydration)
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.live https://*.vercel.app https://api.resend.com https://*.supabase.co wss://*.supabase.co https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()',
  },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // ─── Cross-Origin headers ─────────────────────────────────────────
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
  // ─── CSP în mod report-only ──────────────────────────────────────
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

/**
 * Wrap cu Sentry — upload automat source maps la build,
 * instrumentare erori pe runtime. Dacă SENTRY_AUTH_TOKEN
 * lipsește, Sentry nu va încărca source maps dar buildul nu se rupe.
 */
export default withSentryConfig(nextConfig, {
  // Org + project slugs — citite din env (setate în Vercel)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Doar log-uri esențiale în CI
  silent: !process.env.CI,

  // Disable Sentry features care nu ne trebuie pentru un marketing site
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: false },
  // Tunnel route — ocolește ad-blockers care blochează sentry.io directly
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
})
