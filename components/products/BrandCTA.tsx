'use client'

import { usePrecomanda } from '@/components/precomanda/PrecomandaContext'
import type { Brand } from '@/content/products'

type Props = {
  brand: Brand
}

export function BrandCTA({ brand }: Props) {
  const { open } = usePrecomanda()

  return (
    <section className="border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32 text-center">
        <p className="eyebrow mb-4">{brand.ctaPage.eyebrow}</p>
        <h2
          className="section-title mx-auto max-w-2xl"
          style={{ fontStyle: 'italic' }}
        >
          {brand.ctaPage.headline}
        </h2>
        <p className="body-large mt-6 mx-auto max-w-2xl text-cocoa-700">
          {brand.ctaPage.subtitle}
        </p>
        <div className="mt-10">
          <button
            onClick={() => open({ brand: brand.slug })}
            className="aera-cta-wrap"
          >
            <span className="aera-cta-halo" aria-hidden="true" />
            <span
              className="aera-cta-face"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.10em',
                padding: '14px 32px',
                minHeight: '46px',
              }}
            >
              {brand.ctaPage.buttonLabel}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
