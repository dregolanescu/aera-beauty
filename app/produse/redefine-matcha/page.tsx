import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBrand } from '@/content/products'
import { isBrandPublic } from '@/content/brand-visibility'
import { BrandPage } from '@/components/products/BrandPage'

const brand = getBrand('redefine-matcha')!

const pageMetadata: Metadata = {
  title: 'Redefine Matcha — Îngrijire pentru păr cu extract de matcha',
  description:
    'Șampoane, măști și seruri cu extract de matcha pentru o rutină modernă de îngrijire a părului.',
  openGraph: {
    title: 'Redefine Matcha — Îngrijire pentru păr cu extract de matcha',
    description:
      'Șampoane, măști și seruri cu extract de matcha pentru o rutină modernă de îngrijire a părului.',
    url: 'https://aerabeauty.ro/produse/redefine-matcha',
  },
}

// Brand ascuns public (content/brand-visibility.ts) → 404, fără titlul și
// descrierea brandului în <head>. Datele rămân în content/products.ts.
// Statusul 404 real vine din rewrites() în next.config.ts.
export function generateMetadata(): Metadata {
  if (!isBrandPublic(brand.slug)) notFound()
  return pageMetadata
}

export default function RedefineMatchaPage() {
  if (!isBrandPublic(brand.slug)) notFound()

  return <BrandPage brand={brand} />
}
