import type { Metadata } from 'next'
import { getBrand } from '@/content/products'
import { aquaIngredients } from '@/content/aqua-ingredients'
import { BrandPage } from '@/components/products/BrandPage'
import { IngredientsSection } from '@/components/products/IngredientsSection'

const brand = getBrand('aqua-mineral')!

export const metadata: Metadata = {
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

export default function AquaMineralPage() {
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
