'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { Logo } from './Logo'
import { PrecomandaCTA } from '@/components/precomanda/PrecomandaCTA'

const navLinks = [
  { href: '/despre', label: 'Despre' },
  { href: '/produse', label: 'Produse' },
  { href: '/colaboreaza', label: 'Colaborează' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const shouldReduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus trap + focus close button on open
  useEffect(() => {
    if (!isOpen) return

    // Focus close button
    requestAnimationFrame(() => closeRef.current?.focus())

    // Inert on main content
    const main = document.getElementById('main-content')
    if (main) main.setAttribute('inert', '')

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      if (main) main.removeAttribute('inert')
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Focus trap: cycle Tab within panel
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [],
  )

  const slideIn = shouldReduce
    ? { opacity: 0 }
    : { y: '-100%', opacity: 0 }
  const slideVisible = shouldReduce
    ? { opacity: 1 }
    : { y: 0, opacity: 1 }
  const slideOut = shouldReduce
    ? { opacity: 0 }
    : { opacity: 0 }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-cocoa-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className="fixed inset-0 z-50 bg-cream-100 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Meniu navigare"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={{
              duration: shouldReduce ? 0.15 : 0.32,
              ease: shouldReduce ? 'easeOut' : [0.16, 1, 0.3, 1],
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Header row: logo + close */}
            <div className="h-20 flex items-center justify-between px-6">
              <Logo className="h-12 w-auto" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Închide meniul"
                className="flex items-center justify-center w-11 h-11 text-cocoa-700 hover:text-cocoa-900 transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links — Bodoni display, editorial */}
            <nav className="flex-1 flex flex-col justify-center px-6 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-cocoa-700 hover:text-cocoa-900 transition-colors"
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                  }}
                  aria-current={
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'page'
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom: CTA + contact */}
            <div className="px-6 pb-10">
              <PrecomandaCTA className="w-full" onAfterOpen={onClose} />
              <div className="mt-6 flex flex-col gap-2 text-sm text-taupe-500">
                <a
                  href="mailto:office@aerabeauty.ro"
                  className="hover:text-cocoa-700 transition-colors"
                >
                  office@aerabeauty.ro
                </a>
                <a
                  href="tel:+40747306107"
                  className="hover:text-cocoa-700 transition-colors"
                >
                  +40 747 306 107
                </a>
                <a
                  href="https://wa.me/40747306107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cocoa-700 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
