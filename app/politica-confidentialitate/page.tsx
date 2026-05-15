import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Politica de confidențialitate — AERA Beauty',
  description:
    'Cum colectăm, folosim și protejăm datele tale personale pe aerabeauty.ro, conform Regulamentului General privind Protecția Datelor (GDPR).',
}

export default function PoliticaConfidentialitatePage() {
  return (
    <LegalPage
      eyebrow="Confidențialitate & GDPR"
      title="Politica de confidențialitate"
      lastUpdated="15 mai 2026"
    >
      <p>
        Confidențialitatea ta contează. Această politică descrie cum colectăm,
        folosim și protejăm datele tale personale când interacționezi cu
        aerabeauty.ro, conform Regulamentului (UE) 2016/679 (
        <strong>GDPR</strong>) și a Legii nr. 190/2018.
      </p>

      <h2>1. Cine suntem</h2>
      <p>
        Operatorul de date este <strong>SC AERA SCENTT SRL</strong>, persoană
        juridică română, importator unic în România al brandurilor Aqua
        Mineral, Oliere Paris și Redefine Matcha.
      </p>
      <ul>
        <li>Sediu: Str. Panait Cerna nr. 7, bl. M44, sc. 3, et. 7, ap. 93, Sector 3, București</li>
        <li>CUI: RO 54486857</li>
        <li>Reg. Com.: J2026024816005</li>
        <li>Email pentru cereri GDPR: <a href="mailto:gdpr@aerabeauty.ro">gdpr@aerabeauty.ro</a></li>
        <li>Email general: <a href="mailto:office@aerabeauty.ro">office@aerabeauty.ro</a></li>
      </ul>

      <h2>2. Ce date colectăm</h2>
      <p>Colectăm doar datele necesare pentru a-ți răspunde și a-ți oferi informații despre produsele noastre.</p>

      <h3>2.1 Date pe care le furnizezi direct</h3>
      <ul>
        <li><strong>Date de identificare</strong>: nume și prenume</li>
        <li><strong>Date de contact</strong>: adresă de email, număr de telefon (opțional), oraș (opțional)</li>
        <li><strong>Date despre interes</strong>: brand sau gamă vizată, produs specific, mesaj liber</li>
        <li><strong>Consimțăminte</strong>: acceptarea politicii de confidențialitate (obligatoriu pentru a trimite formularul), consimțământ marketing (opțional)</li>
      </ul>

      <h3>2.2 Date colectate automat (audit GDPR)</h3>
      <ul>
        <li><strong>Adresa IP</strong>, stocată exclusiv sub formă de hash criptografic (SHA-256 cu salt) — nu poate fi reversată la adresa originală</li>
        <li><strong>User agent</strong> (tipul de browser și sistem de operare)</li>
        <li><strong>Marcaj temporal</strong> (data și ora trimiterii formularului)</li>
        <li><strong>Versiunea textului de consimțământ</strong> acceptat</li>
      </ul>
      <p className="small-note">
        Aceste informații tehnice ne ajută să demonstrăm că ți-am respectat
        consimțământul în mod corect, dacă ar fi vreodată contestat.
      </p>

      <h2>3. Scopurile prelucrării și bazele legale</h2>

      <h3>3.1 Răspuns la cererea ta de precomandă sau colaborare</h3>
      <p>
        Prelucrăm datele tale pentru a-ți răspunde și a-ți oferi informații
        despre produsele și brandurile noastre.
      </p>
      <ul>
        <li><strong>Bază legală:</strong> măsuri pre-contractuale la cererea ta (art. 6(1)(b) GDPR)</li>
      </ul>

      <h3>3.2 Comunicări de marketing direct</h3>
      <p>
        Doar dacă ți-ai dat consimțământul separat și expres prin bifarea
        casetei dedicate, îți putem trimite ocazional informații despre lansări
        de produse, oferte și noutăți AERA Beauty.
      </p>
      <ul>
        <li><strong>Bază legală:</strong> consimțământul tău (art. 6(1)(a) GDPR)</li>
        <li>
          Te poți dezabona oricând printr-un singur click pe linkul de
          dezabonare din fiecare email sau scriindu-ne la{' '}
          <a href="mailto:gdpr@aerabeauty.ro">gdpr@aerabeauty.ro</a>
        </li>
      </ul>

      <h3>3.3 Conformitate legală și audit</h3>
      <p>
        Stocăm dovezi privind consimțămintele acordate, pentru a putea
        demonstra conformitatea în caz de control sau cerere.
      </p>
      <ul>
        <li><strong>Bază legală:</strong> obligație legală (art. 6(1)(c) GDPR)</li>
      </ul>

      <h2>4. Cui dezvăluim datele</h2>
      <p>
        Nu vindem și nu împărtășim datele tale cu terți pentru scopuri
        comerciale. Pentru a putea funcționa, ne bazăm însă pe câțiva
        subprocesatori de încredere:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> (Supabase Inc., SUA cu transfer prin clauze
          contractuale standard) — stocarea sigură a datelor formularelor, cu
          acces server-side restricționat.
        </li>
        <li>
          <strong>Resend</strong> (Resend Inc., SUA cu clauze contractuale
          standard) — trimiterea emailurilor de notificare și confirmare.
        </li>
        <li>
          <strong>Vercel</strong> (Vercel Inc., SUA cu clauze contractuale
          standard) — hostingul site-ului.
        </li>
      </ul>
      <p>
        Toți subprocesatorii au obligații contractuale de confidențialitate și
        securitate echivalente cu standardele GDPR.
      </p>
      <p>
        Putem dezvălui datele și autorităților publice când suntem obligați
        prin lege (de exemplu, în cazul unei cereri oficiale a unei autorități
        competente).
      </p>

      <h2>5. Cât timp păstrăm datele</h2>
      <ul>
        <li>
          <strong>Date din formularul de precomandă</strong>: până la 24 de
          luni de la primirea cererii (pentru a putea relua contactul cu tine
          când produsele devin disponibile)
        </li>
        <li>
          <strong>Date cu consimțământ marketing</strong>: până la retragerea
          consimțământului (decizia ta) sau până la 36 de luni de
          inactivitate, oricare survine prima
        </li>
        <li>
          <strong>Audit log GDPR (IP hash, user agent, timestamp)</strong>: 36
          de luni, pentru a demonstra conformitatea
        </li>
      </ul>
      <p>
        După aceste termene, datele sunt șterse permanent sau anonimizate
        ireversibil.
      </p>

      <h2>6. Drepturile tale (GDPR)</h2>
      <p>Conform Regulamentului, ai următoarele drepturi:</p>
      <ul>
        <li><strong>Drept de acces</strong> — să afli ce date avem despre tine</li>
        <li><strong>Drept de rectificare</strong> — să corectezi datele inexacte sau incomplete</li>
        <li><strong>Drept la ștergere</strong> („dreptul de a fi uitat") — să ne ceri să-ți ștergem datele</li>
        <li><strong>Drept la restricționarea prelucrării</strong> — să oprești temporar prelucrarea în anumite condiții</li>
        <li><strong>Drept la portabilitate</strong> — să primești datele într-un format structurat, transferabil</li>
        <li><strong>Drept de opoziție</strong> — să te opui prelucrării bazate pe interes legitim sau marketing</li>
        <li><strong>Drept de retragere a consimțământului</strong> — oricând, fără să afecteze valabilitatea prelucrării anterioare</li>
        <li>
          <strong>Drept de a depune o plângere</strong> la Autoritatea Națională
          de Supraveghere a Prelucrării Datelor cu Caracter Personal (
          <a
            href="https://www.dataprotection.ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            ANSPDCP
          </a>
          )
        </li>
      </ul>
      <p>
        Pentru a-ți exercita oricare dintre aceste drepturi, scrie-ne la{' '}
        <a href="mailto:gdpr@aerabeauty.ro">gdpr@aerabeauty.ro</a>. Răspundem
        în maximum 30 de zile calendaristice.
      </p>

      <h2>7. Securitate</h2>
      <p>
        Aplicăm măsuri tehnice și organizatorice rezonabile pentru a-ți
        proteja datele:
      </p>
      <ul>
        <li>Conexiune criptată HTTPS pe întregul site</li>
        <li>Stocare în baze de date cu acces restricționat și politici de tip Row-Level Security</li>
        <li>Hashing criptografic al adreselor IP (nu stocăm IP-ul brut)</li>
        <li>Trimiterea emailurilor prin furnizori autentificați cu DKIM, SPF și DMARC</li>
        <li>Acces intern limitat doar la persoanele care au nevoie pentru a-ți răspunde</li>
      </ul>

      <h2>8. Transferuri internaționale</h2>
      <p>
        Unii dintre subprocesatorii noștri au sediul în Statele Unite. În
        aceste cazuri, transferurile sunt protejate prin Clauzele Contractuale
        Standard aprobate de Comisia Europeană, ca garanție suplimentară a
        unui nivel de protecție echivalent celui din UE.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Folosim cookies strict necesare pentru funcționarea site-ului. Pentru
        detalii complete, consultă{' '}
        <a href="/cookies">Politica de cookies</a>.
      </p>

      <h2>10. Modificări ale politicii</h2>
      <p>
        Putem actualiza această politică pe măsură ce serviciile noastre
        evoluează (de exemplu, la lansarea magazinului online). Versiunea
        curentă este întotdeauna disponibilă pe aerabeauty.ro/politica-confidentialitate,
        iar data ultimei actualizări apare în partea de sus a paginii.
      </p>
      <p>
        În cazul unor modificări substanțiale, te vom notifica prin email
        (dacă ne-ai dat consimțământ marketing) sau printr-un banner
        proeminent pe site.
      </p>

      <hr />

      <p className="small-note">
        Textul prezent este în formă curentă pentru lansarea v1 a site-ului
        de prezentare. Vom adăuga clauze suplimentare la lansarea magazinului
        online (procesare comenzi, plăți, livrare). Pentru orice incertitudine
        sau cerere specifică, te invităm să ne scrii la{' '}
        <a href="mailto:gdpr@aerabeauty.ro">gdpr@aerabeauty.ro</a>.
      </p>
    </LegalPage>
  )
}
