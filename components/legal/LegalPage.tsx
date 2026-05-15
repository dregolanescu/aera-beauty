import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'

type Props = {
  eyebrow: string
  title: string
  lastUpdated: string // ex: "15 mai 2026"
  children: ReactNode
}

export function LegalPage({ eyebrow, title, lastUpdated, children }: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-12 md:pt-32 md:pb-16">
            <FadeIn>
              <p className="eyebrow mb-6">{eyebrow}</p>
              <h1
                className="page-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                {title}
              </h1>
              <p className="mt-8 text-sm text-taupe-500">
                Ultima actualizare: {lastUpdated}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Conținut */}
        <section className="border-t border-stone-200">
          <div className="mx-auto max-w-3xl px-6 lg:px-12 py-16 md:py-24">
            <div className="legal-prose">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
