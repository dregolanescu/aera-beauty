import { FadeIn } from '@/components/motion/FadeIn'

export function AboutHero() {
  return (
    <section className="bg-cream-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
        <FadeIn>
          <p className="eyebrow mb-6">Despre AERA Beauty</p>

          <h1
            className="page-title max-w-4xl"
            style={{ color: 'var(--color-cocoa-700)' }}
          >
            Frumusețe curată,
            <br />
            <span style={{ fontStyle: 'italic' }}>aleasă cu discernământ.</span>
          </h1>

          <p
            className="body-large mt-8 max-w-2xl"
            style={{ fontStyle: 'italic', color: 'var(--color-taupe-500)' }}
          >
            AERA Beauty este locul în care selecția devine parte din ritual.
            Alegem branduri premium pentru felul în care formulează, performează
            și respectă pielea sau părul în fiecare zi.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
