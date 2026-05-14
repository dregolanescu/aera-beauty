import { FadeIn } from '@/components/motion/FadeIn'

const blocks = [
  {
    eyebrow: null,
    text: 'Credem într-o frumusețe care arată autentic: luminoasă, echilibrată, vie. Nu urmărim artificiul, ci acea senzație rară de piele și păr bine îngrijite, cu formule care lucrează inteligent și se integrează firesc în viața ta.',
  },
  {
    eyebrow: 'Credem în mai bine',
    text: 'Pentru noi, „curat" nu este un slogan și nici o listă de ingrediente bifate superficial. Am înțeles că naturalul nu este automat benefic, iar sinteticul nu este automat de evitat. Frumusețea bună se construiește prin alegeri informate: ingrediente potrivite, texturi echilibrate, rezultate vizibile și respect pentru cel care folosește produsul.',
  },
  {
    eyebrow: 'Mai bine înseamnă echilibru',
    text: 'Selectăm branduri care lucrează cu pielea și părul, nu împotriva lor. Căutăm formule care susțin bariera naturală, confortul, luminozitatea și suplețea — fără exces, fără promisiuni agresive, fără compromisuri inutile.',
  },
]

function Separator() {
  return (
    <div
      className="mx-auto text-center text-taupe-500/50 select-none"
      aria-hidden="true"
      style={{ letterSpacing: '0.3em', fontSize: '14px' }}
    >
      &middot;&nbsp;&middot;&nbsp;&middot;
    </div>
  )
}

export function Manifesto() {
  return (
    <article className="border-t border-stone-200">
      <div className="mx-auto max-w-3xl px-6 lg:px-12 py-24 md:py-32 flex flex-col gap-12 md:gap-16">
        {blocks.map((block, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            {i > 0 && <Separator />}
            <section className={i > 0 ? 'mt-12 md:mt-16' : undefined}>
              {block.eyebrow && (
                <p className="eyebrow mb-4">{block.eyebrow}</p>
              )}
              <p className="body-large text-cocoa-700">{block.text}</p>
            </section>
          </FadeIn>
        ))}
      </div>
    </article>
  )
}
