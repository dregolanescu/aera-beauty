'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { B2BForm } from './B2BForm'

type BrandSlug = 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'

const brands: { slug: BrandSlug; name: string; category: string }[] = [
  { slug: 'aqua-mineral', name: 'Aqua Mineral', category: 'Skincare' },
  { slug: 'oliere-paris', name: 'Oliere Paris', category: 'Haircare' },
  { slug: 'redefine-matcha', name: 'Redefine Matcha', category: 'Haircare' },
]

export function BrandTabs() {
  const [active, setActive] = useState<BrandSlug>('aqua-mineral')
  const [mobileOpen, setMobileOpen] = useState<BrandSlug | null>('aqua-mineral')

  function toggleMobile(slug: BrandSlug) {
    setMobileOpen((curr) => (curr === slug ? null : slug))
  }

  return (
    <>
      {/* Desktop: tabs orizontale */}
      <div className="hidden md:block">
        <div role="tablist" className="flex gap-1 border-b border-stone-200 mb-12">
          {brands.map((b) => (
            <button
              key={b.slug}
              role="tab"
              aria-selected={active === b.slug}
              aria-controls={`panel-${b.slug}`}
              id={`tab-${b.slug}`}
              onClick={() => setActive(b.slug)}
              className={`relative px-6 py-4 text-left transition-colors ${
                active === b.slug
                  ? 'text-cocoa-900'
                  : 'text-taupe-500 hover:text-cocoa-700'
              }`}
            >
              <span
                className="block eyebrow mb-1"
                style={{ color: active === b.slug ? 'var(--color-taupe-500)' : 'inherit' }}
              >
                {b.category}
              </span>
              <span
                className="block"
                style={{
                  fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
                  fontSize: 'clamp(1.125rem, 1.5vw, 1.5rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                {b.name}
              </span>
              {active === b.slug && (
                <span
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cocoa-700"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {brands.map((b) => (
          <div
            key={b.slug}
            role="tabpanel"
            id={`panel-${b.slug}`}
            aria-labelledby={`tab-${b.slug}`}
            hidden={active !== b.slug}
          >
            {active === b.slug && <B2BForm brand={b.slug} />}
          </div>
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden space-y-3">
        {brands.map((b) => {
          const open = mobileOpen === b.slug
          return (
            <div
              key={b.slug}
              className="border border-stone-200 rounded-lg bg-ivory-50 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleMobile(b.slug)}
                aria-expanded={open}
                aria-controls={`mpanel-${b.slug}`}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="flex flex-col">
                  <span className="eyebrow mb-1">{b.category}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
                      fontSize: '1.25rem',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                      color: 'var(--color-cocoa-900)',
                    }}
                  >
                    {b.name}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  className={`text-cocoa-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`mpanel-${b.slug}`}
                hidden={!open}
                className="px-5 pb-6 pt-1 border-t border-stone-200"
              >
                {open && <B2BForm brand={b.slug} />}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
