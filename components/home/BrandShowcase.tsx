'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

const brands = [
  {
    name: 'Aqua Mineral',
    category: 'Skincare',
    alt: 'Aqua Mineral — skincare cu minerale din Marea Moartă',
    description:
      'Mineralele Mării Moarte, integrate în formule cosmetice cu vocație de performanță.',
    logo: '/logo/aqua-mineral.svg',
    href: '/produse/aqua-mineral',
    logoClassName: 'h-10 w-auto',
    isPng: false,
  },
  {
    name: 'Oliere Paris',
    category: 'Haircare',
    alt: 'Oliere Paris — haircare profesional cu uleiuri naturale',
    description:
      'Îngrijire profesională pentru păr, cu uleiuri naturale și texturi care nu încarcă.',
    logo: '/logo/oliere-paris.svg',
    href: '/produse/oliere-paris',
    logoClassName: 'h-9 w-auto',
    isPng: false,
  },
  {
    name: 'Redefine Matcha',
    category: 'Haircare',
    alt: 'Redefine Matcha — haircare cu extract de matcha',
    description:
      'Energia matcha-ului, reinterpretată într-o rutină modernă pentru păr.',
    logo: '/logo/redefine-matcha.png',
    href: '/produse/redefine-matcha',
    // PNG-ul original e 4500×4500 cu mult whitespace; render mare + overflow clip
    logoClassName: 'h-[200px] w-auto',
    isPng: true,
  },
] as const

export function BrandShowcase() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="h-full"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{
                duration: shouldReduce ? 0.2 : 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: shouldReduce ? 0 : i * 0.08,
              }}
            >
              <Link
                href={brand.href}
                className="group flex flex-col h-full bg-ivory-50 border border-stone-200 rounded-md p-8 lg:p-10 transition-transform duration-200 ease-out hover:-translate-y-1"
                style={{ borderWidth: '0.5px' }}
              >
                <div className="mb-6 h-16 flex items-center overflow-hidden">
                  {brand.isPng ? (
                    <Image
                      src={brand.logo}
                      alt={brand.alt}
                      width={400}
                      height={400}
                      className={`${brand.logoClassName} max-h-12 w-auto object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]`}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo}
                      alt={brand.alt}
                      className={`${brand.logoClassName} max-h-12 w-auto object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]`}
                    />
                  )}
                </div>

                <p className="eyebrow mb-3">{brand.category}</p>

                <h3 className="card-title mb-3">{brand.name}</h3>

                <p className="body text-cocoa-700 flex-1">
                  {brand.description}
                </p>

                <span className="mt-6 text-cocoa-700 font-medium tracking-wide group-hover:text-cocoa-900 transition-colors duration-200 border-b border-cocoa-700/30 group-hover:border-cocoa-900 pb-0.5 self-start">
                  Vezi colecția &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
