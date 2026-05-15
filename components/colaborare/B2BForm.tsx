'use client'

import { useState, type FormEvent } from 'react'
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
const ROW_FULL = 'grid grid-cols-1 gap-4 mb-4'

const labelClass = 'block eyebrow mb-2'
const inputClass =
  'w-full px-4 py-3 bg-ivory-50 border border-stone-200 rounded-md text-cocoa-700 placeholder:text-taupe-500/70 focus:outline-none focus:border-cocoa-700 transition-colors text-base'

const optionCardBase =
  'flex items-start gap-3 px-4 py-3 border rounded-md cursor-pointer transition-all text-sm bg-ivory-50'
const optionCardIdle = 'border-stone-200 text-cocoa-700 hover:border-cocoa-700/40'
const optionCardActive = 'border-cocoa-700 bg-cocoa-700/[0.03] text-cocoa-900'

const errorClass = 'text-xs text-red-700 mt-1'

export function B2BForm({ brand }: Props) {
  const cfg: BrandColaborareConfig = colaborareConfigs[brand]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  )
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [messageLen, setMessageLen] = useState(0)

  // State pentru disable logic
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
      // Reset campuri afișate
      setName('')
      setEmail('')
      setProfile('')
      setFollowUp('')
      setGdpr(false)
      setMessageLen(0)
    } else {
      setStatus('error')
      setFieldErrors(result.fieldErrors ?? {})
      setServerError(result.error)
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="brand" value={brand} />

      <p className="body text-cocoa-700 mb-10 max-w-2xl">{cfg.taglineForm}</p>

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
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Ex: Ana Popescu"
            />
            {fieldErrors.name && <p className={errorClass}>{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor={`${brand}-email`} className={labelClass}>Email *</label>
            <input
              id={`${brand}-email`}
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="nume@exemplu.ro"
            />
            {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
          </div>
        </div>
        <div className={ROW}>
          <div>
            <label htmlFor={`${brand}-phone`} className={labelClass}>Telefon</label>
            <input
              id={`${brand}-phone`}
              name="phone"
              type="tel"
              className={inputClass}
              placeholder="+40 7XX XXX XXX"
            />
          </div>
          <div>
            <label htmlFor={`${brand}-city`} className={labelClass}>Oraș</label>
            <input
              id={`${brand}-city`}
              name="city"
              type="text"
              className={inputClass}
              placeholder="București, Cluj, etc."
            />
          </div>
        </div>
      </section>

      {/* 2. Profil — radio */}
      <section className="mb-10">
        <h3 className="card-title mb-5">2. {cfg.profileLabel} *</h3>
        <div className="grid sm:grid-cols-2 gap-3">
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
                onChange={() => setProfile(opt.value)}
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
              className={inputClass}
            />
          </div>
        )}
        {fieldErrors.profile && <p className={errorClass}>{fieldErrors.profile}</p>}
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
          className={inputClass}
          placeholder="Ai un detaliu specific de adăugat?"
        />
        <p className="text-xs text-taupe-500 mt-1 text-right">{messageLen}/500</p>
      </section>

      {/* 7. Follow-up preferat */}
      <section className="mb-10">
        <h3 className="card-title mb-5">7. Cum preferi să te contactăm? *</h3>
        <div className="grid sm:grid-cols-3 gap-3">
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
                onChange={() => setFollowUp(opt.value)}
                className="mt-0.5 accent-cocoa-700"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 8. GDPR + marketing */}
      <section className="mb-10 space-y-4">
        <label className="flex items-start gap-3 text-sm text-cocoa-700 cursor-pointer">
          <input
            type="checkbox"
            name="gdprConsent"
            value="on"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
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
        {fieldErrors.gdprConsent && <p className={errorClass}>{fieldErrors.gdprConsent}</p>}

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

      {/* Error general */}
      {serverError && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="aera-cta-wrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
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
    </form>
  )
}
