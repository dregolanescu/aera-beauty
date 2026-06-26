import type { NextConfig } from 'next'

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
  // Scripts: self + Vercel infra + Next.js inline (necesare pentru hydration)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.live",
  // Styles: self + inline (Tailwind injectează stiluri inline în prod)
  "style-src 'self' 'unsafe-inline'",
  // Imagini: self + data URLs pentru optimizări Next.js
  "img-src 'self' data: blob: https:",
  // Fonts: self (next/font local-served)
  "font-src 'self' data:",
  // Connect: self + Vercel infra + Resend (server-side, dar safety) + Supabase
  "connect-src 'self' https://vercel.live https://*.vercel.app https://api.resend.com https://*.supabase.co wss://*.supabase.co",
  // Frame-ancestors deja blocat de X-Frame-Options DENY
  "frame-ancestors 'none'",
  // Form actions doar către self
  "form-action 'self'",
  // Base URI doar self (previne base tag injection)
  "base-uri 'self'",
  // Objects (Flash/etc) — blocate complet
  "object-src 'none'",
  // Upgrade HTTP → HTTPS automat în CSP
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // ─── Cross-Origin headers ─────────────────────────────────────────
  // COOP: izolează contextul de browsing de ferestre cross-origin
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  // CORP: resursele noastre pot fi încărcate doar de same-origin
  // (previne hotlinking + scuturi cross-origin attacks)
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  // COEP: credentialless permite resurse cross-origin fără CORP
  // (mai flexibil decât require-corp; safe pentru marketing site fără embeds)
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
  // ─── CSP în mod report-only ──────────────────────────────────────
  // Observăm ce ar fi blocat; după 2-3 zile cu rapoarte curate trecem la enforce
  {
    key: 'Content-Security-Policy-Report-Only',
    value: cspReportOnly,
  },
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

export default nextConfig
