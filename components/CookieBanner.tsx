'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'aera-cookie-ack'
const ACK_VERSION = 'v1'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    // Verifică pe client-side (evită hydration mismatch)
    try {
      const ack = window.localStorage.getItem(STORAGE_KEY)
      if (ack !== ACK_VERSION) {
        // Mic delay ca să nu apară instant la load
        const t = setTimeout(() => setVisible(true), 700)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage blocked (private mode etc.) — afișăm banner-ul
      setVisible(true)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, ACK_VERSION)
    } catch {
      // dacă storage e blocked, banner-ul va reapărea la următoarea vizită
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Notificare cookies"
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-50 sm:max-w-md"
        >
          <div
            className="bg-ivory-50 border border-stone-200 rounded-lg shadow-lg px-5 py-5 sm:px-6 sm:py-6 relative"
            style={{
              boxShadow:
                '0 1px 0 rgba(91,70,56,0.06), 0 12px 32px rgba(91,70,56,0.12)',
            }}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Închide notificarea"
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-taupe-500 hover:text-cocoa-700 transition-colors rounded-full"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            <p className="eyebrow mb-2">Cookies</p>
            <p className="body text-cocoa-700 text-sm leading-relaxed pr-6">
              Folosim doar cookies strict necesare pentru funcționarea
              site-ului. Nu colectăm date pentru analytics sau publicitate.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center px-5 py-2.5 bg-cocoa-700 text-ivory-50 text-xs uppercase tracking-[0.10em] font-medium rounded-md hover:bg-cocoa-900 transition-colors"
              >
                Am înțeles
              </button>
              <Link
                href="/cookies"
                className="text-sm text-cocoa-700 underline underline-offset-4 hover:text-cocoa-900"
              >
                Detalii
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
