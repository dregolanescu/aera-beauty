export type Product = {
  slug: string
  name: string
  description: string
  image: string
  volume?: string
}

export type ProductRange = {
  slug: string
  name: string
  intro: string
  products: Product[]
}

export type Brand = {
  slug: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  name: string
  category: 'Skincare' | 'Haircare'
  logo: string
  logoIsPng?: boolean
  tagline?: string
  hero: {
    headline: { line1: string; line2Italic: string }
    subtitle: string
    paragraph?: string
  }
  ranges: ProductRange[]
  ctaCardCopy: string
  ctaPage: {
    eyebrow: string
    headline: string
    subtitle: string
    buttonLabel: string
  }
  accentColor?: string
}

export const brands: Brand[] = [
  // ── Aqua Mineral (stub — populate in iteration 2) ──
  {
    slug: 'aqua-mineral',
    name: 'Aqua Mineral',
    category: 'Skincare',
    logo: '/logo/aqua-mineral.svg',
    tagline: 'The Science of Beauty',
    hero: {
      headline: { line1: 'Marea Moartă,', line2Italic: 'formulată cu știință.' },
      subtitle: '',
    },
    ranges: [],
    ctaCardCopy:
      'Mineralele Mării Moarte, integrate în formule cosmetice cu vocație de performanță.',
    ctaPage: {
      eyebrow: 'Precomandă',
      headline: 'Vrei să descoperi Aqua Mineral?',
      subtitle:
        'Lasă-ne câteva detalii, iar noi revenim cu recomandare, disponibilitate și informații de preț.',
      buttonLabel: 'Precomandă produs Aqua Mineral',
    },
  },

  // ── Oliere Paris (stub — populate in iteration 3) ──
  {
    slug: 'oliere-paris',
    name: 'Oliere Paris',
    category: 'Haircare',
    logo: '/logo/oliere-paris.svg',
    hero: {
      headline: { line1: 'Uleiuri naturale,', line2Italic: 'rafinate pentru păr.' },
      subtitle: '',
    },
    ranges: [],
    ctaCardCopy:
      'Îngrijire profesională pentru păr, cu uleiuri naturale și texturi care nu încarcă.',
    ctaPage: {
      eyebrow: 'Precomandă',
      headline: 'Vrei să descoperi Oliere Paris?',
      subtitle:
        'Scrie-ne ce produs sau gamă te interesează, iar noi revenim cu detalii, recomandare și disponibilitate.',
      buttonLabel: 'Precomandă produs Oliere',
    },
  },

  // ── Redefine Matcha (complete) ──
  {
    slug: 'redefine-matcha',
    name: 'Redefine Matcha',
    category: 'Haircare',
    logo: '/logo/redefine-matcha.png',
    logoIsPng: true,
    accentColor: '#7A8B5C',
    hero: {
      headline: { line1: 'Matcha,', line2Italic: 'redefinit pentru păr.' },
      subtitle:
        'Redefine Matcha aduce energia și profilul antioxidant al ceaiului matcha într-o linie de îngrijire modernă pentru păr. Formulele sunt create pentru a susține prospețimea scalpului, elasticitatea și strălucirea naturală a firului.',
    },
    ranges: [
      {
        slug: 'matcha-series',
        name: 'Matcha Series',
        intro: '',
        products: [
          {
            slug: 'matcha-series-hair-shampoo',
            name: 'Matcha Series Hair Shampoo',
            volume: '400 ml',
            description:
              'Șampon zilnic cu extract de matcha, pentru curățare delicată și senzație de scalp revitalizat.',
            image: '/products/redefine/matcha-series-hair-shampoo.jpg',
          },
          {
            slug: 'matcha-series-hair-mask',
            name: 'Matcha Series Hair Mask',
            volume: '500 ml',
            description:
              'Mască pentru îngrijire săptămânală, creată pentru hrănire, netezire și elasticitate.',
            image: '/products/redefine/matcha-series-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-thin-hair-hair-mask',
            name: 'Matcha Series Hair Mask for Thin Hair',
            volume: '500 ml',
            description:
              'Mască pentru păr fin, formulată pentru suplețe și senzație de densitate fără greutate.',
            image: '/products/redefine/matcha-series-thin-hair-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-leave-in-hair-mask',
            name: 'Matcha Series Leave-in Hair Mask',
            volume: '200 ml',
            description:
              'Tratament fără clătire, pentru hidratare, protecție și disciplinarea firului.',
            image: '/products/redefine/matcha-series-leave-in-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-hair-serum',
            name: 'Matcha Series Hair Serum',
            volume: '125 ml',
            description:
              'Ser pentru strălucire, netezire și protecția vârfurilor.',
            image: '/products/redefine/matcha-series-hair-serum.jpg',
          },
        ],
      },
    ],
    ctaCardCopy:
      'Energia matcha-ului, reinterpretată într-o rutină modernă pentru păr.',
    ctaPage: {
      eyebrow: 'Precomandă',
      headline: 'Vrei să descoperi Redefine Matcha?',
      subtitle:
        'Lasă-ne datele tale și revenim cu detalii despre disponibilitate, produse și recomandări.',
      buttonLabel: 'Precomandă produs Redefine',
    },
  },
]

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}
