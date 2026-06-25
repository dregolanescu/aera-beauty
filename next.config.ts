import type { NextConfig } from 'next'

/**
 * Security headers aplicate pe toate rutele.
 *
 * Notă: NU includem Content-Security-Policy aici — implementarea curată
 * necesită nonce-uri generate per request din middleware (Next.js folosește
 * inline scripts pentru hydration). CSP se adaugă într-o iterație dedicată
 * cu testare atentă pentru a nu sparge motion / Resend / Supabase.
 *
 * Pentru verificarea scorului: https://securityheaders.com
 */
const securityHeaders = [
  // Forțează HTTPS pe 2 ani, include subdomenii, candidat pentru HSTS preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Previne clickjacking — nimeni nu poate iframe-ui aerabeauty.ro
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Previne MIME-type sniffing (atacuri de tip „upload script ca imagine")
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Trimite Referer-ul complet doar pe same-origin; pe cross-origin doar origin-ul (fără path)
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Blochează API-urile browser care nu ne trebuie — protecție în profunzime
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()',
  },
  // Legacy XSS filter — deprecated în Chrome 78+ dar trimis pentru browsers vechi
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
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
