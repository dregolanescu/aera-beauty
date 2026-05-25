'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { AquaIngredient } from '@/content/aqua-ingredients'

type Props = {
  ingredients: AquaIngredient[]
  eyebrow?: string
  title: string
  intro?: string
  id?: string
}

const cardShadow =
  '0 1px 0 rgba(91, 70, 56, 0.03), 0 6px 18px rgba(91, 70, 56, 0.04)'
const cardShadowHover =
  '0 1px 0 rgba(91, 70, 56, 0.04), 0 12px 28px rgba(91, 70, 56, 0.07)'

export function IngredientsSection({
  ingredients,
  eyebrow = 'Patente & ingrediente active',
  title,
  intro,
  id = 'patente-ingrediente',
}: Props) {
  return (
    <section
      id={id}
      className="border-t border-stone-200 bg-ivory-50 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-28">
        {/* Header secțiune */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="section-title mb-6">{title}</h2>
          {intro && <p className="body-large text-cocoa-700">{intro}</p>}
        </div>

        {/* ─────────────── DESKTOP / TABLETĂ — grid editorial ─────────────── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {ingredients.map((ing) => (
            <IngredientCard key={ing.slug} ingredient={ing} />
          ))}
        </div>

        {/* ─────────────── MOBILE — accordion compact ─────────────── */}
        <div className="md:hidden">
          <IngredientsAccordion ingredients={ingredients} />
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────
   Card editorial — desktop & tabletă
   ──────────────────────────────────────────────────────────────── */
function IngredientCard({ ingredient }: { ingredient: AquaIngredient }) {
  return (
    <article
      className="group h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5"
      style={{
        background: '#FBF7F0',
        border: '1px solid var(--color-stone-200)',
        boxShadow: cardShadow,
        padding: '28px 26px 26px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = cardShadowHover
        e.currentTarget.style.borderColor = 'rgba(140, 117, 103, 0.35)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = cardShadow
        e.currentTarget.style.borderColor = 'var(--color-stone-200)'
      }}
    >
      {/* Eyebrow — rol */}
      <p
        className="eyebrow mb-3"
        style={{ color: 'var(--color-taupe-500)' }}
      >
        {ingredient.role}
      </p>

      {/* Title — ingredient name */}
      <h3
        style={{
          fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
          fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          color: 'var(--color-cocoa-900)',
          marginBottom: '14px',
        }}
      >
        {ingredient.name}
      </h3>

      {/* Body — descriere */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: 'var(--color-cocoa-700)' }}
      >
        {ingredient.description}
      </p>
    </article>
  )
}

/* ────────────────────────────────────────────────────────────────
   Accordion compact — mobile
   ──────────────────────────────────────────────────────────────── */
function IngredientsAccordion({ ingredients }: { ingredients: AquaIngredient[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const shouldReduce = useReducedMotion()

  function toggle(slug: string) {
    setOpenSlug((curr) => (curr === slug ? null : slug))
  }

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {ingredients.map((ing) => {
        const isOpen = openSlug === ing.slug
        return (
          <div key={ing.slug}>
            <button
              type="button"
              onClick={() => toggle(ing.slug)}
              aria-expanded={isOpen}
              aria-controls={`ing-panel-${ing.slug}`}
              className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-700 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50 rounded-sm"
            >
              <span className="flex flex-col flex-1 min-w-0 pr-2">
                <span
                  className="eyebrow mb-1.5"
                  style={{ color: 'var(--color-taupe-500)' }}
                >
                  {ing.role}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-bodoni-moda), Georgia, serif',
                    fontSize: '1.1875rem',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-cocoa-900)',
                  }}
                >
                  {ing.name}
                </span>
              </span>

              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className={`text-cocoa-700 shrink-0 mt-1 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <motion.div
              id={`ing-panel-${ing.slug}`}
              initial={false}
              animate={
                isOpen
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduce ? 0 : 0.28,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ overflow: 'hidden' }}
              aria-hidden={!isOpen}
            >
              <p
                className="text-sm leading-relaxed pb-5 pr-6"
                style={{ color: 'var(--color-cocoa-700)' }}
              >
                {ing.description}
              </p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
