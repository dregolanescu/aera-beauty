'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '@/content/products'

type Props = {
  product: Product
  brandName: string
  priority?: boolean
}

export function ProductCard({ product, brandName, priority = false }: Props) {
  const [expanded, setExpanded] = useState(false)
  const shouldReduce = useReducedMotion()

  // Are produsul detalii extinse (direcții / recomandare / rutină / frază)?
  const hasDetails = Boolean(
    product.directions ||
      product.usage ||
      product.complementaryRoutine ||
      product.closingPhrase,
  )

  return (
    <div
      className="flex flex-col bg-ivory-50 border border-stone-200 rounded-md overflow-hidden"
      style={{ borderWidth: '0.5px' }}
    >
      <div className="relative h-56 md:h-64 bg-white">
        <Image
          src={product.image}
          alt={`${product.name} — ${brandName}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="card-title mb-1">{product.name}</h3>
        {product.volume && (
          <p className="text-sm text-taupe-500 mb-3">{product.volume}</p>
        )}
        <p className="body text-cocoa-700 flex-1">{product.description}</p>

        {product.activeIngredients && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p
              className="eyebrow mb-1.5"
              style={{ color: 'var(--color-taupe-500)' }}
            >
              Ingrediente active
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-cocoa-700)' }}
            >
              {product.activeIngredients}
            </p>
          </div>
        )}

        {hasDetails && (
          <>
            <motion.div
              initial={false}
              animate={
                expanded
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduce ? 0 : 0.32,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ overflow: 'hidden' }}
              aria-hidden={!expanded}
            >
              <div className="mt-4 pt-4 border-t border-stone-200 space-y-3.5">
                {product.directions && (
                  <DetailBlock
                    label="Direcții de folosire"
                    text={product.directions}
                  />
                )}
                {product.usage && (
                  <DetailBlock
                    label="Recomandare de utilizare"
                    text={product.usage}
                  />
                )}
                {product.complementaryRoutine && (
                  <DetailBlock
                    label="Rutină complementară"
                    text={product.complementaryRoutine}
                  />
                )}
                {product.closingPhrase && (
                  <p
                    className="text-sm pt-2"
                    style={{
                      fontFamily:
                        'var(--font-bodoni-moda), Georgia, serif',
                      fontStyle: 'italic',
                      color: 'var(--color-cocoa-700)',
                      lineHeight: 1.5,
                    }}
                  >
                    {product.closingPhrase}
                  </p>
                )}
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center gap-1.5 self-start text-xs uppercase tracking-[0.10em] font-medium text-cocoa-700 hover:text-cocoa-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-700 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50 rounded-sm"
              style={{ letterSpacing: '0.10em' }}
            >
              <span>{expanded ? 'Vezi mai puțin' : 'Vezi mai mult'}</span>
              <ChevronDown
                size={14}
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${
                  expanded ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p
        className="eyebrow mb-1.5"
        style={{ color: 'var(--color-taupe-500)' }}
      >
        {label}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-cocoa-700)' }}
      >
        {text}
      </p>
    </div>
  )
}
