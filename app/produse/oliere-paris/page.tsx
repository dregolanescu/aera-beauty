import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBrand } from '@/content/products'
import { isBrandPublic } from '@/content/brand-visibility'
import { BrandPage } from '@/components/products/BrandPage'

const brand = getBrand('oliere-paris')!

const pageMetadata: Metadata = {
  title: 'Oliere Paris — Haircare premium cu uleiuri naturale',
  description:
    'Îngrijire profesională pentru păr cu peste zece uleiuri naturale: gamele Color Éclat, ACAI, Valour și Ordinaire, reprezentate de AERA Beauty în România.',
  openGraph: {
    title: 'Oliere Paris — Haircare premium cu uleiuri naturale',
    description:
      'Îngrijire profesională pentru păr cu peste zece uleiuri naturale: gamele Color Éclat, ACAI, Valour și Ordinaire.',
    url: 'https://aerabeauty.ro/produse/oliere-paris',
  },
}

// Brand ascuns public (content/brand-visibility.ts) → 404, fără titlul și
// descrierea brandului în <head>. Datele rămân în content/products.ts.
// Statusul 404 real vine din rewrites() în next.config.ts.
export function generateMetadata(): Metadata {
  if (!isBrandPublic(brand.slug)) notFound()
  return pageMetadata
}

export default function OliereParisPage() {
  if (!isBrandPublic(brand.slug)) notFound()

  return <BrandPage brand={brand} />
}
