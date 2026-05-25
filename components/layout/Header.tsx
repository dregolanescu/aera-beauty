'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Menu } from 'lucide-react'
import { Logo } from './Logo'
import { PrecomandaCTA } from '@/components/precomanda/PrecomandaCTA'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { href: '/despre', label: 'Despre' },
  { href: '/produse', label: 'Produse' },
  {
    href: '/produse/aqua-mineral#patente-ingrediente',
    label: 'Patente & ingrediente active',
  },
  { href: '/colaboreaza', label: 'Colaborează' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const activeAnchorHref = useActiveAnchorHref(navLinks, pathname)

  function handleClose() {
    setMenuOpen(false)
    requestAnimationFrame(() => burgerRef.current?.focus())
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-100/80 backdrop-blur-sm border-b border-stone-200/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 md:h-24 grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            aria-label="AERA Beauty — pagina principală"
            className="col-start-1 justify-self-start"
          >
            <Logo className="h-12 md:h-16 w-auto" />
          </Link>

          <nav className="col-start-2 hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isAnchorLink = link.href.includes('#')
              const base = link.href.split('#')[0]
              const pathMatch =
                pathname === base || pathname.startsWith(base + '/')

              const isActive = isAnchorLink
                ? activeAnchorHref === link.href
                : pathMatch && activeAnchorHref === null

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href, pathname)}
                  className="aera-nav-link button-label whitespace-nowrap"
                  style={{
                    letterSpacing: '0.04em',
                    textTransform: 'none',
                    fontSize: '14px',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="col-start-3 flex items-center gap-3 md:gap-4 justify-self-end">
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

            <div className="hidden md:block">
              <PrecomandaCTA size="sm" />
            </div>

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

export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  currentPathname: string,
) {
  if (!href.includes('#')) return
  const [base, hash] = href.split('#')
  if (!hash) return
  if (currentPathname !== base) return

  const el = document.getElementById(hash)
  if (!el) return

  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (window.location.hash !== `#${hash}`) {
    window.history.replaceState(null, '', href)
  }
}

function useActiveAnchorHref(
  links: { href: string }[],
  pathname: string,
): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null)

  useEffect(() => {
    const relevant: { id: string; href: string }[] = []
    for (const link of links) {
      if (!link.href.includes('#')) continue
      const [base, hash] = link.href.split('#')
      if (base === pathname && hash) {
        relevant.push({ id: hash, href: link.href })
      }
    }

    if (relevant.length === 0) {
      setActiveHref(null)
      return
    }

    const elements = new Map<Element, string>()
    for (const { id, href } of relevant) {
      const el = document.getElementById(id)
      if (el) elements.set(el, href)
    }
    if (elements.size === 0) return

    const visible = new Map<Element, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target, entry.intersectionRatio)
          } else {
            visible.delete(entry.target)
          }
        }

        if (visible.size === 0) {
          setActiveHref(null)
          return
        }

        let topEl: Element | null = null
        let topRatio = -1
        for (const [el, ratio] of visible) {
          if (ratio > topRatio) {
            topRatio = ratio
            topEl = el
          }
        }
        if (topEl) {
          const href = elements.get(topEl)
          if (href) setActiveHref(href)
        }
      },
      {
        rootMargin: '-100px 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    elements.forEach((_, el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname, links])

  return activeHref
}
