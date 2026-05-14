import type { Metadata } from 'next'
import { getBrand } from '@/content/products'
import { BrandPage } from '@/components/products/BrandPage'

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
  return <BrandPage brand={brand} />
}
