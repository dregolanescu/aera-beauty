export type Product = {
  slug: string
  name: string
  description: string
  activeIngredients?: string
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
  // ── Aqua Mineral ──
  {
    slug: 'aqua-mineral',
    name: 'Aqua Mineral',
    category: 'Skincare',
    logo: '/logo/aqua-mineral.svg',
    tagline: 'The Science of Beauty',
    hero: {
      headline: { line1: 'Marea Moartă,', line2Italic: 'formulată cu știință.' },
      subtitle:
        'Aqua Mineral by AERA Beauty transformă puterea minerală a Mării Moarte într-un ritual premium de skincare, inspirat de conceptul „Fountain of Youth". Formulele îmbină peste 35 de minerale esențiale, ape și nămoluri bogate în magneziu, calciu și potasiu, cu ingrediente naturale rare precum Dunaliella Salina — algă recunoscută pentru conținutul său de beta-caroten și rolul antioxidant.',
      paragraph:
        'Prin filosofia „ancient wisdom with modern science", Aqua Mineral aduce împreună tradiția minerală, biotehnologia cosmetică și ingrediente active avansate, inclusiv tehnologii dezvoltate de Sederma France, parte din Croda Beauty Actives. Rezultatul este o experiență de îngrijire cu texturi senzoriale, ritualuri inspirate de spa și efect vizibil de piele mai netedă, luminoasă și revitalizată.',
    },
    ranges: [
      {
        slug: 'basic-facial-care',
        name: 'Basic Facial Care',
        intro:
          'Produsele esențiale pentru curățarea tenului și pregătirea lui pentru îngrijirea ulterioară. Formulele eliberează porii, susțin absorbția ingredientelor active și mențin echilibrul pielii.',
        products: [
          {
            slug: 'daily-dewdrops-facial-cleanser',
            name: 'Daily Dewdrops Facial Cleanser',
            description: 'Lapte de curățare delicat, primul pas pentru o rutină completă.',
            activeIngredients: 'Ulei de migdale dulci, ulei din sâmburi de struguri, ingrediente blânde de curățare.',
            image: '/products/aqua/daily-dewdrops-facial-cleanser.jpg',
          },
          {
            slug: 'daily-dewdrops-facial-toner',
            name: 'Daily Dewdrops Facial Toner',
            description: 'Toner de completare a curățării, pentru prospețime și echilibru.',
            activeIngredients: 'Aloe vera, ingrediente tonifiante, extracte botanice calmante.',
            image: '/products/aqua/daily-dewdrops-facial-toner.jpg',
          },
          {
            slug: 'milky-facial-scrub',
            name: 'Milky Facial Scrub',
            description: 'Scrub facial blând pentru netezire și reîmprospătare.',
            activeIngredients: 'Dead Sea salts, pudră din sâmburi de caisă, aloe vera, mușețel, ulei de avocado, ulei de migdale.',
            image: '/products/aqua/milky-facial-scrub.jpg',
          },
          {
            slug: 'clarity-peeling-gel',
            name: 'Clarity Peeling Gel',
            description: 'Peeling gel pentru claritate, luminozitate și textură rafinată.',
            activeIngredients: 'Dead Sea minerals, Dunaliella Salina, vitamina E, aloe vera, mușețel.',
            image: '/products/aqua/clarity-peeling-gel.jpg',
          },
        ],
      },
      {
        slug: 'anti-aging',
        name: 'Anti Aging',
        intro:
          'O colecție completă de îngrijire zilnică și anti-aging, dezvoltată cu tehnologia brevetată Renovage™. Mineralele din Marea Moartă se întâlnesc cu inovația cosmetică pentru a susține structura și fermitatea pielii.',
        products: [
          {
            slug: 'optima-hydrating-day-cream-dry',
            name: 'Optima Hydrating Day Cream',
            volume: 'Ten normal spre uscat',
            description: 'Cremă de zi pentru ten normal-uscat, hidratare și confort.',
            activeIngredients: 'Dead Sea minerals, Renovage™, ingrediente emoliente și hidratante.',
            image: '/products/aqua/optima-hydrating-day-cream-dry.jpg',
          },
          {
            slug: 'optima-hydrating-day-cream-oily',
            name: 'Optima Hydrating Day Cream',
            volume: 'Ten normal spre gras',
            description: 'Cremă de zi pentru ten normal-gras, hidratare echilibrată.',
            activeIngredients: 'Dead Sea minerals, Renovage™, ingrediente hidratante cu textură potrivită tenului mixt/gras.',
            image: '/products/aqua/optima-hydrating-day-cream-oily.jpg',
          },
          {
            slug: 'youth-essence-serum',
            name: 'Youth Essence Serum',
            description: 'Ser anti-aging pentru rutina young / 30+, glow și vitalitate.',
            activeIngredients: 'Dead Sea minerals, Dunaliella Salina, ingrediente anti-aging și revitalizante.',
            image: '/products/aqua/youth-essence-serum.jpg',
          },
          {
            slug: 'uplift-firming-eye-gel',
            name: 'Uplift Firming Eye Gel',
            description: 'Gel pentru conturul ochilor, cu senzație de fermitate și prospețime.',
            activeIngredients: 'Dead Sea minerals, ingrediente cu efect de fermitate și decongestionare.',
            image: '/products/aqua/uplift-firming-eye-gel.jpg',
          },
        ],
      },
      {
        slug: 'optima-collection',
        name: 'Optima + Collection',
        intro:
          'O colecție în patru pași care hidratează intens și redă fermitatea pielii mature. Provitamina B5, mineralele Mării Moarte și tehnologia Resistem™ combat radicalii liberi, netezesc liniile fine și tonifiază tenul.',
        products: [
          {
            slug: 'supreme-face-serum',
            name: 'Supreme Face Serum',
            description: 'Ser premium pentru fermitate și elasticitate.',
            activeIngredients: 'Resistem™, Q10, vitamine, antioxidanți.',
            image: '/products/aqua/supreme-face-serum.jpg',
          },
        ],
      },
      {
        slug: 'gold-performance',
        name: 'Gold Performance',
        intro:
          'Concepută pentru pielea matură sau pentru tenul care prezintă semne de îmbătrânire, gama Gold Performance oferă atât un efect imediat de netezire, cât și rezultate progresive — îmbunătățind hidratarea, textura și aspectul pielii.',
        products: [
          {
            slug: '24k-intensive-face-cream',
            name: '24K Intensive Face Cream',
            description: 'Cremă premium pentru fermitate și luminozitate.',
            activeIngredients: '24K gold, Tightenex™, vitamina E, calendula, ingrediente nutritive.',
            image: '/products/aqua/24k-intensive-face-cream.jpg',
          },
          {
            slug: '24k-intensive-face-serum',
            name: '24K Intensive Face Serum',
            description: 'Ser luxos pentru fermitate, glow și rafinare.',
            activeIngredients: '24K gold, Tightenex™, antioxidanți, vitamina C, ulei din sâmburi de struguri.',
            image: '/products/aqua/24k-intensive-face-serum.jpg',
          },
          {
            slug: '24k-intensive-mask',
            name: '24K Intensive Mask',
            volume: '50 ml',
            description: 'Mască statement pentru glow auriu și fermitate.',
            activeIngredients: '24K gold, Tightenex™, uleiuri calmante, ingrediente nutritive.',
            image: '/products/aqua/24k-intensive-mask.jpg',
          },
        ],
      },
      {
        slug: 'premium',
        name: 'Premium Collection',
        intro:
          'Colecția premium completează rutina anti-aging cu produse dedicate pielii mature. Formulele oferă efecte vizibile imediate, susținute de ingrediente active care acționează țintit acolo unde pielea are cea mai mare nevoie.',
        products: [
          {
            slug: 'juveness-de-wrinkle-cream',
            name: 'Juveness De-Wrinkle Cream',
            description: 'Cremă premium anti-rid pentru piele cu aspect mai neted.',
            activeIngredients: 'Renovage™, Dead Sea minerals, ingrediente anti-aging.',
            image: '/products/aqua/juveness-de-wrinkle-cream.jpg',
          },
          {
            slug: 'extensor-deep-lifting-mask',
            name: 'Extensor Deep Lifting Mask',
            description: 'Mască premium pentru efect de lifting vizibil și rafinare.',
            activeIngredients: 'Tightenex™, Dead Sea minerals, active cu efect de tightening.',
            image: '/products/aqua/extensor-deep-lifting-mask.jpg',
          },
          {
            slug: 'puffiness-eraser',
            name: 'Puffiness Eraser',
            description: 'Tratament cosmetic cu efect rapid pentru zona ochilor, conceput să atenueze vizibil aspectul de pungi și oboseală.',
            activeIngredients: 'Eyeliss™, peptide, active pentru aspect de pungi reduse și contur ochi mai neted.',
            image: '/products/aqua/puffiness-eraser.jpg',
          },
        ],
      },
      {
        slug: 'smart-delivery-system',
        name: 'Smart Delivery System',
        intro:
          'Smart Delivery redefinește îngrijirea pielii prin tehnologii avansate de livrare: X50® Hyalufiller, CollaPlant Z NPNF® și PhytoCellTec™ Argan. Hidratează intens, stimulează colagenul și acidul hialuronic, îmbunătățește elasticitatea.',
        products: [
          {
            slug: 'smart-delivery-facial-cream',
            name: 'Smart Delivery Facial Cream',
            description: 'Cremă avansată cu tehnologii smart delivery pentru netezire vizibilă și hidratare în profunzime.',
            activeIngredients: 'X50® Hyalufiller™, CollaPlant Z NPNF®, delivery peptide complex.',
            image: '/products/aqua/smart-delivery-facial-cream.jpg',
          },
          {
            slug: 'timeless-glow-wrinkle-filler',
            name: 'Timeless Glow Wrinkle Filler',
            description: 'Filler cosmetic pentru riduri și linii de expresie, cu efect de umplere vizibil și luminozitate progresivă.',
            activeIngredients: 'Hyaluronic Filling Spheres™, microsfere cu efect de filling, acid hialuronic.',
            image: '/products/aqua/timeless-glow-wrinkle-filler.jpg',
          },
        ],
      },
      {
        slug: 'body-care',
        name: 'Body Care',
        intro:
          'Introducerea ideală în universul produselor inspirate de Marea Moartă. Mineralele exfoliante și uleiurile naturale lucrează împreună pentru o piele revitalizată în profunzime, netedă și hidratată.',
        products: [
          {
            slug: 'blissful-body-butter',
            name: 'Blissful Body Butter — Starlight Glamour',
            description: 'Unt de corp bogat, pentru hidratare și confort de durată.',
            activeIngredients: 'Shea butter, ulei de măsline, avocado, sâmburi de struguri, vitamine E & C, Dunaliella Salina.',
            image: '/products/aqua/blissful-body-butter.jpg',
          },
          {
            slug: 'total-silk-body-scrub',
            name: 'Total Silk Body Scrub — Forest Dreams',
            description: 'Exfoliant corporal spa, pentru piele netedă și catifelată.',
            activeIngredients: 'Dead Sea minerals, săruri minerale, ulei de sâmburi de struguri, susan, migdale dulci.',
            image: '/products/aqua/total-silk-body-scrub.jpg',
          },
        ],
      },
    ],
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

  // ── Oliere Paris ──
  {
    slug: 'oliere-paris',
    name: 'Oliere Paris',
    category: 'Haircare',
    logo: '/logo/oliere-paris.svg',
    hero: {
      headline: { line1: 'Uleiuri naturale,', line2Italic: 'rafinate pentru păr.' },
      subtitle:
        'Brand de top în îngrijirea profesională a părului, dezvoltat în colaborare cu chimiști din industria cosmetică franceză. Formulele îmbină tehnologia avansată cu o concentrație ridicată de uleiuri naturale, recunoscute pentru eficiența lor în repararea și revitalizarea firului de păr.',
      paragraph:
        'Fiecare produs conține un mix atent selectat de peste zece uleiuri naturale, bogate în nutrienți esențiali, pentru un păr sănătos și rezistent de la rădăcină până la vârfuri.',
    },
    ranges: [
      {
        slug: 'color-eclat',
        name: 'Color Éclat',
        intro:
          'Gama dedicată părului vopsit sau deteriorat chimic, concepută pentru a proteja culoarea și a reface structura firului. Uleiurile naturale și agenții de îngrijire avansați hrănesc în profunzime, reduc riscul de rupere și intensifică strălucirea.',
        products: [
          {
            slug: 'color-eclat-hair-shampoo',
            name: 'Color Éclat Hair Shampoo',
            volume: '500 ml',
            description: 'Șampon delicat pentru păr vopsit, care curăță în profunzime fără să afecteze culoarea sau strălucirea.',
            image: '/products/oliere/color-eclat-hair-shampoo.jpg',
          },
          {
            slug: 'color-eclat-hair-moisturizer',
            name: 'Color Éclat Hair Moisturizer',
            volume: '500 ml',
            description: 'Hidratant intensiv care reface elasticitatea firului și protejează culoarea de la o spălare la alta.',
            image: '/products/oliere/color-eclat-hair-moisturizer.jpg',
          },
          {
            slug: 'color-eclat-hair-serum',
            name: 'Color Éclat Hair Serum',
            volume: '150 ml',
            description: 'Ser care sigilează vârfurile, reduce frizz-ul și adaugă o strălucire vie părului vopsit.',
            image: '/products/oliere/color-eclat-hair-serum.jpg',
          },
          {
            slug: 'color-eclat-anti-dandruff-shampoo',
            name: 'Color Éclat Anti-Dandruff Shampoo',
            volume: '500 ml',
            description: 'Șampon anti-mătreață formulat pentru a curăța scalpul fără să compromită culoarea părului vopsit.',
            image: '/products/oliere/color-eclat-anti-dandruff-shampoo.jpg',
          },
        ],
      },
      {
        slug: 'acai',
        name: 'ACAI',
        intro:
          'Sub-gamă dedicată părului decolorat, vopsit sau șuvițat — concepută pentru a neutraliza nuanțele nedorite și a menține culoarea vibrantă. Uleiul pur de açaí corectează tonurile neuniforme, redă moliciunea și protejează părul împotriva efectelor UV și ale căldurii.',
        products: [
          {
            slug: 'color-eclat-acai-shampoo',
            name: 'Color Éclat ACAI Shampoo',
            volume: '500 ml',
            description: 'Șampon cu ulei pur de açaí pentru păr decolorat, care neutralizează tonurile portocalii și hrănește firul.',
            image: '/products/oliere/color-eclat-acai-shampoo.jpg',
          },
          {
            slug: 'color-eclat-acai-hair-mask',
            name: 'Color Éclat ACAI Hair Mask',
            volume: '500 ml',
            description: 'Mască restructurantă cu açaí, care redă moliciunea părului decolorat și uniformizează nuanța.',
            image: '/products/oliere/color-eclat-acai-hair-mask.jpg',
          },
        ],
      },
      {
        slug: 'valour',
        name: 'Valour',
        intro:
          'Gamă dedicată părului deteriorat de coafarea la căldură, cu reparare intensă și protecție avansată. Complexul de uleiuri naturale reface în profunzime și redă suplețea, iar formula protejează inclusiv împotriva particulelor metalice.',
        products: [
          {
            slug: 'valour-hair-shampoo',
            name: 'Valour Hair Shampoo',
            volume: '500 ml',
            description: 'Șampon reparator pentru păr deteriorat de căldură, care curăță delicat și pregătește firul pentru tratament.',
            image: '/products/oliere/valour-hair-shampoo.jpg',
          },
          {
            slug: 'valour-hair-mask',
            name: 'Valour Hair Mask',
            volume: '500 ml',
            description: 'Mască de reparare intensă care reconstruiește structura firului afectat de coafarea la cald.',
            image: '/products/oliere/valour-hair-mask.jpg',
          },
          {
            slug: 'valour-hair-conditioner',
            name: 'Valour Hair Conditioner',
            volume: '500 ml',
            description: 'Balsam reparator care descurcă, netezește și protejează firul împotriva agresiunilor zilnice.',
            image: '/products/oliere/valour-hair-conditioner.jpg',
          },
          {
            slug: 'valour-hair-serum',
            name: 'Valour Hair Serum',
            volume: '150 ml',
            description: 'Ser protector cu efect de scut termic, pentru un păr neted, strălucitor și rezistent la căldură.',
            image: '/products/oliere/valour-hair-serum.jpg',
          },
        ],
      },
      {
        slug: 'ordinaire',
        name: 'Ordinaire',
        intro:
          'Gamă dedicată părului normal până la uscat, formulată cu extract de avocado și ulei de semințe de in — bogate în vitamine și acizi grași esențiali. Echilibrul ideal între curățare, hidratare și protecție zilnică.',
        products: [
          {
            slug: 'ordinaire-hair-shampoo',
            name: 'Ordinaire Hair Shampoo',
            volume: '500 ml',
            description: 'Șampon zilnic cu avocado și ulei de in, care întărește firul și îi redă suplețea.',
            image: '/products/oliere/ordinaire-hair-shampoo.jpg',
          },
          {
            slug: 'ordinaire-nourishing-shampoo',
            name: 'Ordinaire Nourishing Shampoo',
            volume: '100 ml',
            description: 'Versiune travel-friendly a șamponului zilnic, cu același mix nutritiv de uleiuri și extracte.',
            image: '/products/oliere/ordinaire-nourishing-shampoo.jpg',
          },
          {
            slug: 'ordinaire-hair-mask',
            name: 'Ordinaire Hair Mask',
            volume: '500 ml',
            description: 'Mască hrănitoare pentru îngrijire săptămânală, care redă elasticitatea și aspectul sănătos.',
            image: '/products/oliere/ordinaire-hair-mask.jpg',
          },
          {
            slug: 'ordinaire-hair-serum',
            name: 'Ordinaire Hair Serum',
            volume: '150 ml',
            description: 'Ser ușor pentru finisare zilnică, cu parfum delicat și de durată, care nu încarcă firul.',
            image: '/products/oliere/ordinaire-hair-serum.jpg',
          },
        ],
      },
    ],
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

  // ── Redefine Matcha ──
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
            description: 'Șampon zilnic cu extract de matcha, pentru curățare delicată și senzație de scalp revitalizat.',
            image: '/products/redefine/matcha-series-hair-shampoo.jpg',
          },
          {
            slug: 'matcha-series-hair-mask',
            name: 'Matcha Series Hair Mask',
            volume: '500 ml',
            description: 'Mască pentru îngrijire săptămânală, creată pentru hrănire, netezire și elasticitate.',
            image: '/products/redefine/matcha-series-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-thin-hair-hair-mask',
            name: 'Matcha Series Hair Mask for Thin Hair',
            volume: '500 ml',
            description: 'Mască pentru păr fin, formulată pentru suplețe și senzație de densitate fără greutate.',
            image: '/products/redefine/matcha-series-thin-hair-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-leave-in-hair-mask',
            name: 'Matcha Series Leave-in Hair Mask',
            volume: '200 ml',
            description: 'Tratament fără clătire, pentru hidratare, protecție și disciplinarea firului.',
            image: '/products/redefine/matcha-series-leave-in-hair-mask.jpg',
          },
          {
            slug: 'matcha-series-hair-serum',
            name: 'Matcha Series Hair Serum',
            volume: '125 ml',
            description: 'Ser pentru strălucire, netezire și protecția vârfurilor.',
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
