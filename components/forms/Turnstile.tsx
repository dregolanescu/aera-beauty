'use client'

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import type { TurnstileAction } from '@/lib/turnstile-config'

/**
 * Cloudflare Turnstile: verificare anti-bot, invizibilă pentru aproape toți
 * vizitatorii (appearance: interaction-only). Apare o casetă de bifat doar
 * când Cloudflare are nevoie de o confirmare.
 *
 * Fără NEXT_PUBLIC_TURNSTILE_SITE_KEY nu randează nimic, iar formularul merge
 * ca înainte (serverul verifică doar când sunt setate ambele chei).
 *
 * Tokenul e de unică folosință și expiră în 300 s. Formularul îl cere cu
 * getToken() la trimitere și apelează reset() după fiecare încercare; expirarea
 * e reîmprospătată automat de widget.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

type RenderOptions = {
  sitekey: string
  action: string
  appearance: 'always' | 'execute' | 'interaction-only'
  language: string
  theme: 'auto' | 'light' | 'dark'
  size: 'normal' | 'flexible' | 'compact'
  'response-field': boolean
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': (code: string) => boolean
  'before-interactive-callback': () => void
}

type TurnstileApi = {
  render: (container: HTMLElement, options: RenderOptions) => string | null | undefined
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null

/** Încarcă api.js o singură dată, doar când un formular are nevoie de el. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!scriptPromise) {
    scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => {
        if (window.turnstile) resolve(window.turnstile)
        else reject(new Error('Turnstile: API indisponibil după încărcare'))
      }
      script.onerror = () => {
        // Permitem o nouă încercare la următoarea deschidere a formularului.
        scriptPromise = null
        script.remove()
        reject(new Error('Turnstile: scriptul nu s-a putut încărca'))
      }
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

export type TurnstileHandle = {
  /**
   * Tokenul pentru trimitere. Dacă verificarea invizibilă e încă în curs,
   * așteaptă până la `timeoutMs`. `null` = niciun token (vezi needsInteraction).
   * Fără cheie publică configurată întoarce mereu `null`.
   */
  getToken: (timeoutMs?: number) => Promise<string | null>
  /** `true` când Cloudflare a afișat caseta și așteaptă bifarea ei. */
  needsInteraction: () => boolean
  /** Cere un token nou (tokenul e de unică folosință). */
  reset: () => void
}

type Props = {
  action: TurnstileAction
  ref?: Ref<TurnstileHandle>
}

export function Turnstile({ action, ref }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const tokenRef = useRef<string | null>(null)
  const interactiveRef = useRef(false)
  const waitersRef = useRef(new Set<(token: string | null) => void>())
  const [visible, setVisible] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      getToken(timeoutMs = 10_000) {
        if (!SITE_KEY) return Promise.resolve(null)
        if (tokenRef.current) return Promise.resolve(tokenRef.current)
        if (interactiveRef.current) return Promise.resolve(null)
        return new Promise<string | null>((resolve) => {
          const done = (token: string | null) => {
            clearTimeout(timer)
            waitersRef.current.delete(done)
            resolve(token)
          }
          const timer = setTimeout(() => done(null), timeoutMs)
          waitersRef.current.add(done)
        })
      },
      needsInteraction: () => interactiveRef.current && !tokenRef.current,
      reset() {
        tokenRef.current = null
        interactiveRef.current = false
        const id = widgetIdRef.current
        if (id && window.turnstile) window.turnstile.reset(id)
      },
    }),
    [],
  )

  // Spațiul de sub widget apare doar când Cloudflare chiar îl afișează.
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setVisible(el.offsetHeight > 0))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false
    const waiters = waitersRef.current

    loadTurnstile()
      .then((api) => {
        const el = containerRef.current
        if (cancelled || !el) return
        widgetIdRef.current =
          api.render(el, {
            sitekey: SITE_KEY,
            action,
            appearance: 'interaction-only',
            language: 'ro',
            theme: 'light',
            // „flexible" are minimum 300px; pe ecrane foarte înguste folosim „compact".
            size: el.offsetWidth >= 300 ? 'flexible' : 'compact',
            'response-field': false,
            callback: (token) => {
              tokenRef.current = token
              interactiveRef.current = false
              waiters.forEach((resolve) => resolve(token))
            },
            'expired-callback': () => {
              // Widgetul se reîmprospătează singur (refresh-expired: auto).
              tokenRef.current = null
            },
            'error-callback': () => {
              // Widgetul reîncearcă singur (retry: auto). Serverul decide la trimitere.
              tokenRef.current = null
              return true
            },
            'before-interactive-callback': () => {
              interactiveRef.current = true
              waiters.forEach((resolve) => resolve(null))
            },
          }) ?? null
      })
      .catch((err: unknown) => {
        // Fără widget, trimiterea primește mesajul de verificare nereușită.
        console.warn('[turnstile]', err)
      })

    return () => {
      cancelled = true
      const id = widgetIdRef.current
      widgetIdRef.current = null
      tokenRef.current = null
      interactiveRef.current = false
      waiters.forEach((resolve) => resolve(null))
      if (id && window.turnstile) window.turnstile.remove(id)
    }
  }, [action])

  if (!SITE_KEY) return null
  return <div ref={containerRef} className={visible ? 'mb-4' : undefined} />
}
