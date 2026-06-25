export type Product = {
  slug: string
  name: string
  description: string
  activeIngredients?: string
  /** Direcții de folosire — cum se aplică. */
  directions?: string
  /** Recomandare de utilizare — frecvență, moment al zilei. */
  usage?: string
  /** Rutină complementară — ce produse merg împreună. */
  complementaryRoutine?: string
  /** Frază de închidere — promisiunea finală scurtă. */
  closingPhrase?: string
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
        slug: 'body-rituals',
        name: 'Body Rituals',
        intro:
          'Rituale corporale spa pentru piele catifelată, hidratată în profunzime și un moment de calm la final de zi.',
        products: [
          {
            slug: 'total-silk-body-scrub',
            name: 'Total Silk Body Scrub — Forest Dreams',
            image: '/products/aqua/total-silk-body-scrub.jpg',
            description: 'Exfoliant corporal spa, pentru piele netedă și catifelată.',
            activeIngredients: 'Dead Sea minerals, săruri minerale, ulei de sâmburi de struguri, susan, migdale dulci.',
            directions: 'Masează pe pielea umedă, cu mișcări circulare, apoi clătește.',
            usage: '1-2 ori pe săptămână.',
            complementaryRoutine: 'După scrub: Blissful Body Butter.',
            closingPhrase: 'Piele catifelată, netezită și luminoasă după primul ritual.',
          },
          {
            slug: 'blissful-body-butter',
            name: 'Blissful Body Butter — Starlight Glamour',
            image: '/products/aqua/blissful-body-butter.jpg',
            description: 'Unt de corp bogat, pentru hidratare și confort de durată.',
            activeIngredients: 'Shea butter, ulei de măsline, avocado, sâmburi de struguri, vitamine E & C, Dunaliella Salina.',
            directions: 'Aplică pe corp și masează până la absorbție.',
            usage: 'Zilnic sau după exfoliere.',
            complementaryRoutine: 'După Total Silk Body Scrub.',
            closingPhrase: 'Închide ritualul cu un strat bogat de hidratare și confort.',
          },
        ],
      },
      {
        slug: 'skin-essentials',
        name: 'Skin Essentials',
        intro:
          'Pașii esențiali ai oricărei rutine — curățare delicată, prospețime și pregătirea pielii pentru ingredientele active care urmează.',
        products: [
          {
            slug: 'daily-dewdrops-facial-cleanser',
            name: 'Daily Dewdrops Facial Cleanser',
            image: '/products/aqua/daily-dewdrops-facial-cleanser.jpg',
            description: 'Lapte de curățare delicat, primul pas pentru o rutină completă.',
            activeIngredients: 'Ulei de migdale dulci, ulei din sâmburi de struguri, ingrediente blânde de curățare.',
            directions: 'Aplică pe tenul umed, masează ușor și clătește.',
            usage: 'Dimineața și seara.',
            complementaryRoutine: 'Urmează cu Daily Dewdrops Facial Toner.',
            closingPhrase: 'Ten curat, proaspăt și pregătit pentru tratament.',
          },
          {
            slug: 'daily-dewdrops-facial-toner',
            name: 'Daily Dewdrops Facial Toner',
            image: '/products/aqua/daily-dewdrops-facial-toner.jpg',
            description: 'Toner de completare a curățării, pentru prospețime și echilibru.',
            activeIngredients: 'Aloe vera, ingrediente tonifiante, extracte botanice calmante.',
            directions: 'Aplică pe dischetă și trece ușor pe față și gât.',
            usage: 'După cleanser, înainte de serum.',
            complementaryRoutine: 'Bază pentru orice rutină Aqua.',
            closingPhrase: 'Finalizează curățarea și lasă pielea revigorată.',
          },
          {
            slug: 'milky-facial-scrub',
            name: 'Milky Facial Scrub',
            image: '/products/aqua/milky-facial-scrub.jpg',
            description: 'Scrub facial blând pentru netezire și reîmprospătare.',
            activeIngredients: 'Dead Sea salts, pudră din sâmburi de caisă, aloe vera, mușețel, ulei de avocado, ulei de migdale.',
            directions: 'Masează delicat pe tenul umed, evitând zona ochilor, apoi clătește.',
            usage: '1-2 ori pe săptămână.',
            complementaryRoutine: 'Nu se suprapune cu peeling în aceeași seară.',
            closingPhrase: 'Un pas de reînnoire pentru ten mai fin și mai luminos.',
          },
          {
            slug: 'clarity-peeling-gel',
            name: 'Clarity Peeling Gel',
            volume: '50 ml',
            image: '/products/aqua/clarity-peeling-gel.jpg',
            description: 'Peeling gel pentru claritate, luminozitate și textură rafinată.',
            activeIngredients: 'Dead Sea minerals, Dunaliella Salina, vitamina E, aloe vera, mușețel.',
            directions: 'Aplică pe ten curat, masează până când textura adună impuritățile, apoi clătește.',
            usage: '1 dată pe săptămână.',
            complementaryRoutine: 'Seara; continuă cu serum și cremă.',
            closingPhrase: 'Dezvăluie o textură mai netedă și un aspect mai clar.',
          },
        ],
      },
      {
        slug: 'timeless-hydration',
        name: 'Timeless Hydration',
        intro:
          'Hidratare zilnică și anti-aging cu tehnologia brevetată Renovage™. Mineralele Mării Moarte se întâlnesc cu inovația cosmetică pentru o piele suplă, fermă și odihnită.',
        products: [
          {
            slug: 'youth-essence-serum',
            name: 'Youth Essence Serum',
            image: '/products/aqua/youth-essence-serum.jpg',
            description: 'Ser anti-aging pentru rutina young / 30+, glow și vitalitate.',
            activeIngredients: 'Dead Sea minerals, Dunaliella Salina, ingrediente anti-aging și revitalizante.',
            directions: 'Aplică pe ten curat, după toner, înainte de cremă.',
            usage: 'Dimineața.',
            complementaryRoutine: 'Cu Optima Hydrating Day Cream.',
            closingPhrase: 'Concentrează energia rutinei într-un pas luminos.',
          },
          {
            slug: 'optima-hydrating-day-cream-dry',
            name: 'Optima Hydrating Day Cream',
            volume: 'Ten normal spre uscat',
            image: '/products/aqua/optima-hydrating-day-cream-dry.jpg',
            description: 'Cremă de zi pentru ten normal-uscat, hidratare și confort.',
            activeIngredients: 'Dead Sea minerals, Renovage™, ingrediente emoliente și hidratante.',
            directions: 'Aplică dimineața pe față și gât.',
            usage: 'Zilnic.',
            complementaryRoutine: 'După Youth Essence Serum.',
            closingPhrase: 'Hidratare premium pentru un ten suplu și confortabil.',
          },
          {
            slug: 'optima-hydrating-day-cream-oily',
            name: 'Optima Hydrating Day Cream',
            volume: 'Ten normal spre gras',
            image: '/products/aqua/optima-hydrating-day-cream-oily.jpg',
            description: 'Cremă de zi pentru ten normal-gras, hidratare echilibrată.',
            activeIngredients: 'Dead Sea minerals, Renovage™, ingrediente hidratante cu textură potrivită tenului mixt/gras.',
            directions: 'Aplică dimineața în strat subțire.',
            usage: 'Zilnic.',
            complementaryRoutine: 'După Youth Essence Serum.',
            closingPhrase: 'Hidratare echilibrată, fără senzație încărcată.',
          },
          {
            slug: 'replenishing-night-cream',
            name: 'Replenishing Night Cream',
            image: '/products/aqua/replenishing-night-cream.jpg',
            description: 'Cremă de noapte pentru confort, refacere și suplețe.',
            activeIngredients: 'Dead Sea minerals, ingrediente nutritive și emoliente.',
            directions: 'Aplică seara pe față și gât, după serum/booster.',
            usage: 'Seara.',
            complementaryRoutine: 'Cu Fountain of Youth Serum Booster.',
            closingPhrase: 'Dimineața, pielea arată mai odihnită și mai catifelată.',
          },
          {
            slug: 'uplift-firming-eye-gel',
            name: 'Uplift Firming Eye Gel',
            image: '/products/aqua/uplift-firming-eye-gel.jpg',
            description: 'Gel pentru conturul ochilor, cu senzație de fermitate și prospețime.',
            activeIngredients: 'Dead Sea minerals, ingrediente cu efect de fermitate și decongestionare.',
            directions: 'Aplică delicat cu degetul inelar, prin tapotare.',
            usage: 'Dimineața și/sau seara.',
            complementaryRoutine: 'În rutina anti-aging blue.',
            closingPhrase: 'Privire mai proaspătă și contur mai neted.',
          },
        ],
      },
      {
        slug: 'timeless-lift',
        name: 'Timeless Lift',
        intro:
          'Produse premium cu efect vizibil de lifting și rafinare, pentru ten cu nevoie de tightening, glow și prospețime imediată — perfect înainte de evenimente.',
        products: [
          {
            slug: 'extensor-deep-lifting-mask',
            name: 'Extensor Deep Lifting Mask',
            volume: '50 ml',
            image: '/products/aqua/extensor-deep-lifting-mask.jpg',
            description: 'Mască premium pentru lifting vizibil și rafinare.',
            activeIngredients: 'Tightenex™, Dead Sea minerals, active cu efect de tightening.',
            directions: 'Aplică pe ten curat, lasă să acționeze, apoi îndepărtează conform indicațiilor.',
            usage: '1-2 ori pe săptămână sau înainte de evenimente.',
            complementaryRoutine: 'Cu Juveness De-Wrinkle Cream.',
            closingPhrase: 'Pentru piele cu efect vizibil de lifting și rafinare.',
          },
          {
            slug: 'juveness-de-wrinkle-cream',
            name: 'Juveness De-Wrinkle Cream',
            volume: '50 ml',
            image: '/products/aqua/juveness-de-wrinkle-cream.jpg',
            description: 'Cremă premium anti-rid pentru piele cu aspect neted.',
            activeIngredients: 'Renovage™, Dead Sea minerals, ingrediente anti-aging.',
            directions: 'Aplică pe față și gât.',
            usage: 'Dimineața și/sau seara.',
            complementaryRoutine: 'Cu Turn Back Time Serum Booster seara.',
            closingPhrase: 'Un ritual premium pentru un ten mai rafinat.',
          },
          {
            slug: 'miracle-serum-capsules',
            name: 'Miracle Serum Capsules',
            volume: '30 capsule',
            image: '/products/aqua/miracle-serum-capsules.jpg',
            description: 'Capsule serum concentrat pentru glow și rutină intensivă.',
            activeIngredients: 'Dead Sea water, vitamina E, collagen / complex revitalizant.',
            directions: 'Rupe o capsulă și aplică serum-ul pe ten curat, prin masaj ușor.',
            usage: 'Seara, 30 zile consecutiv pentru rezultate maxime; înainte de evenimente speciale.',
            complementaryRoutine: 'După toner, înainte de cremă.',
            closingPhrase: 'O capsulă hero pentru glow, suplețe și confort vizibil.',
          },
          {
            slug: 'puffiness-eraser',
            name: 'Puffiness Eraser',
            image: '/products/aqua/puffiness-eraser.jpg',
            description: 'Tratament instant pentru zona ochilor, produs hero de demo.',
            activeIngredients: 'Eyeliss™, peptide, active pentru pungi / contur ochi.',
            directions: 'Pe piele perfect curată și uscată; cantitate cât o boabă de mazăre pentru ambii ochi; tapotare, nu întindere.',
            usage: 'Daytime, înainte de evenimente sau când zona ochilor este obosită.',
            complementaryRoutine: 'Nu aplica alte produse înainte pe zona respectivă.',
            closingPhrase: 'Privire mai odihnită, pungi estompate vizibil, efect instant.',
          },
        ],
      },
      {
        slug: 'optima-plus',
        name: 'Optima+',
        intro:
          'Colecția anti-aging avansată cu tehnologia Resistem™ și Q10. Susține bariera defensivă a pielii, combate radicalii liberi și tonifiază tenul matur.',
        products: [
          {
            slug: 'supreme-eye-lip-cream',
            name: 'Supreme Eye & Lip Cream',
            volume: '30 ml',
            image: '/products/aqua/supreme-eye-lip-cream.jpg',
            description: 'Mască termică pentru detox, deschidere pori și confort.',
            activeIngredients: 'Resistem™, Q10, Dead Sea minerals, efect termic la contact cu apa.',
            directions: 'Aplică pe ten umed, masează ușor, apoi clătește.',
            usage: '1-2 ori pe săptămână.',
            complementaryRoutine: 'Înainte de Supreme Face Serum.',
            closingPhrase: 'Un ritual cald, detoxifiant și premium.',
          },
          {
            slug: 'supreme-face-cream',
            name: 'Supreme Face Cream',
            volume: '50 ml',
            image: '/products/aqua/supreme-face-cream.jpg',
            description: 'Ser premium pentru fermitate și elasticitate.',
            activeIngredients: 'Resistem™, Q10, vitamine, antioxidanți.',
            directions: 'Aplică după toner, înainte de cremă.',
            usage: 'Dimineața sau seara.',
            complementaryRoutine: 'Cu Supreme Face Cream.',
            closingPhrase: 'Un pas concentrat pentru fermitate și glow.',
          },
          {
            slug: 'supreme-face-serum',
            name: 'Supreme Face Serum',
            volume: '40 ml',
            image: '/products/aqua/supreme-face-serum.jpg',
            description: 'Cremă premium pentru piele matură, confort și protecție.',
            activeIngredients: 'Resistem™, capsule vitamina E, ingrediente hidratante și antioxidante.',
            directions: 'Aplică pe față și gât.',
            usage: 'Dimineața și/sau seara.',
            complementaryRoutine: 'După Supreme Face Serum / Optima+ Booster.',
            closingPhrase: 'Hidratare premium împotriva aspectului obosit.',
          },
          {
            slug: 'supreme-thermal-mask',
            name: 'Supreme Thermal Mask',
            volume: '100 ml',
            image: '/products/aqua/supreme-thermal-mask.jpg',
            description: 'Cremă dedicată zonelor delicate: ochi și buze.',
            activeIngredients: 'Resistem™, uleiuri naturale, vitamine, ingrediente pentru elasticitate.',
            directions: 'Aplică prin tapotare cu degetul inelar.',
            usage: 'Dimineața și seara.',
            complementaryRoutine: 'În rutina Optima+.',
            closingPhrase: 'Un gest mic pentru zonele care arată primele semne ale timpului.',
          },
        ],
      },
      {
        slug: 'gold-performance',
        name: 'Gold Performance',
        intro:
          'Particule de aur 24K combinate cu Tightenex™ pentru un ritual statement — luminozitate aurie, fermitate vizibilă și o experiență premium completă.',
        products: [
          {
            slug: '24k-intensive-eye-cream',
            name: '24K Intensive Eye Cream',
            volume: '30 ml',
            image: '/products/aqua/24k-intensive-eye-cream.jpg',
            description: 'Mască statement pentru glow auriu și fermitate.',
            activeIngredients: '24K gold, Tightenex™, uleiuri calmante, ingrediente nutritive.',
            directions: 'Aplică pe ten curat, lasă să acționeze, apoi îndepărtează.',
            usage: '1-2 ori pe săptămână sau înainte de evenimente.',
            complementaryRoutine: 'Cu 24K Face Serum și 24K Face Cream.',
            closingPhrase: 'Luminozitate aurie și aspect de ten netezit.',
          },
          {
            slug: '24k-intensive-face-cream',
            name: '24K Intensive Face Cream',
            volume: '50 ml',
            image: '/products/aqua/24k-intensive-face-cream.jpg',
            description: 'Ser luxos pentru fermitate, glow și rafinare.',
            activeIngredients: '24K gold, Tightenex™, antioxidanți, vitamina C, ulei din sâmburi de struguri.',
            directions: 'Aplică pe ten curat, înainte de cremă.',
            usage: 'Dimineața și/sau seara.',
            complementaryRoutine: 'Cu 24K Face Cream.',
            closingPhrase: 'Un serum luxos pentru fermitate și glow.',
          },
          {
            slug: '24k-intensive-face-serum',
            name: '24K Intensive Face Serum',
            volume: '30 ml',
            image: '/products/aqua/24k-intensive-face-serum.jpg',
            description: 'Cremă premium pentru fermitate și luminozitate.',
            activeIngredients: '24K gold, Tightenex™, vitamina E, calendula, ingrediente nutritive.',
            directions: 'Aplică pe față și gât după serum.',
            usage: 'Dimineața și seara.',
            complementaryRoutine: 'Cu 24K Face Serum.',
            closingPhrase: 'Ten cu aspect mai ferm, suplu și luminos.',
          },
          {
            slug: '24k-intensive-mask',
            name: '24K Intensive Mask',
            volume: '50 ml',
            image: '/products/aqua/24k-intensive-mask.jpg',
            description: 'Cremă luxoasă pentru conturul ochilor.',
            activeIngredients: 'Tightenex™, shea butter, aloe vera, ingrediente pentru netezire.',
            directions: 'Aplică delicat cu degetul inelar.',
            usage: 'Dimineața și seara.',
            complementaryRoutine: 'Doar în rutina Gold Performance.',
            closingPhrase: 'Contur al ochilor mai catifelat și odihnit.',
          },
        ],
      },
      {
        slug: 'smart-delivery-system',
        name: 'Smart Delivery System',
        intro:
          'Tehnologii avansate de livrare: X50® Hyalufiller™, CollaPlant Z NPNF® și PhytoCellTec™ Argan. Hidratează intens, stimulează colagenul și redă elasticitatea.',
        products: [
          {
            slug: 'smart-delivery-facial-cream',
            name: 'Smart Delivery Facial Cream',
            image: '/products/aqua/smart-delivery-facial-cream.jpg',
            description: 'Cremă avansată cu tehnologii smart delivery pentru netezire.',
            activeIngredients: 'X50® Hyalufiller™, CollaPlant Z NPNF®, delivery peptide complex.',
            directions: 'Aplică pe față și gât după serum sau filler.',
            usage: 'Zilnic, mai ales seara sau ca ultim pas.',
            complementaryRoutine: 'Cu Timeless Glow Wrinkle Filler sau Leave-On Mask.',
            closingPhrase: 'Tehnologie avansată pentru piele cu aspect mai ferm.',
          },
          {
            slug: 'smart-delivery-leave-on-mask',
            name: 'Smart Delivery Leave-On Mask',
            image: '/products/aqua/smart-delivery-leave-on-mask.jpg',
            description: 'Mască leave-on cu acțiune avansată pentru hidratare și revitalizare.',
            activeIngredients: 'X50® Hyalufiller™, PhytoCellTec™ Argan, CollaPlant Z NPNF®, activ din celule stem vegetale de argan.',
            directions: 'Aplică seara pe ten curat și lasă să acționeze, fără clătire.',
            usage: 'Seara, când pielea are nevoie de regenerare și hidratare intensă.',
            complementaryRoutine: 'Cu Smart Delivery Facial Cream dacă este necesar.',
            closingPhrase: 'Smart delivery pentru piele mai plină și netedă.',
          },
          {
            slug: 'timeless-glow-wrinkle-filler',
            name: 'Timeless Glow Wrinkle Filler',
            image: '/products/aqua/timeless-glow-wrinkle-filler.jpg',
            description: 'Filler cosmetic instant pentru riduri și linii de expresie.',
            activeIngredients: 'Hyaluronic Filling Spheres™, microsfere cu efect de filling, acid hialuronic.',
            directions: 'Aplică local cu dispozitivul, tapotează, așteaptă 5-6 minute fără mimică.',
            usage: 'Înainte de evenimente sau machiaj.',
            complementaryRoutine: 'Bază excelentă de make-up.',
            closingPhrase: 'Aspect neted și proaspăt în câteva minute.',
          },
        ],
      },
      {
        slug: 'advanced-skin-boosters',
        name: 'Advanced Skin Boosters',
        intro:
          'Boostere serum concentrate pentru fiecare nevoie specifică — glow, textură, reînnoire blândă, luminozitate. Se adaugă în rutina existentă pentru un plus țintit.',
        products: [
          {
            slug: 'fountain-of-youth-booster',
            name: 'Fountain of Youth Serum Booster',
            image: '/products/aqua/fountain-of-youth-booster.jpg',
            description: 'Booster pentru glow, uniformitate și glass skin.',
            activeIngredients: 'Crystalide™ peptide, ingrediente pentru claritate și luminozitate.',
            directions: 'Aplică seara după toner, înainte de cremă.',
            usage: 'Seara, în rutina anti-aging blue.',
            complementaryRoutine: 'Cu Replenishing Night Cream.',
            closingPhrase: 'Piele luminoasă, netedă, cu aspect glass skin.',
          },
          {
            slug: 'turn-back-time-booster',
            name: 'Turn Back Time Serum Booster',
            image: '/products/aqua/turn-back-time-booster.jpg',
            description: 'Booster pentru textură, pori și aspect satinat.',
            activeIngredients: 'PoreTect™, ciclopeptide din semințe de in și țelină.',
            directions: 'Aplică seara pe zonele cu textură / pori vizibili.',
            usage: 'Seara, în Premium Collection.',
            complementaryRoutine: 'Cu Juveness De-Wrinkle Cream.',
            closingPhrase: 'Textură mai fină, pori estompați, aspect satinat.',
          },
          {
            slug: 'optima-plus-supreme-booster',
            name: 'Optima+ Supreme Serum Booster',
            image: '/products/aqua/optima-plus-supreme-booster.jpg',
            description: 'Booster pentru reînnoire blândă și aspect proaspăt.',
            activeIngredients: 'Keratoline™, Dead Sea water, ingrediente calmante.',
            directions: 'Aplică seara după toner.',
            usage: 'Seara, în rutina Optima+.',
            complementaryRoutine: 'Cu Supreme Face Cream.',
            closingPhrase: 'O alternativă blândă pentru ten mai proaspăt.',
          },
          {
            slug: 'light-and-bright-booster',
            name: 'Light & Bright Serum Booster',
            image: '/products/aqua/light-and-bright-booster.jpg',
            description: 'Booster pentru luminozitate și uniformizare.',
            activeIngredients: 'Mediatone™, octadecenediotic acid purificat, activ pentru controlul aspectului de pigmentare.',
            directions: 'Aplică seara pe zonele cu aspect neuniform sau pe toată fața.',
            usage: 'Seara, în rutina Light & Bright.',
            complementaryRoutine: 'Cu Light & Bright Moisturizing Cream.',
            closingPhrase: 'Booster dedicat luminozității și uniformizării.',
          },
        ],
      },
      {
        slug: 'mineral-infusion-masks',
        name: 'Mineral Infusion Masks',
        intro:
          'Sheet masks premium cu minerale din Marea Moartă — un ritual express de hidratare, glow sau detox. Efectul vizibil al unui tratament spa, în 15-20 minute.',
        products: [
          {
            slug: 'sheet-mask-detox',
            name: 'Sheet Mask Detox',
            image: '/products/aqua/sheet-mask-detox.jpg',
            description: 'Sheet mask cu efect detox, pentru pori curățați în profunzime și un ten vizibil mai clar.',
            activeIngredients: 'Magnez activ, kaolin, Dead Sea minerals, hyaluronic acid.',
            directions: 'Aplică pe ten curat, lasă să acționeze 15-20 minute, apoi masează excesul absorbit.',
            usage: '1-2 ori pe săptămână sau înainte de momente cu zoom-uri.',
            complementaryRoutine: 'După curățare și exfoliere, înainte de serum hidratant.',
            closingPhrase: 'Detox rapid și aspect proaspăt în doar 20 minute.',
          },
          {
            slug: 'sheet-mask-gold-24k',
            name: 'Sheet Mask Gold 24K',
            image: '/products/aqua/sheet-mask-gold-24k.jpg',
            description: 'Sheet mask premium cu particule de aur 24K, pentru un glow auriu și fermitate vizibilă într-un singur pas.',
            activeIngredients: '24K gold, hyaluronic acid, Dead Sea minerals, peptide tightening.',
            directions: 'Aplică masca pe ten curat, lasă să acționeze 15-20 minute, apoi masează excesul absorbit.',
            usage: '1-2 ori pe săptămână sau înainte de evenimente speciale.',
            complementaryRoutine: 'În ritualul Gold Performance, după serum și înainte de cremă.',
            closingPhrase: 'Un ritual statement cu luminozitate aurie și aspect ferm.',
          },
          {
            slug: 'sheet-mask-nourishing',
            name: 'Sheet Mask Nourishing',
            image: '/products/aqua/sheet-mask-nourishing.jpg',
            description: 'Sheet mask hrănitoare pentru hidratare profundă, suplețe și un aspect catifelat încă de la prima aplicare.',
            activeIngredients: 'Dead Sea minerals, hyaluronic acid, ulei de jojoba, vitamine E.',
            directions: 'Aplică pe ten curat, lasă să acționeze 15-20 minute, apoi masează excesul.',
            usage: '1-2 ori pe săptămână sau ori de câte ori pielea simte sete.',
            complementaryRoutine: 'După curățare, urmat de serumul preferat și cremă.',
            closingPhrase: 'Hidratare premium și confort imediat pentru piele odihnită.',
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
