/**
 * Constante Cloudflare Turnstile folosite și în browser, și pe server.
 * (Separat de lib/turnstile.ts, care rulează doar pe server.)
 */

/** Câmpul din FormData în care formularul trimite tokenul. */
export const TURNSTILE_FIELD = 'cf-turnstile-response'

/**
 * `action` legat de fiecare widget. Serverul verifică să coincidă, ca un token
 * obținut pe un formular să nu poată fi folosit pe celălalt.
 */
export const TURNSTILE_ACTIONS = {
  precomanda: 'precomanda',
  colaborare: 'colaborare',
} as const

export type TurnstileAction = (typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS]

/** Serverul a respins tokenul sau tokenul lipsește. */
export const TURNSTILE_ERROR_MESSAGE =
  'Verificarea de securitate nu a reușit. Încearcă din nou în câteva secunde sau scrie-ne la office@aerabeauty.ro.'

/** Cloudflare a afișat caseta de verificare, iar vizitatorul nu a bifat-o încă. */
export const TURNSTILE_INTERACTION_MESSAGE =
  'Bifează caseta de verificare de deasupra butonului, apoi trimite din nou.'
