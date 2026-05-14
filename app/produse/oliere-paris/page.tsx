import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Oliere Paris — Haircare premium cu uleiuri naturale',
  description:
    'Îngrijire profesională pentru păr: Color Éclat, Valour și Ordinaire, reprezentate de AERA Beauty în România.',
}

export default function OliereParisPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
            <FadeIn>
              <p className="eyebrow mb-6">Oliere Paris</p>
              <h1
                className="hero-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                Uleiuri naturale,
                <br />
                <span style={{ fontStyle: 'italic' }}>
                  rafinate pentru păr.
                </span>
              </h1>
              <p className="body-large mt-8 max-w-2xl text-taupe-500">
                Pagina completă Oliere Paris vine în curând cu toate gamele și
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
