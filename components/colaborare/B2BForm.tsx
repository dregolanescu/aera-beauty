'use client'

import { useState, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import {
  colaborareConfigs,
  followUpOptions,
  type BrandColaborareConfig,
} from '@/content/colaborare-forms'
import { submitColaborare } from '@/app/actions/colaborare'

type Props = {
  brand: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
}

const ROW = 'grid sm:grid-cols-2 gap-4 mb-4'

const labelClass = 'block eyebrow mb-2'
const baseInput =
  'w-full px-4 py-3 bg-ivory-50 border rounded-md text-cocoa-700 placeholder:text-taupe-500/70 focus:outline-none transition-colors text-base'
const inputIdle = 'border-stone-200 focus:border-cocoa-700'
const inputError = 'border-red-400 focus:border-red-500 bg-red-50/30'

const optionCardBase =
  'flex items-start gap-3 px-4 py-3 border rounded-md cursor-pointer transition-all text-sm bg-ivory-50'
const optionCardIdle = 'border-stone-200 text-cocoa-700 hover:border-cocoa-700/40'
const optionCardActive = 'border-cocoa-700 bg-cocoa-700/[0.03] text-cocoa-900'

const errorClass = 'text-xs text-red-700 mt-2 flex items-center gap-1.5'
const errorRingClass = 'rounded-md ring-2 ring-red-300 ring-offset-2 ring-offset-ivory-50 p-1 -m-1'

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p className={errorClass}>
      <span aria-hidden="true">⚠</span>
      {children}
    </p>
  )
}

