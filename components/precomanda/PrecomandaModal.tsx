'use client'

import { useEffect, useRef, useState, useCallback, type FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { submitPrecomanda, type PrecomandaResult } from '@/app/actions/precomanda'
import { suggestEmail } from '@/lib/email-typo'

type Prefill = {
  brand?: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  product?: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  prefill?: Prefill
}

const brandOptions = [
  { value: '', label: 'Alege un brand' },
  { value: 'aqua-mineral', label: 'Aqua Mineral' },
  { value: 'oliere-paris', label: 'Oliere Paris' },
  { value: 'redefine-matcha', label: 'Redefine Matcha' },
  { value: 'toate', label: 'Toate' },
]

export function PrecomandaModal({ isOpen, onClose, prefill }: Props) {
  const shouldReduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [messageLen, setMessageLen] = useState(0)

  // Form field state for disabled logic
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [brand, setBrand] = useState(prefill?.brand ?? '')
  const [gdpr, setGdpr] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [emailSuggestion, setEmailSuggestion] = useState('')

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setStatus('idle')
      setFieldErrors({})
      setServerError('')
      setMessageLen(0)
      setName('')
      setEmail('')
      setBrand(prefill?.brand ?? '')
      setGdpr(false)
      setSentEmail('')
      setEmailSuggestion('')
    }
  }, [isOpen, prefill])

  // Save trigger element before opening
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement
      requestAnimationFrame(() => closeRef.current?.focus())
      document.body.style.overflow = 'hidden'

      const main = document.getElementById('main-content')
      const header = document.querySelector('header')
      if (main) main.setAttribute('inert', '')
      if (header) header.setAttribute('inert', '')

      return () => {
        document.body.style.overflow = ''
        if (main) main.removeAttribute('inert')
        if (header) header.removeAttribute('inert')
      }
    }
  }, [isOpen])

  // Return focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const canSubmit = name.trim().split(/\s+/).length >= 2 && email.includes('@') && brand !== '' && gdpr

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})
    setServerError('')
    setStatus('submitting')

    const fd = new FormData(e.currentTarget)
    const result: PrecomandaResult = await submitPrecomanda(fd)

    if (result.ok) {
      setSentEmail(email)
      setStatus('success')
    } else {
      setStatus('error')
      setServerError(result.error)
      if ('fieldErrors' in result && result.fieldErrors) {
        setFieldErrors(result.fieldErrors)
      }
    }
  }

  const slideIn = shouldReduce ? { opacity: 0 } : { y: 40, opacity: 0 }
  const slideVisible = shouldReduce ? { opacity: 1 } : { y: 0, opacity: 1 }

  const inputClass =
    'w-full bg-white border-[0.5px] border-stone-200 rounded-[4px] px-4 py-3.5 text-cocoa-700 text-[16px] leading-normal placeholder:text-taupe-500/60 transition-colors focus:border-cocoa-700 focus:outline-none'
  const labelClass = 'eyebrow mb-1.5 block'
  const errorClass = 'text-[13px] mt-1 text-[#A32D2D]'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-cocoa-900/40 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="precomanda-title"
              className="pointer-events-auto bg-ivory-50 rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-6 md:p-10"
              initial={slideIn}
              animate={slideVisible}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduce ? 0.15 : 0.32,
                ease: shouldReduce ? 'easeOut' : [0.16, 1, 0.3, 1],
              }}
              onKeyDown={handleKeyDown}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="eyebrow mb-2">Precomandă</p>
                  <h2
                    id="precomanda-title"
                    className="font-display text-cocoa-900 italic"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', lineHeight: 1.2 }}
                  >
                    Spune-ne ce produs te interesează, iar noi revenim cu detalii și disponibilitate.
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Închide fereastra"
                  className="flex-shrink-0 ml-4 flex items-center justify-center w-10 h-10 text-taupe-500 hover:text-cocoa-700 transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Content: form or success */}
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.32 }}
                    className="py-8 text-center"
                  >
                    <p className="body-large text-cocoa-700 mb-4">
                      Mulțumim. Am primit cererea ta și revenim în maximum 48 de ore lucrătoare.
                    </p>
                    {sentEmail && (
                      <p className="text-[14px] text-cocoa-700 mb-4 max-w-md mx-auto">
                        Ți-am trimis o confirmare pe email la{' '}
                        <span className="font-medium text-cocoa-900">{sentEmail}</span>. Dacă nu o vezi, verifică și folderul spam. Dacă adresa nu e corectă, scrie-ne la{' '}
                        <a
                          href="mailto:office@aerabeauty.ro"
                          className="underline underline-offset-2 hover:text-cocoa-900"
                        >
                          office@aerabeauty.ro
                        </a>
                        .
                      </p>
                    )}
                    <Link
                      href="/produse"
                      onClick={onClose}
                      className="text-cocoa-700 font-medium tracking-wide hover:text-cocoa-900 transition-colors border-b border-cocoa-700/30 hover:border-cocoa-900 pb-0.5"
                    >
                      Vezi colecțiile &rarr;
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Honeypot — câmp invizibil pentru utilizatori, vizibil pentru boți.
                        Dacă vine completat → server-action returnează silent success fără
                        să trimită email sau să salveze în DB. */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      defaultValue=""
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        width: '1px',
                        height: '1px',
                        opacity: 0,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Nume */}
                    <div>
                      <label htmlFor="pc-name" className={labelClass}>
                        Nume și prenume *
                      </label>
                      <input
                        id="pc-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Maria Popescu"
                        className={inputClass}
                        style={fieldErrors.name ? { borderColor: '#A32D2D' } : undefined}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="pc-email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        id="pc-email"
                        name="email"
                        type="email"
                        required
                        placeholder="maria@exemplu.ro"
                        className={inputClass}
                        style={fieldErrors.email ? { borderColor: '#A32D2D' } : undefined}
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailSuggestion('') }}
                        onBlur={() => setEmailSuggestion(suggestEmail(email) ?? '')}
                      />
                      {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
                      {emailSuggestion && (
                        <p className="text-[13px] text-cocoa-700 mt-1">
                          Ai vrut să spui{' '}
                          <button
                            type="button"
                            onClick={() => { setEmail(emailSuggestion); setEmailSuggestion('') }}
                            className="font-medium underline underline-offset-2 hover:text-cocoa-900"
                          >
                            {emailSuggestion}
                          </button>
                          ?
                        </p>
                      )}
                    </div>

                    {/* Telefon + Oraș (row) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="pc-phone" className={labelClass}>
                          Telefon
                        </label>
                        <input
                          id="pc-phone"
                          name="phone"
                          type="tel"
                          placeholder="+40 7__ ___ ___"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="pc-city" className={labelClass}>
                          Oraș
                        </label>
                        <input
                          id="pc-city"
                          name="city"
                          type="text"
                          placeholder="București"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Brand */}
                    <div>
                      <label htmlFor="pc-brand" className={labelClass}>
                        Brand de interes *
                      </label>
                      <select
                        id="pc-brand"
                        name="brand"
                        required
                        className={inputClass}
                        style={fieldErrors.brand ? { borderColor: '#A32D2D' } : undefined}
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        {brandOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.brand && <p className={errorClass}>{fieldErrors.brand}</p>}
                    </div>

                    {/* Produs */}
                    <div>
                      <label htmlFor="pc-product" className={labelClass}>
                        Produs sau gamă
                      </label>
                      <input
                        id="pc-product"
                        name="product"
                        type="text"
                        placeholder="Youth Essence Serum"
                        className={inputClass}
                        defaultValue={prefill?.product ?? ''}
                      />
                    </div>

                    {/* Mesaj */}
                    <div>
                      <label htmlFor="pc-message" className={labelClass}>
                        Mesaj
                      </label>
                      <textarea
                        id="pc-message"
                        name="message"
                        rows={3}
                        maxLength={500}
                        placeholder="Spune-ne ce te interesează: produs, cantitate, întrebări."
                        className={inputClass}
                        style={{ resize: 'vertical', minHeight: '80px' }}
                        onChange={(e) => setMessageLen(e.target.value.length)}
                      />
                      <p className="text-[12px] text-taupe-500 mt-1 text-right">
                        {messageLen}/500
                      </p>
                    </div>

                    {/* GDPR checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        id="pc-gdpr"
                        name="gdprConsent"
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 accent-cocoa-700"
                        checked={gdpr}
                        onChange={(e) => setGdpr(e.target.checked)}
                      />
                      <label htmlFor="pc-gdpr" className="text-[14px] leading-snug text-cocoa-700">
                        Sunt de acord cu prelucrarea datelor mele personale conform{' '}
                        <Link
                          href="/politica-confidentialitate"
                          className="underline underline-offset-2 hover:text-cocoa-900"
                          target="_blank"
                        >
                          Politicii de confidențialitate
                        </Link>
                        , pentru a fi contactat(ă) în legătură cu cererea mea.
                      </label>
                    </div>
                    {fieldErrors.gdprConsent && (
                      <p className={errorClass}>{fieldErrors.gdprConsent}</p>
                    )}

                    {/* Marketing checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        id="pc-marketing"
                        name="marketingOptIn"
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 accent-cocoa-700"
                      />
                      <label htmlFor="pc-marketing" className="text-[14px] leading-snug text-taupe-500">
                        Vreau să primesc, ocazional, recomandări și noutăți AERA Beauty pe email. Mă pot dezabona oricând.
                      </label>
                    </div>

                    {/* Server error */}
                    {status === 'error' && serverError && (
                      <p className="text-[14px] text-[#A32D2D] bg-[#A32D2D]/5 rounded-md px-4 py-3">
                        {serverError}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!canSubmit || status === 'submitting'}
                      className="aera-cta-wrap w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      <span className="aera-cta-halo" aria-hidden="true" />
                      <span
                        className="aera-cta-face w-full"
                        style={{
                          fontSize: '0.78rem',
                          letterSpacing: '0.10em',
                          padding: '14px 32px',
                          minHeight: '46px',
                        }}
                      >
                        {status === 'submitting' ? 'Se trimite...' : 'Trimite cererea'}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
