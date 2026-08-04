import { promises as dns } from 'node:dns'

/**
 * Verifică dacă domeniul unei adrese de email poate primi email — are înregistrări MX
 * sau, în lipsa lor, un A record (RFC 5321 permite livrarea pe A dacă nu există MX).
 *
 * Politică fail-open: dacă lookup-ul DNS e neconcludent (timeout, SERVFAIL, rețea),
 * întoarce `true` ca să nu blocheze lead-uri reale din cauza unui hopa temporar de DNS.
 * Întoarce `false` DOAR când domeniul clar nu există sau clar nu primește email.
 *
 * Notă: verifică domeniul, nu mailbox-ul. Nu prinde „adresă inexistentă la domeniu valid"
 * (ex: typo în partea locală la @yahoo.com) — pentru asta ar fi nevoie de un serviciu SMTP.
 */
export async function domainAcceptsEmail(email: string): Promise<boolean> {
  const domain = email.split('@')[1]?.trim().toLowerCase()
  if (!domain) return false

  // Un domeniu inexistent / fără înregistrări dă ENOTFOUND sau ENODATA.
  // Orice altă eroare (ETIMEOUT, ESERVFAIL, EREFUSED...) = neconcludent → fail-open.
  const isDefinitiveMiss = (err: unknown): boolean => {
    const code = (err as { code?: string } | null)?.code
    return code === 'ENOTFOUND' || code === 'ENODATA'
  }

  // 1. Înregistrări MX
  try {
    const mx = await dns.resolveMx(domain)
    if (mx.length > 0) return true
    // fără MX → continuăm cu fallback pe A record
  } catch (err) {
    if (!isDefinitiveMiss(err)) return true
  }

  // 2. Fallback pe A record
  try {
    const a = await dns.resolve4(domain)
    return a.length > 0
  } catch (err) {
    if (!isDefinitiveMiss(err)) return true
    return false
  }
}
