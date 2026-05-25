/**
 * Patente & ingrediente active — Aqua Mineral.
 *
 * Folosit pe /produse/aqua-mineral în secțiunea editorială
 * de patente și ingrediente. Conține mărci înregistrate ale
 * partenerilor (Sederma / Croda Beauty Actives) și ingrediente
 * cheie comunicate în brief-ul clientului.
 *
 * Limbaj cosmetic strict — fără claims medicale.
 */

export type AquaIngredient = {
  slug: string
  name: string
  role: string
  description: string
}

export const aquaIngredients: AquaIngredient[] = [
  {
    slug: 'sederma',
    name: 'Sederma France / Croda Beauty Actives',
    role: 'Credibilitate științifică',
    description:
      'Sederma este parte din grupul Croda și dezvoltă ingrediente active inovatoare pentru cosmetice, cu expertiză recunoscută în biotehnologie și peptide. Mai multe formule Aqua Mineral folosesc tehnologii dezvoltate de Sederma.',
  },
  {
    slug: 'renovage',
    name: 'Renovage™',
    role: 'Skin longevity',
    description:
      'Ingredient activ asociat cu susținerea reînnoirii celulare, contribuind la un aspect mai neted al pielii și la reducerea vizibilă a liniilor fine. Folosit în gamele Anti Aging și Premium.',
  },
  {
    slug: 'resistem',
    name: 'Resistem™ / Globularia cordifolia',
    role: 'Self-defense & regeneration',
    description:
      'Activ vegetal comunicat pentru susținerea barierei defensive a pielii, contribuind la un aspect detoxifiat și la un glow tânăr. Inima colecției Optima+.',
  },
  {
    slug: 'tightenex',
    name: 'Tightenex™',
    role: 'Instant lifting',
    description:
      'Complex cu efect vizibil de tightening la aplicare, gândit pentru produse cu rezultat rapid pentru evenimente sau ritualuri express. Prezent în gamele Gold Performance și Premium.',
  },
  {
    slug: 'eyeliss',
    name: 'Eyeliss™',
    role: 'Eye peptide technology',
    description:
      'Complex de peptide pentru zona ochilor, comunicat pentru un aspect de pungi diminuate, contur mai neted și o privire mai odihnită. Activul principal din Puffiness Eraser.',
  },
  {
    slug: 'arbutin',
    name: 'Arbutin™ Bearberry',
    role: 'Brightening',
    description:
      'Activ derivat din bearberry, folosit pentru luminozitate și pentru un aspect uniform al pielii, contribuind la atenuarea petelor pigmentare.',
  },
  {
    slug: 'mediatone',
    name: 'Mediatone™',
    role: 'Pigmentation control',
    description:
      'Activ cosmetic pentru reglarea aspectului de pigmentare și uniformizarea tonului pielii. Asociat cu un teint mai luminos și mai omogen.',
  },
  {
    slug: 'keratoline',
    name: 'Keratoline™',
    role: 'Gentle renewal',
    description:
      'Alternativă blândă la AHA, pentru o reînnoire delicată a pielii, textură mai fină și aspect proaspăt. Potrivit pentru tenuri sensibile.',
  },
  {
    slug: 'poretect',
    name: 'PoreTect™',
    role: 'Texture & pores',
    description:
      'Activ extras din semințe de in și țelină, comunicat pentru senzație de fermitate, pori cu aspect mai strâns și textură satinată.',
  },
  {
    slug: 'crystalide',
    name: 'Crystalide™',
    role: 'Glass skin / clarity',
    description:
      'Peptidă asociată cu un aspect de piele clară, luminoasă și uniformă — în spiritul tendinței „glass skin".',
  },
  {
    slug: 'x50-hyalufiller',
    name: 'X50® Hyalufiller™',
    role: 'Smart delivery',
    description:
      'Tehnologie smart delivery pentru un aspect de volum, hidratare susținută și netezire vizibilă a pielii. Activ-cheie în colecția Smart Delivery.',
  },
  {
    slug: 'phytocelltec-argan',
    name: 'PhytoCellTec™ Argan',
    role: 'Plant stem cell active',
    description:
      'Activ obținut din celule stem vegetale de argan, comunicat pentru revitalizare și un aspect de piele regenerată.',
  },
  {
    slug: 'hyaluronic-spheres',
    name: 'Hyaluronic Filling Spheres™',
    role: 'Wrinkle filling effect',
    description:
      'Microsfere cu acid hialuronic, comunicate pentru hidratare, plumping și un aspect netezit al ridurilor. Tehnologia din spatele Timeless Glow Wrinkle Filler.',
  },
  {
    slug: 'dunaliella-salina',
    name: 'Dunaliella Salina',
    role: 'Natural antioxidant',
    description:
      'Algă specifică mediului extrem al Mării Moarte, bogată în beta-caroten. Folosită ca antioxidant natural și precursor de vitamina A în formulele Aqua Mineral.',
  },
  {
    slug: '24k-gold',
    name: '24K Gold',
    role: 'Luxury glow',
    description:
      'Element de lux și luminozitate, asociat cu ritualul premium, cu un glow vizibil și o senzație de fermitate. Inima colecției Gold Performance.',
  },
  {
    slug: 'q10',
    name: 'Q10',
    role: 'Energy & antioxidant support',
    description:
      'Ingredient antioxidant asociat cu vitalitate și cu un aspect de piele energizată. Parte din formulele anti-aging Optima+.',
  },
]
