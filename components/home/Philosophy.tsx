import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

export function Philosophy() {
  return (
    <section className="border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32">
        <FadeIn>
          <p className="eyebrow mb-6">Filozofia AERA</p>

          <h2 className="section-title max-w-3xl">
            Mai puțin spectacol. Mai multă rigoare.
          </h2>

          <p className="body-large mt-8 max-w-2xl text-cocoa-700">
            Credem într-o frumusețe care nu forțează, ci susține. De aceea
            alegem branduri construite pe formule curate, ingrediente relevante
            și experiențe de utilizare care se simt la fel de bine pe cât arată.
            Pentru noi, premium nu înseamnă promisiuni mari. Înseamnă selecție,
            consecvență și încredere.
          </p>

          <Link
            href="/despre"
            className="inline-block mt-10 text-cocoa-700 font-medium tracking-wide hover:text-cocoa-900 transition-colors duration-200 border-b border-cocoa-700/30 hover:border-cocoa-900 pb-0.5"
          >
            Despre AERA &rarr;
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
