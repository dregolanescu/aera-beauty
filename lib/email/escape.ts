/**
 * Tot ce vine din formulare trece pe aici înainte să intre în HTML-ul emailurilor
 * sau în subiect. Fără asta, un vizitator putea injecta linkuri sau markup în
 * emailurile trimise de pe aerabeauty.ro (inclusiv în confirmarea care pleacă
 * spre adresa introdusă de el).
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Text sigur pentru conținut HTML și pentru atribute între ghilimele. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch])
}

/** Pentru href="tel:…": păstrează doar cifrele și „+". */
export function telHref(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

/**
 * Caractere de control (inclusiv rânduri noi) și caractere invizibile de
 * direcție a textului (bidi), folosite pentru a falsifica felul în care apare
 * un text.
 */
const CONTROL_AND_BIDI = /[\u0000-\u001F\u007F-\u009F​-‏‪-‮⁦-⁩﻿]/g

/** Text pe un singur rând, pentru antetul Subject. */
export function headerText(value: string): string {
  return value.replace(CONTROL_AND_BIDI, ' ').replace(/\s+/g, ' ').trim()
}

/**
 * Prenumele folosit în salutul emailului de confirmare. Confirmarea pleacă spre
 * adresa introdusă în formular, deci acolo nu ajunge nimic ce nu arată a nume:
 * doar litere (cu diacritice), cratimă și apostrof. Altfel salutul rămâne fără
 * nume, iar emailul nu poate transporta un link sau un text inventat de altcineva.
 */
export function greetingFirstName(fullName: string): string {
  const first = headerText(fullName).split(' ')[0] ?? ''
  return /^\p{L}[\p{L}\p{M}'’-]{0,39}$/u.test(first) ? first : ''
}
