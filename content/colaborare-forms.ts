/**
 * Config-uri formulare B2B per brand pentru pagina /colaboreaza.
 * Fiecare brand are 5 secțiuni de opțiuni:
 *   profile     — single-select (radio)
 *   interest    — multi-select (checkbox)
 *   products    — multi-select (tag-uri)
 *   benefits    — multi-select (checkbox)
 *   followUp    — single-select (radio)
 *
 * Toate value-urile sunt slug-uri ASCII; label-urile au diacritice.
 */

export type Option = {
  value: string
  label: string
}

export type BrandColaborareConfig = {
  slug: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  name: string
  taglineForm: string
  profileLabel: string
  productsLabel: string
  benefitsLabel: string
  profile: Option[]
  interest: Option[]
  products: Option[]
  benefits: Option[]
}

export const followUpOptions: Option[] = [
  { value: 'whatsapp', label: 'Prefer contact prin WhatsApp' },
  { value: 'email', label: 'Prefer contact prin email' },
  { value: 'telefon', label: 'Prefer contact telefonic' },
]

export const colaborareConfigs: Record<string, BrandColaborareConfig> = {
  'aqua-mineral': {
    slug: 'aqua-mineral',
    name: 'Aqua Mineral',
    taglineForm:
      'Formular de contact pentru demo, recomandare, follow-up și parteneriat profesional.',
    profileLabel: 'Profil participant',
    productsLabel: 'Produse de interes',
    benefitsLabel: 'Efect / zonă de interes',
    profile: [
      { value: 'client-final', label: 'Client final / pasionat de skincare' },
      { value: 'specialist-beauty', label: 'Specialist beauty / cosmetician(ă)' },
      { value: 'medic', label: 'Medic / clinică estetică / dermatologie' },
      { value: 'salon-spa', label: 'Salon / spa / centru beauty' },
      { value: 'retail', label: 'Retail / concept store / distribuție' },
      { value: 'influencer', label: 'Influencer / creator de conținut' },
      { value: 'presa', label: 'Presă / PR' },
      { value: 'altul', label: 'Altul' },
    ],
    interest: [
      { value: 'demo', label: 'Demo produs' },
      { value: 'recomandare', label: 'Recomandare rutină skincare' },
      { value: 'achizitie', label: 'Achiziție produse' },
      { value: 'parteneriat', label: 'Parteneriat profesional' },
      { value: 'distributie', label: 'Distribuție / retail' },
      { value: 'training', label: 'Training / prezentare produse' },
      { value: 'social-media', label: 'Colaborare social media / PR' },
      { value: 'lansare', label: 'Informații lansare România' },
    ],
    products: [
      { value: 'puffiness-eraser', label: 'Puffiness Eraser' },
      { value: 'timeless-glow', label: 'Timeless Glow Wrinkle Filler' },
      { value: 'youth-essence', label: 'Youth Essence Serum' },
      { value: 'uplift-eye-gel', label: 'Uplift Firming Eye Gel' },
      { value: 'supreme-serum', label: 'Supreme Face Serum' },
      { value: 'extensor-mask', label: 'Extensor Deep Lifting Mask' },
      { value: '24k-mask', label: '24K Intensive Mask' },
      { value: '24k-cream', label: '24K Intensive Face Cream' },
      { value: '24k-serum', label: '24K Intensive Face Serum' },
      { value: 'juveness', label: 'Juveness De-Wrinkle Cream' },
      { value: 'smart-delivery-cream', label: 'Smart Delivery Facial Cream' },
      { value: 'optima-dry', label: 'Optima Hydrating Day Cream — uscat' },
      { value: 'optima-oily', label: 'Optima Hydrating Day Cream — gras' },
      { value: 'basic-care', label: 'Basic Facial Care (curățare)' },
      { value: 'body-care', label: 'Body Care (scrub & butter)' },
    ],
    benefits: [
      { value: 'hidratare', label: 'Hidratare' },
      { value: 'glow', label: 'Glow' },
      { value: 'fermitate', label: 'Fermitate' },
      { value: 'lifting', label: 'Lifting' },
      { value: 'anti-aging', label: 'Anti-aging' },
      { value: 'ochi-puffiness', label: 'Zona ochilor / puffiness' },
      { value: 'luminozitate', label: 'Luminozitate' },
      { value: 'textura-finete', label: 'Textură / finețe piele' },
      { value: 'ritual-premium', label: 'Ritual premium complet' },
    ],
  },
  'oliere-paris': {
    slug: 'oliere-paris',
    name: 'Oliere Paris',
    taglineForm:
      'Formular de contact pentru parteneriat B2B, follow-up și prezentare profesională.',
    profileLabel: 'Profil partener',
    productsLabel: 'Game / produse de interes',
    benefitsLabel: 'Tip de colaborare / nevoi',
    profile: [
      { value: 'salon', label: 'Salon / spa / centru beauty' },
      { value: 'distribuitor', label: 'Distribuitor / importator' },
      { value: 'retail-pro', label: 'Retail profesional / concept store' },
      { value: 'academie', label: 'Academie / educator / trainer' },
      { value: 'lant-saloane', label: 'Lanț de saloane' },
      { value: 'clinica', label: 'Clinică estetică / dermatologie' },
      { value: 'presa', label: 'Presă / PR' },
      { value: 'altul', label: 'Altul' },
    ],
    interest: [
      { value: 'prezentare', label: 'Prezentare brand' },
      { value: 'testare', label: 'Testare produse' },
      { value: 'parteneriat', label: 'Parteneriat profesional' },
      { value: 'distributie', label: 'Distribuție / retail' },
      { value: 'training', label: 'Training / educație' },
      { value: 'oferta', label: 'Ofertă comercială' },
      { value: 'lansare', label: 'Lansare România' },
      { value: 'kit-demo', label: 'Kit demo / mostre' },
    ],
    products: [
      { value: 'color-eclat-shampoo', label: "Color Éclat Shampoo" },
      { value: 'color-eclat-mask', label: "Color Éclat Hair Mask" },
      { value: 'color-eclat-serum', label: "Color Éclat Hair Serum" },
      { value: 'moisturizing', label: 'Moisturizing Hair Cream' },
      { value: 'acai-shampoo', label: 'ACAI Shampoo' },
      { value: 'acai-mask', label: 'ACAI Mask' },
      { value: 'anti-dandruff', label: 'Anti-Dandruff Shampoo' },
      { value: 'valour-shampoo', label: 'Valour Hair Shampoo' },
      { value: 'valour-mask', label: 'Valour Hair Mask' },
      { value: 'valour-conditioner', label: 'Valour Hair Conditioner' },
      { value: 'valour-serum', label: 'Valour Hair Serum' },
      { value: 'ordinaire-shampoo', label: 'Ordinaire Hair Shampoo' },
      { value: 'ordinaire-mask', label: 'Ordinaire Hair Mask' },
      { value: 'ordinaire-serum', label: 'Ordinaire Hair Serum' },
    ],
    benefits: [
      { value: 'backbar', label: 'Backbar / uz profesional' },
      { value: 'retail-salon', label: 'Retail în salon' },
      { value: 'distributie', label: 'Distribuție' },
      { value: 'training-echipa', label: 'Training echipă' },
      { value: 'listare', label: 'Listare produse' },
      { value: 'activari', label: 'Activări / evenimente' },
      { value: 'sampling', label: 'Travel size / sampling' },
      { value: 'suport-mkt', label: 'Suport marketing' },
    ],
  },
  'redefine-matcha': {
    slug: 'redefine-matcha',
    name: 'Redefine Matcha',
    taglineForm:
      'Formular de contact pentru recomandare, follow-up și interes comercial.',
    profileLabel: 'Profil participant',
    productsLabel: 'Produse de interes',
    benefitsLabel: 'Beneficiu / zonă de interes',
    profile: [
      { value: 'client-final', label: 'Client final / pasionat(ă) de haircare' },
      { value: 'retail', label: 'Retail / luxury mass market' },
      { value: 'salon', label: 'Salon / hairstylist / beauty specialist' },
      { value: 'distribuitor', label: 'Distribuitor / concept store' },
      { value: 'influencer', label: 'Influencer / creator de conținut' },
      { value: 'presa', label: 'Presă / PR' },
      { value: 'altul', label: 'Altul' },
    ],
    interest: [
      { value: 'demo', label: 'Demo produs' },
      { value: 'recomandare', label: 'Recomandare rutină haircare' },
      { value: 'achizitie', label: 'Achiziție produse' },
      { value: 'parteneriat', label: 'Parteneriat comercial' },
      { value: 'distributie', label: 'Distribuție / retail' },
      { value: 'training', label: 'Training / prezentare produse' },
      { value: 'social-media', label: 'Colaborare social media / PR' },
      { value: 'lansare', label: 'Informații lansare România' },
    ],
    products: [
      { value: 'matcha-shampoo', label: 'Matcha Shampoo' },
      { value: 'matcha-mask', label: 'Matcha Hair Mask' },
      { value: 'matcha-mask-fine', label: 'Matcha Hair Mask for Fine Hair' },
      { value: 'matcha-leave-in', label: 'Matcha Leave-In Hair Mask' },
      { value: 'matcha-serum', label: 'Matcha Hair Serum' },
    ],
    benefits: [
      { value: 'crestere', label: 'Stimulare creștere' },
      { value: 'densitate', label: 'Densitate' },
      { value: 'scalp', label: 'Îngrijirea scalpului' },
      { value: 'stralucire', label: 'Strălucire' },
      { value: 'volum', label: 'Volum' },
      { value: 'hidratare', label: 'Hidratare' },
      { value: 'reparare', label: 'Reparare' },
      { value: 'protectie-termica', label: 'Protecție termică' },
    ],
  },
}

export function getColaborareConfig(slug: string) {
  return colaborareConfigs[slug]
}

export type BrandSlug = keyof typeof colaborareConfigs
