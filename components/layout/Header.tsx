'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
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
        <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
          <Link
            href="/"
            aria-label="AERA Beauty — pagina principală"
            className="block"
          >
            <Logo className="h-12 md:h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
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
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
