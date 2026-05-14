import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'

export function BrandsTransition() {
  return (
    <section className="border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32">
        <FadeIn>
          <p className="eyebrow mb-4">Trei direcții</p>

          <h2 className="section-title max-w-3xl">
            Trei branduri. Trei direcții de îngrijire.
          </h2>

          <p className="body-large mt-8 max-w-3xl text-cocoa-700">
            AERA Beauty aduce în România un portofoliu concentrat de îngrijire
            premium: skincare cu minerale din Marea Moartă prin Aqua Mineral,
            haircare profesional cu uleiuri naturale prin Oliere Paris și o linie
            modernă de îngrijire inspirată de energia matcha-ului prin Redefine
            Matcha.
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
