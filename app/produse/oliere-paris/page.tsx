import type { Metadata } from 'next'
import { getBrand } from '@/content/products'
import { BrandPage } from '@/components/products/BrandPage'

const brand = getBrand('oliere-paris')!

export const metadata: Metadata = {
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

export default function OliereParisPage() {
  return <BrandPage brand={brand} />
}
