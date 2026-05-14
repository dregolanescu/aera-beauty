import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'
import { ProductCard } from './ProductCard'
import { BrandCTA } from './BrandCTA'
import type { Brand } from '@/content/products'

type Props = { brand: Brand }

export function BrandPage({ brand }: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
            <FadeIn>
              {/* Brand logo */}
              <div className="mb-8 h-16 md:h-20 flex items-center">
                {brand.logoIsPng ? (
                  <Image
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    width={400}
                    height={400}
                    className="h-[160px] md:h-[200px] w-auto object-contain"
                    priority
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    className="h-14 md:h-16 w-auto object-contain"
                  />
                )}
              </div>

              {brand.tagline && (
                <p className="eyebrow mb-4">{brand.tagline}</p>
              )}

              <h1
                className="hero-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                {brand.hero.headline.line1}
                <br />
                <span style={{ fontStyle: 'italic' }}>
                  {brand.hero.headline.line2Italic}
                </span>
              </h1>

              <p className="body-large mt-8 max-w-2xl text-cocoa-700">
                {brand.hero.subtitle}
              </p>

              {brand.hero.paragraph && (
                <p className="body mt-6 max-w-2xl text-cocoa-700">
                  {brand.hero.paragraph}
                </p>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Product ranges */}
        {brand.ranges.map((range, ri) => (
          <section
            key={range.slug}
            id={`range-${range.slug}`}
            className="border-t border-stone-200 scroll-mt-24"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-28">
              <FadeIn>
                <p className="eyebrow mb-3">Gama</p>
                <h2 className="section-title">{range.name}</h2>
                {range.intro && (
                  <p className="body-large mt-6 max-w-3xl text-cocoa-700">
                    {range.intro}
                  </p>
                )}
              </FadeIn>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                {range.products.map((product, pi) => (
                  <FadeIn key={product.slug} delay={(pi + 1) * 0.06}>
                    <ProductCard
                      product={product}
                      brandName={brand.name}
                      priority={ri === 0 && pi === 0}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA precomandă */}
        <BrandCTA brand={brand} />
      </main>
      <Footer />
    </>
  )
}
