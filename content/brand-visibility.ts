/**
 * Vizibilitatea publică a brandurilor pe aerabeauty.ro — sursa unică.
 *
 * Un brand trecut în HIDDEN_BRANDS dispare din toate suprafețele publice
 * (home, /produse, footer, formularul de precomandă, /colaboreaza), iar
 * pagina lui de brand răspunde 404. Datele rămân intacte: produse, imagini
 * și texte în content/products.ts, formularele B2B în
 * content/colaborare-forms.ts, valorile acceptate de server actions.
 *
 * Restaurare:
 *   1. Scoate slug-ul din HIDDEN_BRANDS.
 *   2. Textele care enumerau toate brandurile (meta descrieri, /produse,
 *      /despre, /colaboreaza) au fost ajustate într-un commit separat,
 *      „content: scoate mentiunile Oliere/Redefine din copy-ul public" —
 *      fă `git revert` pe el ca să revină formulările originale.
 *
 * Modul fără dependențe, ca să poată fi importat și din componente client
 * fără să tragă tot catalogul în bundle.
 */

export type BrandSlug = 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'

/** Ascunse public la cererea clientului (oct. 2026). */
export const HIDDEN_BRANDS: readonly BrandSlug[] = [
  'oliere-paris',
  'redefine-matcha',
]

export function isBrandPublic(slug: string): boolean {
  return !(HIDDEN_BRANDS as readonly string[]).includes(slug)
}
