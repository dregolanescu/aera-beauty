import type { Metadata } from 'next'
import { getBrand } from '@/content/products'
import { BrandPage } from '@/components/products/BrandPage'

const brand = getBrand('redefine-matcha')!

export const metadata: Metadata = {
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

export default function RedefineMatchaPage() {
  return <BrandPage brand={brand} />
}
