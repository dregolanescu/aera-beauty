import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'

export function BrandsTransition() {
  return (
    <section className="border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32">
        <FadeIn>
          <p className="eyebrow mb-4">Portofoliu</p>

          <h2 className="section-title max-w-3xl">
            Ales cu grijă. Adus cu rigoare.
          </h2>

          <p className="body-large mt-8 max-w-3xl text-cocoa-700">
            AERA Beauty aduce în România un portofoliu concentrat de îngrijire
            premium: skincare cu minerale din Marea Moartă, prin Aqua Mineral.
          </p>

          <div className="mt-10">
            <Button href="/produse" variant="ghost">
              Vezi produsele &rarr;
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