export function B2BForm({ brand }: Props) {
  const cfg: BrandColaborareConfig = colaborareConfigs[brand]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  )
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [messageLen, setMessageLen] = useState(0)

  const formRef = useRef<HTMLFormElement>(null)

  // State pentru disable + validare client-side ușoară
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [gdpr, setGdpr] = useState(false)

  const canSubmit =
    name.trim().length >= 3 &&
    email.includes('@') &&
    profile !== '' &&
    followUp !== '' &&
    gdpr &&
    status !== 'submitting'

  function inputCls(field: string) {
    return `${baseInput} ${fieldErrors[field] ? inputError : inputIdle}`
  }

  function clearFieldError(field: string) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function focusField(field: string) {
    if (!formRef.current) return
    const el = formRef.current.querySelector(
      `[name="${field}"], #${brand}-${field}`,
    ) as HTMLElement | null
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Focus pe input după scroll, fără să resetăm scroll
      setTimeout(() => {
        if (typeof el.focus === 'function') el.focus({ preventScroll: true })
      }, 350)
    }
  }

  // Lista câmpurilor obligatorii care încă nu sunt completate
  const missingFields: { key: string; label: string }[] = []
  if (name.trim().length < 3 || name.trim().split(/\s+/).length < 2)
    missingFields.push({ key: 'name', label: 'Nume și prenume' })
  if (!email.includes('@')) missingFields.push({ key: 'email', label: 'Email' })
  if (!profile) missingFields.push({ key: 'profile', label: cfg.profileLabel })
  if (!followUp) missingFields.push({ key: 'followUp', label: 'Mod de contact' })
  if (!gdpr) missingFields.push({ key: 'gdprConsent', label: 'Acord GDPR' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('submitting')
    setFieldErrors({})
    setServerError('')

    const fd = new FormData(e.currentTarget)
    const result = await submitColaborare(fd)

    if (result.ok) {
      setStatus('success')
      setName('')
      setEmail('')
      setProfile('')
      setFollowUp('')
      setGdpr(false)
      setMessageLen(0)
    } else {
      setStatus('error')
      const errs = result.fieldErrors ?? {}
      setFieldErrors(errs)
      setServerError(result.error)

      // Scroll smooth la primul câmp cu eroare
      const firstField = Object.keys(errs)[0]
      if (firstField) focusField(firstField)
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-ivory-50 border border-stone-200 rounded-lg p-8 md:p-10 text-center">
        <p className="eyebrow mb-3">Mulțumim</p>
        <h3 className="section-title mb-4" style={{ fontStyle: 'italic' }}>
          Am primit cererea ta.
        </h3>
        <p className="body text-cocoa-700 max-w-xl mx-auto">
          Revenim în maximum 48 de ore lucrătoare la adresa și prin canalul pe
          care le-ai indicat. Între timp, ți-am trimis și o confirmare pe email.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-cocoa-700 underline underline-offset-4 hover:text-cocoa-900"
        >
          Trimite un alt formular
        </button>
      </div>
    )
  }

  const hasErrors = Object.keys(fieldErrors).length > 0

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="brand" value={brand} />

      <p className="body text-cocoa-700 mb-10 max-w-2xl">{cfg.taglineForm}</p>

      {/* Banner sumar erori — apare doar dacă există fieldErrors */}
      {hasErrors && (
        <div
          role="alert"
          className="mb-8 px-5 py-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800 flex items-start gap-3"
        >
          <span aria-hidden="true" className="text-base leading-none mt-0.5">⚠</span>
          <span>
            <strong className="block mb-1">Te rugăm să verifici câmpurile evidențiate.</strong>
            {serverError && <span className="block opacity-80">{serverError}</span>}
          </span>
        </div>
      )}

      {/* 1. Date contact */}
      <section className="mb-10">
        <h3 className="card-title mb-5">1. Date de contact</h3>
        <div className={ROW}>
          <div>
            <label htmlFor={`${brand}-name`} className={labelClass}>Nume și prenume *</label>
            <input
              id={`${brand}-name`}
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
              className={inputCls('name')}
              placeholder="Ex: Ana Popescu"
              aria-invalid={!!fieldErrors.name}
            />
            {fieldErrors.name && <ErrorMsg>{fieldErrors.name}</ErrorMsg>}
          </div>
          <div>
            <label htmlFor={`${brand}-email`} className={labelClass}>Email *</label>
            <input
              id={`${brand}-email`}
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
              className={inputCls('email')}
              placeholder="nume@exemplu.ro"
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <ErrorMsg>{fieldErrors.email}</ErrorMsg>}
          </div>
        </div>
        <div className={ROW}>
          <div>
            <label htmlFor={`${brand}-phone`} className={labelClass}>Telefon</label>
            <input
              id={`${brand}-phone`}
              name="phone"
              type="tel"
              className={inputCls('phone')}
              placeholder="+40 7XX XXX XXX"
            />
          </div>
          <div>
            <label htmlFor={`${brand}-city`} className={labelClass}>Oraș</label>
            <input
              id={`${brand}-city`}
              name="city"
              type="text"
              className={inputCls('city')}
              placeholder="București, Cluj, etc."
            />
          </div>
        </div>
      </section>

      {/* 2. Profil — radio */}
      <section className="mb-10">
        <h3 className="card-title mb-5">2. {cfg.profileLabel} *</h3>
        <div
          className={`grid sm:grid-cols-2 gap-3 ${fieldErrors.profile ? errorRingClass : ''}`}
        >
          {cfg.profile.map((opt) => (
            <label
              key={opt.value}
              className={`${optionCardBase} ${profile === opt.value ? optionCardActive : optionCardIdle}`}
            >
              <input
                type="radio"
                name="profile"
                value={opt.value}
                checked={profile === opt.value}
                onChange={() => { setProfile(opt.value); clearFieldError('profile') }}
                className="mt-0.5 accent-cocoa-700"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {profile === 'altul' && (
          <div className="mt-4">
            <input
              type="text"
              name="profileOther"
              placeholder="Specifică profilul tău"
              className={inputCls('profileOther')}
            />
          </div>
        )}
        {fieldErrors.profile && <ErrorMsg>{fieldErrors.profile}</ErrorMsg>}
      </section>

      {/* 3. Interes — multi checkbox */}
      <section className="mb-10">
        <h3 className="card-title mb-5">3. Interes pentru {cfg.name}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {cfg.interest.map((opt) => (
            <label
              key={opt.value}
              className={`${optionCardBase} ${optionCardIdle} has-[:checked]:border-cocoa-700 has-[:checked]:bg-cocoa-700/[0.03] has-[:checked]:text-cocoa-900`}
            >
              <input
                type="checkbox"
                name="interest"
                value={opt.value}
                className="mt-0.5 accent-cocoa-700"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 4. Produse — multi pill */}
      <section className="mb-10">
        <h3 className="card-title mb-5">4. {cfg.productsLabel}</h3>
        <div className="flex flex-wrap gap-2">
          {cfg.products.map((opt) => (
            <label
              key={opt.value}
              className="inline-flex items-center px-4 py-2 bg-ivory-50 border border-stone-200 rounded-full text-sm text-cocoa-700 cursor-pointer transition-all hover:border-cocoa-700/40 has-[:checked]:bg-cocoa-700 has-[:checked]:text-ivory-50 has-[:checked]:border-cocoa-700"
            >
              <input
                type="checkbox"
                name="products"
                value={opt.value}
                className="sr-only"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 5. Beneficii / Tip colaborare — multi checkbox */}
      <section className="mb-10">
        <h3 className="card-title mb-5">5. {cfg.benefitsLabel}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {cfg.benefits.map((opt) => (
            <label
              key={opt.value}
              className={`${optionCardBase} ${optionCardIdle} has-[:checked]:border-cocoa-700 has-[:checked]:bg-cocoa-700/[0.03] has-[:checked]:text-cocoa-900`}
            >
              <input
                type="checkbox"
                name="benefits"
                value={opt.value}
                className="mt-0.5 accent-cocoa-700"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 6. Mesaj — opțional */}
      <section className="mb-10">
        <h3 className="card-title mb-5">6. Mesaj (opțional)</h3>
        <textarea
          name="message"
          rows={4}
          maxLength={500}
          onChange={(e) => setMessageLen(e.target.value.length)}
          className={inputCls('message')}
          placeholder="Ai un detaliu specific de adăugat?"
        />
        <p className="text-xs text-taupe-500 mt-1 text-right">{messageLen}/500</p>
        {fieldErrors.message && <ErrorMsg>{fieldErrors.message}</ErrorMsg>}
      </section>

      {/* 7. Follow-up preferat */}
      <section className="mb-10">
        <h3 className="card-title mb-5">7. Cum preferi să te contactăm? *</h3>
        <div
          className={`grid sm:grid-cols-3 gap-3 ${fieldErrors.followUp ? errorRingClass : ''}`}
        >
          {followUpOptions.map((opt) => (
            <label
              key={opt.value}
              className={`${optionCardBase} ${followUp === opt.value ? optionCardActive : optionCardIdle}`}
            >
              <input
                type="radio"
                name="followUp"
                value={opt.value}
                checked={followUp === opt.value}
                onChange={() => { setFollowUp(opt.value); clearFieldError('followUp') }}
                className="mt-0.5 accent-cocoa-700"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.followUp && <ErrorMsg>{fieldErrors.followUp}</ErrorMsg>}
      </section>

      {/* 8. GDPR + marketing */}
      <section className="mb-10 space-y-4">
        <label
          className={`flex items-start gap-3 text-sm text-cocoa-700 cursor-pointer ${fieldErrors.gdprConsent ? 'p-3 -m-3 rounded-md ring-2 ring-red-300' : ''}`}
        >
          <input
            type="checkbox"
            name="gdprConsent"
            value="on"
            checked={gdpr}
            onChange={(e) => { setGdpr(e.target.checked); clearFieldError('gdprConsent') }}
            required
            className="mt-1 accent-cocoa-700"
          />
          <span>
            Sunt de acord cu prelucrarea datelor mele personale conform{' '}
            <Link href="/politica-confidentialitate" target="_blank" className="underline underline-offset-2">
              Politicii de confidențialitate
            </Link>
            . *
          </span>
        </label>
        {fieldErrors.gdprConsent && <ErrorMsg>{fieldErrors.gdprConsent}</ErrorMsg>}

        <label className="flex items-start gap-3 text-sm text-cocoa-700 cursor-pointer">
          <input
            type="checkbox"
            name="marketingOptIn"
            value="on"
            className="mt-1 accent-cocoa-700"
          />
          <span>
            Vreau să primesc ocazional informații despre lansări, oferte și
            evenimente AERA Beauty (opțional, te poți dezabona oricând).
          </span>
        </label>
      </section>

      {/* Submit */}
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className="aera-cta-wrap self-start disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          <span className="aera-cta-halo" aria-hidden="true" />
          <span
            className="aera-cta-face"
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.10em',
              padding: '14px 32px',
              minHeight: '46px',
            }}
          >
            {status === 'submitting' ? 'Se trimite...' : `Trimite cererea — ${cfg.name}`}
          </span>
        </button>

        {/* Hint: ce mai trebuie completat ca să se activeze butonul */}
        {missingFields.length > 0 && status !== 'submitting' && (
          <div className="text-sm">
            <p className="text-taupe-500 mb-1.5 flex items-center gap-1.5">
              <span aria-hidden="true">⓵</span>
              Pentru a putea trimite, mai ai de completat:
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {missingFields.map((f, i) => (
                <li key={f.key} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => focusField(f.key)}
                    className="text-cocoa-700 underline underline-offset-2 hover:text-cocoa-900 font-medium"
                  >
                    {f.label}
                  </button>
                  {i < missingFields.length - 1 && (
                    <span aria-hidden="true" className="text-taupe-500">·</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  )
}
