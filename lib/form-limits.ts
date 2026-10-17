/**
 * Lungimi maxime pentru câmpurile formularelor. Aceleași valori stau pe input-uri
 * (maxLength, ca vizitatorul să nu poată depăși limita) și în validarea de pe
 * server (Zod, pentru cereri trimise pe lângă formular).
 */
export const FIELD_LIMITS = {
  name: 100,
  /** Lungimea maximă a unei adrese de email (RFC 5321). */
  email: 254,
  phone: 30,
  city: 80,
  product: 200,
  profileOther: 100,
} as const

/** Opțiunile bifabile din formularul B2B (valori scurte, din configurare). */
export const CHOICE_LIMITS = {
  /** Lungimea unei valori de opțiune. */
  value: 50,
  /** Câte opțiuni pot fi bifate într-o secțiune (cea mai mare are 15). */
  count: 30,
} as const
