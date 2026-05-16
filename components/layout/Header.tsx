'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Menu } from 'lucide-react'
import { Logo } from './Logo'
import { PrecomandaCTA } from '@/components/precomanda/PrecomandaCTA'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { href: '/despre', label: 'Despre' },
  { href: '/produse', label: 'Produse' },
  { href: '/colaboreaza', label: 'Colaborează' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  function handleClose() {
    setMenuOpen(false)
    // Return focus to burger after drawer closes
    requestAnimationFrame(() => burgerRef.current?.focus())
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-100/80 backdrop-blur-sm border-b border-stone-200/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 md:h-24 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* LEFT — Logo (col 1) */}
          <Link
            href="/"
            aria-label="AERA Beauty — pagina principală"
            className="col-start-1 justify-self-start"
          >
            <Logo className="h-12 md:h-16 w-auto" />
          </Link>

          {/* CENTER — Desktop nav (col 2, ancorat la centrul viewport-ului) */}
          <nav className="col-start-2 hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="aera-nav-link button-label"
                style={{
                  letterSpacing: '0.04em',
                  textTransform: 'none',
                  fontSize: '14px',
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

          {/* RIGHT — Social + CTA + burger (col 3, ancorat la dreapta) */}
          <div className="col-start-3 flex items-center gap-3 md:gap-4 justify-self-end">
            {/* Social icons — viitoare TikTok/FB se adaugă aici */}
            <div className="flex items-center gap-1 -mr-1">
              <a
                href="https://www.instagram.com/aerabeauty.ro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urmărește AERA Beauty pe Instagram (se deschide într-o filă nouă)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa-700 hover:text-cocoa-900 hover:bg-stone-200/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
              >
                <Instagram size={22} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <PrecomandaCTA size="sm" />
            </div>

            {/* Mobile burger */}
            <button
              ref={burgerRef}
              onClick={() => setMenuOpen(true)}
              aria-label="Deschide meniul"
              aria-expanded={menuOpen}
              className="md:hidden flex items-center justify-center w-11 h-11 text-cocoa-700 hover:text-cocoa-900 transition-colors"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={handleClose} />
    </>
  )
}
