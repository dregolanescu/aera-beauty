import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Aqua Mineral — Skincare cu minerale din Marea Moartă',
  description:
    'Descoperă gamele Aqua Mineral: facial care, anti-aging, body care, gold performance și smart delivery.',
}

export default function AquaMineralPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
            <FadeIn>
              <p className="eyebrow mb-6">Aqua Mineral</p>
              <h1
                className="hero-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                Marea Moartă,
                <br />
                <span style={{ fontStyle: 'italic' }}>
                  formulată cu știință.
                </span>
              </h1>
              <p className="body-large mt-8 max-w-2xl text-taupe-500">
                Pagina completă Aqua Mineral vine în curând cu toate gamele și
                produsele.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
