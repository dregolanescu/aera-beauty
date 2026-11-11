// Teste pentru webhook-ul Resend: izolarea pe domeniul expeditorului.
//
// Rulează cu `npm test` (runner-ul integrat din Node, fără dependențe noi).
// Evenimentele sunt semnate sintetic, cu un secret generat aici, exact cum le
// semnează Resend (Svix). Nicio cerere nu iese din proces: `fetch` e înlocuit,
// deci niciun email real nu este trimis.

import assert from 'node:assert/strict'
import { createHmac, randomBytes } from 'node:crypto'
import { afterEach, beforeEach, describe, test } from 'node:test'

const SECRET = `whsec_${randomBytes(24).toString('base64')}`
process.env.RESEND_WEBHOOK_SECRET = SECRET
process.env.RESEND_API_KEY = 're_test_not_a_real_key'

const { POST } = await import('../app/api/webhooks/resend/route.ts')

/** Tot ce ar putea fi un efect secundar: cereri de rețea și linii de jurnal. */
let fetchCalls
let logLines
const original = {
  fetch: globalThis.fetch,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
}

beforeEach(() => {
  fetchCalls = []
  logLines = []
  globalThis.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : (input.url ?? String(input))
    const body = init?.body ?? (typeof input === 'object' && 'text' in input ? await input.clone().text() : null)
    fetchCalls.push({ url, body: typeof body === 'string' ? body : null })
    return new Response(JSON.stringify({ id: 'synthetic-email-id' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
  for (const level of ['log', 'info', 'warn', 'error']) {
    console[level] = (...args) => logLines.push(args.map(String).join(' '))
  }
})

afterEach(() => {
  globalThis.fetch = original.fetch
  console.log = original.log
  console.info = original.info
  console.warn = original.warn
  console.error = original.error
})

function sign(payload, { secret = SECRET, id = 'msg_synthetic', timestamp } = {}) {
  const ts = String(timestamp ?? Math.floor(Date.now() / 1000))
  const key = Buffer.from(secret.slice('whsec_'.length), 'base64')
  const signature = createHmac('sha256', key).update(`${id}.${ts}.${payload}`).digest('base64')
  return { 'svix-id': id, 'svix-timestamp': ts, 'svix-signature': `v1,${signature}` }
}

function signedRequest(event, signOptions) {
  const payload = typeof event === 'string' ? event : JSON.stringify(event)
  return new Request('https://aerabeauty.ro/api/webhooks/resend', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...sign(payload, signOptions) },
    body: payload,
  })
}

const VISITOR = 'vizitator.sintetic@example.com'

function bounce(from, overrides = {}) {
  const data = {
    email_id: '00000000-0000-4000-8000-000000000001',
    to: [VISITOR],
    subject: 'Subiect sintetic',
    bounce: { type: 'Permanent', message: 'Adresă inexistentă' },
    ...overrides,
  }
  if (from !== undefined) data.from = from
  return { type: 'email.bounced', created_at: '2026-11-11T19:00:00.000Z', data }
}

function assertNoSideEffects() {
  assert.deepEqual(fetchCalls, [], 'nicio cerere de rețea (deci nicio alertă)')
  assert.deepEqual(logLines, [], 'nicio linie de jurnal')
}

describe('evenimente legitime AERA: comportamentul existent se păstrează', () => {
  test('bounce de la «AERA Beauty <noreply@aerabeauty.ro>» → jurnal fără adresă + alertă către office@', async () => {
    const res = await POST(signedRequest(bounce('AERA Beauty <noreply@aerabeauty.ro>')))
    assert.equal(res.status, 200)
    assert.equal(await res.text(), 'ok')

    assert.equal(logLines.length, 1)
    assert.match(logLines[0], /email\.bounced/)
    assert.match(logLines[0], /email_id=00000000-0000-4000-8000-000000000001/)
    assert.match(logLines[0], /domeniu=example\.com/)
    assert.ok(!logLines[0].includes(VISITOR), 'jurnalul nu conține adresa completă')

    assert.equal(fetchCalls.length, 1)
    assert.match(fetchCalls[0].url, /^https:\/\/api\.resend\.com\/emails/)
    const sent = JSON.parse(fetchCalls[0].body)
    assert.equal(sent.from, 'AERA Beauty <noreply@aerabeauty.ro>')
    assert.deepEqual([sent.to].flat(), ['office@aerabeauty.ro'])
    assert.equal(sent.subject, `Atenție: email către ${VISITOR} a dat bounce`)
    assert.match(sent.text, /Motiv: Adresă inexistentă/)
    assert.match(sent.text, /Subiect: Subiect sintetic/)
  })

  test('plângere de la o adresă simplă, cu domeniul scris cu majuscule → alertă', async () => {
    const event = { ...bounce('noreply@AeraBeauty.RO'), type: 'email.complained' }
    const res = await POST(signedRequest(event))
    assert.equal(res.status, 200)
    assert.equal(fetchCalls.length, 1)
    assert.equal(JSON.parse(fetchCalls[0].body).subject, `Atenție: email către ${VISITOR} a dat plângere (spam)`)
  })

  test('bounce chiar pe office@aerabeauty.ro → jurnal, dar fără alertă (protecția la buclă rămâne)', async () => {
    const res = await POST(signedRequest(bounce('AERA Beauty <noreply@aerabeauty.ro>', { to: ['office@aerabeauty.ro'] })))
    assert.equal(res.status, 200)
    assert.equal(logLines.length, 1)
    assert.deepEqual(fetchCalls, [])
  })

  test('alt tip de eveniment AERA (email.delivered) → 200, fără efecte, ca înainte', async () => {
    const event = { ...bounce('AERA Beauty <noreply@aerabeauty.ro>'), type: 'email.delivered' }
    const res = await POST(signedRequest(event))
    assert.equal(res.status, 200)
    assertNoSideEffects()
  })
})

describe('evenimente ale altor produse din același cont Resend: 200 și niciun efect', () => {
  const foreign = [
    ['Radar', 'Radarul de Finanțări <rapoarte@radarfinantari.ro>'],
    ['Radar, adresă simplă', 'rapoarte@radarfinantari.ro'],
    ['Advanguard', 'Advanguard <office@advanguard.ro>'],
  ]
  for (const [name, from] of foreign) {
    for (const type of ['email.bounced', 'email.complained']) {
      test(`${name} · ${type}`, async () => {
        const res = await POST(signedRequest({ ...bounce(from), type }))
        assert.equal(res.status, 200)
        assert.equal(await res.text(), 'ok')
        assertNoSideEffects()
      })
    }
  }
})

describe('expeditor absent sau invalid: 200 și niciun efect', () => {
  const invalid = [
    ['lipsă', undefined],
    ['null', null],
    ['șir gol', ''],
    ['doar spații', '   '],
    ['număr', 42],
    ['listă', ['noreply@aerabeauty.ro']],
    ['obiect', { email: 'noreply@aerabeauty.ro' }],
    ['doar domeniul, fără adresă', 'aerabeauty.ro'],
    ['fără parte locală', '@aerabeauty.ro'],
    ['subdomeniu', 'noreply@mail.aerabeauty.ro'],
    ['domeniu care doar începe cu al nostru', 'noreply@aerabeauty.ro.example.com'],
    ['domeniu care doar se termină cu al nostru', 'noreply@falsaerabeauty.ro'],
    ['domeniul nostru doar în numele afișat', 'noreply@aerabeauty.ro <rapoarte@radarfinantari.ro>'],
    ['două adrese', 'noreply@aerabeauty.ro, rapoarte@radarfinantari.ro'],
    ['paranteze neînchise', 'AERA Beauty <noreply@aerabeauty.ro'],
    ['text după adresă', 'AERA Beauty <noreply@aerabeauty.ro> x'],
    ['două semne @', 'a@b@aerabeauty.ro'],
  ]
  for (const [name, from] of invalid) {
    test(name, async () => {
      const res = await POST(signedRequest(bounce(from)))
      assert.equal(res.status, 200)
      assertNoSideEffects()
    })
  }

  test('eveniment fără câmpul data', async () => {
    const res = await POST(signedRequest({ type: 'email.bounced' }))
    assert.equal(res.status, 200)
    assertNoSideEffects()
  })

  test('corp JSON valid, dar care nu e un obiect (null)', async () => {
    const res = await POST(signedRequest('null'))
    assert.equal(res.status, 200)
    assertNoSideEffects()
  })
})

describe('semnătura rămâne obligatorie, înaintea filtrului', () => {
  const aera = bounce('AERA Beauty <noreply@aerabeauty.ro>')

  test('semnat cu alt secret → 401, niciun efect', async () => {
    const other = `whsec_${randomBytes(24).toString('base64')}`
    const res = await POST(signedRequest(aera, { secret: other }))
    assert.equal(res.status, 401)
    assertNoSideEffects()
  })

  test('fără antetele de semnătură → 401, niciun efect', async () => {
    const res = await POST(new Request('https://aerabeauty.ro/api/webhooks/resend', {
      method: 'POST', body: JSON.stringify(aera),
    }))
    assert.equal(res.status, 401)
    assertNoSideEffects()
  })

  test('corp modificat după semnare → 401, niciun efect', async () => {
    const payload = JSON.stringify(aera)
    const res = await POST(new Request('https://aerabeauty.ro/api/webhooks/resend', {
      method: 'POST',
      headers: sign(payload),
      body: payload.replace(VISITOR, 'altcineva@example.com'),
    }))
    assert.equal(res.status, 401)
    assertNoSideEffects()
  })

  test('semnătură mai veche de 5 minute → 401, niciun efect', async () => {
    const res = await POST(signedRequest(aera, { timestamp: Math.floor(Date.now() / 1000) - 301 }))
    assert.equal(res.status, 401)
    assertNoSideEffects()
  })

  test('eveniment Radar nesemnat corect → 401, nu 200', async () => {
    const other = `whsec_${randomBytes(24).toString('base64')}`
    const res = await POST(signedRequest(bounce('rapoarte@radarfinantari.ro'), { secret: other }))
    assert.equal(res.status, 401)
    assertNoSideEffects()
  })
})
