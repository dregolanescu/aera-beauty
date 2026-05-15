'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { B2BForm } from './B2BForm'

type BrandSlug = 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'

type BrandCard = {
  slug: BrandSlug
  name: string
  category: string
  hint: string
  accent?: string // matcha pentru Redefine
}

const brands: BrandCard[] = [
  {
    slug: 'aqua-mineral',
    name: 'Aqua Mineral',
    category: 'Skincare',
    hint: 'Marea Moartă',
  },
  {
    slug: 'oliere-paris',
    name: 'Oliere Paris',
    category: 'Haircare',
    hint: 'Uleiuri naturale',
  },
  {
    slug: 'redefine-matcha',
    name: 'Redefine Matcha',
    category: 'Haircare',
    hint: 'Matcha energy',
    accent: 'matcha',
  },
]

export function BrandTabs() {
  const [active, setActive] = useState<BrandSlug>('aqua-mineral')
  const [mobileOpen, setMobileOpen] = useState<BrandSlug | null>('aqua-mineral')

  function selectBrand(slug: BrandSlug) {
    setActive(slug)
    // Smooth scroll la formular pe desktop după select
    requestAnimationFrame(() => {
      const el = document.getElementById('form-panel')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function toggleMobile(slug: BrandSlug) {
    setMobileOpen((curr) => (curr === slug ? null : slug))
  }

  return (
    <>
      {/* ─────────────── DESKTOP: cards selector ─────────────── */}
      <div className="hidden md:block">
        <p className="body text-cocoa-700 mb-6 max-w-2xl">
          Selectează brandul care te interesează, iar formularul se adaptează automat.
        </p>

        <div role="tablist" className="grid grid-cols-3 gap-5 lg:gap-6 mb-12">
          {brands.map((b) => {
            const isActive = active === b.slug
            const isMatcha = b.accent === 'matcha'

            return (
              <button
                key={b.slug}
                role="tab"
                aria-selected={isActive}
                aria-controls="form-panel"
                id={`tab-${b.slug}`}
                onClick={() => selectBrand(b.slug)}
                className={`group relative text-left transition-all duration-300 ease-out rounded-lg overflow-hidden ${
                  isActive
                    ? '-translate-y-0.5'
                    : 'hover:-translate-y-0.5'
                }`}
                style={{
                  background: isActive ? '#FBF7F0' : '#FAF6EE',
                  border: `1px solid ${isActive ? '#5B4638' : '#E8DFD3'}`,
                  boxShadow: isActive
                    ? '0 1px 0 rgba(91,70,56,0.04), 0 12px 32px rgba(91,70,56,0.08)'
                    : '0 1px 0 rgba(91,70,56,0.02), 0 6px 16px rgba(91,70,56,0.04)',
                  padding: '32px 28px 28px',
                  minHeight: '180px',
                }}
              >
                {/* Active indicator: corner pill */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.12em] font-medium"
                    style={{
                      background: isMatcha
                        ? 'var(--color-redefine-matcha)'
                        : 'var(--color-cocoa-700)',
                      color: 'var(--color-ivory-50)',
                    }}
                  >
                    <Check size={10} strokeWidth={3} />
                    Selectat
                  </span>
                )}

                {/* Subtle matcha accent dot pe Redefine (visible always, mai vizibil când active) */}
                {isMatcha && !isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-5 w-2 h-2 rounded-full"
                    style={{ background: 'var(--color-redefine-matcha)' }}
                  />
                )}

                <p
                  className="eyebrow mb-4"
                  style={{
                    color: isMatcha && isActive
                      ? 'var(--color-redefine-matcha-dark)'
                      : 'var(--color-taupe-500)',
                  }}
                >
                  {b.category} · {b.hint}
                </p>

                <h3
                  style={{
                    fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
                    fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-cocoa-900)',
                    marginBottom: '12px',
                  }}
                >
                  {b.name}
                </h3>

                <p
                  className="text-sm transition-colors"
                  style={{
                    color: isActive ? 'var(--color-cocoa-700)' : 'var(--color-taupe-500)',
                  }}
                >
                  {isActive ? 'Formular activ ↓' : 'Alege acest brand →'}
                </p>
              </button>
            )
          })}
        </div>

        {/* Form panel — single visible */}
        <div
          id="form-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="scroll-mt-24"
        >
          {brands.map((b) =>
            active === b.slug ? <B2BForm key={b.slug} brand={b.slug} /> : null,
          )}
        </div>
      </div>

      {/* ─────────────── MOBILE: stacked selectable cards ─────────────── */}
      <div className="md:hidden">
        <p className="body text-cocoa-700 mb-6">
          Selectează brandul care te interesează.
        </p>

        <div className="space-y-3">
          {brands.map((b) => {
            const open = mobileOpen === b.slug
            const isMatcha = b.accent === 'matcha'

            return (
              <div
                key={b.slug}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  background: open ? '#FBF7F0' : '#FAF6EE',
                  border: `1px solid ${open ? '#5B4638' : '#E8DFD3'}`,
                  boxShadow: open
                    ? '0 1px 0 rgba(91,70,56,0.04), 0 8px 24px rgba(91,70,56,0.08)'
                    : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleMobile(b.slug)}
                  aria-expanded={open}
                  aria-controls={`mpanel-${b.slug}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left relative"
                >
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="eyebrow mb-1.5 flex items-center gap-2">
                      {b.category} · {b.hint}
                      {isMatcha && !open && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ background: 'var(--color-redefine-matcha)' }}
                        />
                      )}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
                        fontSize: '1.375rem',
                        letterSpacing: '-0.015em',
                        lineHeight: 1.15,
                        color: 'var(--color-cocoa-900)',
                      }}
                    >
                      {b.name}
                    </span>
                  </span>

                  {open ? (
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.12em] font-medium shrink-0"
                      style={{
                        background: isMatcha
                          ? 'var(--color-redefine-matcha)'
                          : 'var(--color-cocoa-700)',
                        color: 'var(--color-ivory-50)',
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                      Selectat
                    </span>
                  ) : (
                    <ChevronDown
                      size={20}
                      strokeWidth={1.5}
                      className="text-cocoa-700 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <div
                  id={`mpanel-${b.slug}`}
                  hidden={!open}
                  className="px-5 pb-6 pt-2 border-t border-stone-200"
                >
                  {open && <B2BForm brand={b.slug} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
