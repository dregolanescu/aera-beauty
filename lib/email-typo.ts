/**
 * Sugestie „did you mean" pentru greșeli frecvente de domeniu în adrese de email.
 * Pur client-side, fără dependințe și fără apeluri de rețea. Nu validează — doar
 * propune o corecție când domeniul introdus e aproape de unul popular (ex: gmial.com
 * → gmail.com). Prinde majoritatea typo-urilor de domeniu; nu prinde local-part greșit.
 */

const POPULAR_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.ro',
  'ymail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'protonmail.com',
  'proton.me',
  'aol.com',
]

// Distanța Levenshtein (iterativă, memorie O(n)).
function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  let curr = new Array<number>(b.length + 1)

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(
        prev[j] + 1, // ștergere
        curr[j - 1] + 1, // inserare
        prev[j - 1] + cost, // substituire
      )
    }
    ;[prev, curr] = [curr, prev]
  }

  return prev[b.length]
}

/**
 * Întoarce o adresă corectată dacă domeniul pare un typo al unuia popular, altfel null.
 * Ex: „ana@gmial.com" → „ana@gmail.com". Dacă domeniul e deja cunoscut, întoarce null.
 */
export function suggestEmail(email: string): string | null {
  const trimmed = email.trim()
  const at = trimmed.lastIndexOf('@')
  if (at <= 0 || at === trimmed.length - 1) return null

  const local = trimmed.slice(0, at)
  const domain = trimmed.slice(at + 1).toLowerCase()

  // Domeniu deja corect — nicio sugestie.
  if (POPULAR_DOMAINS.includes(domain)) return null

  let best: string | null = null
  let bestDist = Number.POSITIVE_INFINITY

  for (const candidate of POPULAR_DOMAINS) {
    const dist = levenshtein(domain, candidate)
    if (dist < bestDist) {
      bestDist = dist
      best = candidate
    }
  }

  // Prag conservator: sugerăm doar dacă e foarte aproape (1–2 caractere diferență)
  // și nu suntem deja la distanță 0 (deja tratat mai sus).
  if (best && bestDist > 0 && bestDist <= 2) {
    return `${local}@${best}`
  }

  return null
}
