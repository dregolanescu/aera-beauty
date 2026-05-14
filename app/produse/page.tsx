import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'
import { brands } from '@/content/products'

export const metadata: Metadata = {
  title: 'Produse AERA Beauty',
  description:
    'Skincare cu minerale din Marea Moartă și haircare profesional cu uleiuri naturale și extract de matcha.',
  openGraph: {
    title: 'Produse AERA Beauty',
    description:
      'Skincare cu minerale din Marea Moartă și haircare profesional cu uleiuri naturale și extract de matcha.',
    url: 'https://aerabeauty.ro/produse',
  },
}

export default function ProdusePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
            <FadeIn>
              <p className="eyebrow mb-6">Produse</p>
              <h1
                className="hero-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                Trei branduri,
                <br />
                <span style={{ fontStyle: 'italic' }}>aceeași rigoare.</span>
              </h1>
              <p className="body-large mt-8 max-w-2xl text-cocoa-700">
                Fiecare brand din portofoliul AERA este ales pentru formulă,
                experiență și relevanță. Nu aducem tot. Aducem ce merită
                descoperit.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Brand cards grid */}
        <section className="border-t border-stone-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {brands.map((brand, i) => (
                <FadeIn key={brand.slug} delay={i * 0.08}>
                  <Link
                    href={`/produse/${brand.slug}`}
                    className="group flex flex-col h-full bg-ivory-50 border border-stone-200 rounded-md p-8 md:p-10 transition-all duration-[320ms] ease-out hover:-translate-y-0.5 hover:border-taupe-500/30"
                    style={{
                      borderWidth: '0.5px',
                      boxShadow:
                        '0 1px 3px rgba(61,47,37,0.04), 0 8px 24px rgba(61,47,37,0.03)',
                    }}
                  >
                    <div className="mb-6 h-20 flex items-center justify-center overflow-hidden">
                      {brand.logoIsPng ? (
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} — ${brand.category.toLowerCase()}`}
                          width={400}
                          height={400}
                          className="h-[200px] w-auto object-contain transition-transform duration-[320ms] ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={brand.logo}
                          alt={`${brand.name} — ${brand.category.toLowerCase()}`}
                          className="h-10 max-h-14 w-auto object-contain transition-transform duration-[320ms] ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>

                    <p className="eyebrow mb-3">{brand.category}</p>
                    <h2 className="card-title mb-3">{brand.name}</h2>
                    <p className="body text-cocoa-700 flex-1">
                      {brand.ctaCardCopy}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1 self-start text-cocoa-700 font-medium tracking-wide group-hover:text-cocoa-900 transition-colors duration-[280ms]">
                      <span className="border-b border-cocoa-700/30 group-hover:border-cocoa-900 pb-0.5 transition-colors duration-[280ms]">
                        Vezi colecția
                      </span>
                      <span className="inline-block transition-transform duration-[240ms] ease-out group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
