import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AboutHero } from '@/components/about/AboutHero'
import { Manifesto } from '@/components/about/Manifesto'
import { BrandsTransition } from '@/components/about/BrandsTransition'

export const metadata: Metadata = {
  title: 'Despre AERA Beauty',
  description:
    'Descoperă filosofia AERA Beauty: selecție premium, formule curate și branduri reprezentate cu grijă în România.',
  openGraph: {
    title: 'Despre AERA Beauty · For the love of Beauty',
    description:
      'Descoperă filosofia AERA Beauty: selecție premium, formule curate și branduri reprezentate cu grijă în România.',
    url: 'https://aerabeauty.ro/despre',
  },
}

export default function DesprePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <AboutHero />
        <Manifesto />
        <BrandsTransition />
      </main>
      <Footer />
    </>
  )
}
