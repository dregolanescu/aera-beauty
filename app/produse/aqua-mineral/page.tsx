import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBrand } from '@/content/products'
import { isBrandPublic } from '@/content/brand-visibility'
import { aquaIngredients } from '@/content/aqua-ingredients'
import { BrandPage } from '@/components/products/BrandPage'
import { IngredientsSection } from '@/components/products/IngredientsSection'

const brand = getBrand('aqua-mineral')!

const pageMetadata: Metadata = {
  title: 'Aqua Mineral — Skincare cu minerale din Marea Moartă',
  description:
    'Game de îngrijire facială, anti-aging, Gold Performance, Smart Delivery și Body Care cu minerale din Marea Moartă, reprezentate de AERA Beauty în România.',
  openGraph: {
    title: 'Aqua Mineral — Skincare cu minerale din Marea Moartă',
    description:
      'Game de îngrijire facială, anti-aging, Gold Performance, Smart Delivery și Body Care cu minerale din Marea Moartă.',
    url: 'https://aerabeauty.ro/produse/aqua-mineral',
  },
}

// Brand ascuns public (content/brand-visibility.ts) → 404, fără titlul și
// descrierea brandului în <head>. Datele rămân în content/products.ts.
// Statusul 404 real vine din rewrites() în next.config.ts.
export function generateMetadata(): Metadata {
  if (!isBrandPublic(brand.slug)) notFound()
  return pageMetadata
}

export default function AquaMineralPage() {
  if (!isBrandPublic(brand.slug)) notFound()

  return (
    <BrandPage
      brand={brand}
      belowHero={
        <IngredientsSection
          ingredients={aquaIngredients}
          title="Știința din spatele formulelor."
          intro="Aqua Mineral combină mineralele Mării Moarte cu ingrediente brevetate și tehnologii dezvoltate de Sederma France, parte din Croda Beauty Actives. Mai jos sunt activele-cheie care fac diferența în formule — fiecare cu rolul său în ritualul de îngrijire."
        />
      }
    />
  )
}
