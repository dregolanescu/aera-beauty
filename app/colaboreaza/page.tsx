import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata: Metadata = {
  title: 'Colaborează cu AERA Beauty — parteneriate B2B',
  description:
    'Suntem deschiși colaborărilor cu saloane profesionale, retailere și distribuitori. Scrie-ne și revenim cu detalii despre game, listare și condiții comerciale.',
  openGraph: {
    title: 'Colaborează cu AERA Beauty',
    description:
      'Parteneriate B2B pentru saloane profesionale, retailere și distribuitori în România.',
    url: 'https://aerabeauty.ro/colaboreaza',
  },
}

const opportunities = [
  {
    eyebrow: 'Saloane profesionale',
    title: 'Recomandare și revânzare în salon',
    body: 'Pentru hairstyliști și estheticieni care vor să recomande și să revândă brandurile noastre. Oferim training, materiale de prezentare și condiții comerciale dedicate.',
  },
  {
    eyebrow: 'Retail & farmacii',
    title: 'Listare în magazine și online',
    body: 'Pentru retaileri de specialitate, lanțuri de farmacii sau platforme de beauty interesate să listeze gamele Aqua Mineral, Oliere Paris și Redefine Matcha.',
  },
  {
    eyebrow: 'Distribuție',
    title: 'Distribuitori regionali',
    body: 'Pentru distribuitori cu rețea solidă în profesional sau retail care vor să reprezinte brandurile pe segmente sau regiuni specifice.',
  },
]

export default function ColaboreazaPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-16 md:pt-32 md:pb-20">
            <FadeIn>
              <p className="eyebrow mb-6">Colaborează</p>
              <h1
                className="hero-title max-w-4xl"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                Construim împreună
                <br />
                <span style={{ fontStyle: 'italic' }}>
                  o rețea premium.
                </span>
              </h1>
              <p className="body-large mt-8 max-w-2xl text-cocoa-700">
                AERA Beauty reprezintă în exclusivitate trei branduri premium
                în România — Aqua Mineral, Oliere Paris și Redefine Matcha.
                Suntem deschiși colaborărilor cu parteneri care împărtășesc
                aceeași grijă pentru calitate, formulare curate și experiență
                impecabilă pentru utilizatorul final.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3 oportunități */}
        <section className="border-t border-stone-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-28">
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {opportunities.map((opp, i) => (
                <FadeIn key={opp.eyebrow} delay={(i + 1) * 0.08}>
                  <div className="h-full">
                    <p className="eyebrow mb-3">{opp.eyebrow}</p>
                    <h2 className="card-title mb-4">{opp.title}</h2>
                    <p className="body text-cocoa-700">{opp.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA contact */}
        <section className="border-t border-stone-200 bg-ivory-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-28 text-center">
            <FadeIn>
              <p className="eyebrow mb-4">Scrie-ne</p>
              <h2
                className="section-title mx-auto max-w-3xl"
                style={{ fontStyle: 'italic' }}
              >
                Spune-ne pe scurt ce ai în minte.
              </h2>
              <p className="body-large mt-6 mx-auto max-w-2xl text-cocoa-700">
                Formularele B2B dedicate fiecărui brand vin în curând. Până
                atunci, ne poți contacta direct — revenim în maximum 48 de ore
                lucrătoare cu detalii despre game, prețuri și condiții.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:office@aerabeauty.ro?subject=Cerere%20colaborare%20%E2%80%94%20AERA%20Beauty"
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
                    Trimite-ne un email
                  </span>
                </a>

                <a
                  href="https://wa.me/40747306107?text=Salut%2C%20a%C8%99%20vrea%20s%C4%83%20discut%C4%83m%20despre%20o%20colaborare."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa-700 hover:text-cocoa-900 transition-colors underline underline-offset-4 text-sm font-medium tracking-wide"
                >
                  sau scrie-ne pe WhatsApp →
                </a>
              </div>

              <p className="mt-12 text-sm text-taupe-500">
                office@aerabeauty.ro · +40 747 306 107
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
