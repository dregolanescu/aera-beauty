import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Politica de cookies — AERA Beauty',
  description:
    'Cum folosim cookies și tehnologii similare pe aerabeauty.ro. Ce înseamnă pentru tine și cum le poți gestiona.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Politica de cookies"
      lastUpdated="15 mai 2026"
    >
      <p>
        Pentru ca aerabeauty.ro să funcționeze corect și pentru a-ți oferi o
        experiență fluidă, folosim un număr mic de cookies. Această politică
        explică ce sunt, de ce le folosim și cum le poți gestiona.
      </p>

      <h2>1. Ce sunt cookies</h2>
      <p>
        Cookies sunt fișiere text mici stocate de browser pe dispozitivul tău
        atunci când vizitezi un site. Pot fi cookies de sesiune (se șterg
        când închizi browserul) sau persistente (rămân până la o dată
        prestabilită sau până le ștergi tu).
      </p>
      <p>
        Cookies nu pot rula programe pe dispozitivul tău și nu pot transmite
        viruși. Ele permit site-urilor să te „recunoască" pentru a oferi
        funcționalitate de bază (de exemplu, ținerea minte a preferințelor)
        sau pentru analize.
      </p>

      <h2>2. Ce cookies folosim noi</h2>
      <p>
        În forma curentă (v1, site de prezentare), folosim exclusiv{' '}
        <strong>cookies strict necesare</strong> pentru funcționarea
        site-ului. Nu folosim cookies de marketing, de profilare sau de
        publicitate.
      </p>

      <h3>2.1 Cookies strict necesare</h3>
      <p>
        Sunt esențiale pentru ca site-ul să funcționeze și pentru a-ți oferi
        serviciile de pe site (de exemplu, completarea formularelor în
        siguranță). Nu necesită consimțământ separat conform legislației
        europene.
      </p>
      <ul>
        <li>
          <strong>Vercel infrastructure cookies</strong> — folosite de
          platforma de hosting pentru a livra paginile site-ului în mod
          performant. Sunt automate, de scurtă durată și nu colectează
          informații personale.
        </li>
      </ul>

      <h3>2.2 Stocare locală pentru formulare</h3>
      <p>
        Formularele de pe site (precomandă, colaborare) pot folosi temporar
        memoria browserului tău pentru a păstra datele introduse în caz de
        reîncărcare accidentală a paginii. Aceste informații rămân exclusiv
        pe dispozitivul tău și nu sunt trimise nicăieri până când nu apeși
        explicit „Trimite".
      </p>

      <h2>3. Ce cookies NU folosim</h2>
      <p>
        Deocamdată, aerabeauty.ro <strong>nu folosește</strong> cookies pentru:
      </p>
      <ul>
        <li>Analize de trafic (Google Analytics, Meta Pixel, etc.)</li>
        <li>Publicitate sau retargeting</li>
        <li>Profilarea comportamentului tău de utilizator</li>
        <li>Conexiuni cu rețelele sociale</li>
      </ul>
      <p>
        Pentru viitor, ne propunem să folosim o soluție de analiză care
        respectă confidențialitatea (de exemplu, Plausible Analytics, care nu
        folosește cookies și nu colectează date personale). Dacă vom decide
        să adăugăm cookies non-necesare, vom afișa un banner de consimțământ
        explicit și vom actualiza această politică.
      </p>

      <h2>4. Cum gestionezi cookies</h2>
      <p>
        Poți controla și șterge cookies oricând din setările browserului tău.
        Iată cum, în cele mai populare browsere:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/ro/kb/blocheaza-cookie-uri-blocheaza-site-uri-stocheze-informatii"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/ro-ro/microsoft-edge/%C8%99terge%C8%9Bi-cookie-urile-din-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Reține că, dacă blochezi cookies strict necesare, este posibil ca
        anumite funcții ale site-ului (în special formularele) să nu mai
        funcționeze corect.
      </p>

      <h2>5. Confidențialitate și GDPR</h2>
      <p>
        Pentru detalii complete despre cum colectăm și folosim datele tale
        personale, inclusiv drepturile pe care le ai conform GDPR, consultă{' '}
        <a href="/politica-confidentialitate">
          Politica de confidențialitate
        </a>
        .
      </p>

      <h2>6. Modificări ale politicii</h2>
      <p>
        Vom actualiza această politică ori de câte ori adăugăm, modificăm sau
        eliminăm cookies. Versiunea curentă este disponibilă întotdeauna la
        aerabeauty.ro/cookies, iar data ultimei actualizări apare în partea
        de sus a paginii.
      </p>
      <p>
        În cazul unor modificări care implică cookies non-necesare, te vom
        anunța printr-un banner de consimțământ pe site, pentru a-ți permite
        să accepți sau să refuzi explicit.
      </p>

      <h2>7. Contact</h2>
      <p>
        Pentru orice întrebare despre folosirea cookies pe aerabeauty.ro, ne
        poți contacta la{' '}
        <a href="mailto:gdpr@aerabeauty.ro">gdpr@aerabeauty.ro</a> sau{' '}
        <a href="mailto:office@aerabeauty.ro">office@aerabeauty.ro</a>.
      </p>

      <hr />

      <p className="small-note">
        Această politică va fi extinsă dacă vom adopta soluții de analiză sau
        marketing care implică cookies suplimentare. Orice astfel de
        modificare va fi precedată de un banner de consimțământ explicit
        afișat la prima vizită.
      </p>
    </LegalPage>
  )
}
