/**
 * Rate limiting pentru formulare — IP-based, sliding window.
 *
 * Folosește Vercel KV (Upstash Redis sub capotă) prin env vars
 * auto-injectate de Vercel când KV-ul e conectat la proiect:
 *   - KV_REST_API_URL
 *   - KV_REST_API_TOKEN
 *
 * În dev (fără KV configurat), rate limiter-ul e no-op — toate
 * cererile trec. În producție cu KV conectat, limitează la
 * 5 submissions per IP per minut (sliding window).
 *
 * Folosit din Server Actions: submitPrecomanda, submitColaborare.
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

type LimitResult = {
  success: boolean
  remaining: number
  resetSeconds: number
}

let ratelimit: Ratelimit | null = null

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    }),
    // 5 cereri per minut per IP, sliding window
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'aera-forms',
    analytics: true,
  })
}

/**
 * Verifică dacă IP-ul are dreptul să trimită un formular.
 *
 * @param identifier — IP-ul utilizatorului (sau alt identificator stabil)
 * @returns success: false dacă limita a fost depășită
 */
export async function checkRateLimit(
  identifier: string,
): Promise<LimitResult> {
  // Fără KV configurat → no-op (dev / pre-launch)
  if (!ratelimit) {
    return { success: true, remaining: Number.POSITIVE_INFINITY, resetSeconds: 0 }
  }

  try {
    const result = await ratelimit.limit(identifier)
    const resetSeconds = Math.max(0, Math.ceil((result.reset - Date.now()) / 1000))
    return {
      success: result.success,
      remaining: result.remaining,
      resetSeconds,
    }
  } catch (err) {
    // Dacă KV cade, nu blocăm utilizatorii — log și permitem cererea
    console.error('[ratelimit] Redis error, falling open:', err)
    return { success: true, remaining: 0, resetSeconds: 0 }
  }
}
