/**
 * Sentry config — browser side.
 *
 * Capture errors care apar în React components, browser scripts,
 * și hidratare. DSN-ul vine din NEXT_PUBLIC_SENTRY_DSN.
 *
 * Dacă DSN-ul nu e setat (dev local fără config), Sentry e no-op
 * automat — nu face nimic, nu aruncă erori.
 */

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,

    // Sample rate pentru tracing (performance monitoring)
    // 10% pe prod — suficient pentru a vedea tendințe fără să ne consume quota
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session replay — capturăm doar când există o eroare (0% normal, 100% pe erori)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,

    // Debug doar în dev
    debug: false,

    // Filtre — ignorăm erori cunoscute / nerelevante
    ignoreErrors: [
      // Browser extension noise
      'top.GLOBALS',
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      // Network errors care nu sunt action items
      'Failed to fetch',
      'NetworkError',
      'Load failed',
      // Hidratare React 18+ false positives
      'Hydration failed',
      'Text content does not match',
      // Browserul din aplicații (Instagram, Facebook) pe Android: scriptul lor vorbește cu
      // aplicația printr-o punte JS–Java, iar obiectul Java dispare când vizitatorul închide
      // browserul. Filtrat după mesaj pentru cazurile fără stack trace, pe care allowUrls
      // nu le poate judeca. Varianta-soră („Java exception was raised during method
      // invocation") e deja în filtrele implicite ale SDK-ului. (AERA-BEAUTY-7)
      'Java object is gone',
    ],

    // Trimitem doar erorile aruncate din codul site-ului: bundle-urile servite din
    // /_next/static/ (și după ce SDK-ul le rescrie căile în app:///_next/static/...).
    // Ce injectează alții în pagină — browserele din Instagram/Facebook (app://...),
    // extensiile de browser, funcțiile din Opera & co. — rulează din alte surse și nu e
    // de reparat la noi (AERA-BEAUTY-6, AERA-BEAUTY-7). SDK-ul se uită la cadrul de sus
    // al stack trace-ului, acolo unde a fost aruncată eroarea; erorile fără stack trace
    // (de ex. Sentry.captureMessage) trec în continuare. Turnstile nu e pe listă: erorile
    // lui sunt tratate în components/forms/Turnstile.tsx.
    allowUrls: [/\/_next\/static\//],

    integrations: [
      // Replay capturează DOM + clicks pentru debugging vizual
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Mediul (development / production / preview)
    environment: process.env.NODE_ENV,
  })
}
