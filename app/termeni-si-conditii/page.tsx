import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Termeni și condiții — AERA Beauty',
  description:
    'Termenii și condițiile de utilizare a site-ului aerabeauty.ro și a serviciilor oferite de SC AERA SCENTT SRL.',
}

export default function TermeniSiConditiiPage() {
  return (
    <LegalPage
      eyebrow="Termeni"
      title="Termeni și condiții"
      lastUpdated="15 mai 2026"
    >
      <p>
        Acești termeni reglementează utilizarea site-ului{' '}
        <strong>aerabeauty.ro</strong> și interacțiunea ta cu noi. Prin
        accesarea sau folosirea site-ului, accepți să respecți acești termeni.
        Dacă nu ești de acord cu vreuna dintre prevederi, te rugăm să nu
        folosești site-ul.
      </p>

      <h2>1. Cine suntem</h2>
      <p>
        Site-ul este operat de <strong>SC AERA SCENTT SRL</strong>, importator
        unic în România al brandurilor Aqua Mineral, Oliere Paris și Redefine
        Matcha.
      </p>
      <ul>
        <li>Sediu: Str. Panait Cerna nr. 7, bl. M44, sc. 3, et. 7, ap. 93, Sector 3, București</li>
        <li>CUI: RO 54486857</li>
        <li>Reg. Com.: J2026024816005</li>
        <li>Email: <a href="mailto:office@aerabeauty.ro">office@aerabeauty.ro</a></li>
        <li>Telefon: <a href="tel:+40747306107">+40 747 306 107</a></li>
      </ul>

      <h2>2. Obiectul site-ului</h2>
      <p>
        În forma sa curentă (v1), <strong>aerabeauty.ro</strong> este un site
        de prezentare: îți oferă informații despre branduri, game de produse
        și posibilitatea de a-ți exprima interesul printr-un formular de
        precomandă sau de colaborare B2B.
      </p>
      <p>
        Magazinul online (cu posibilitatea de comandă și plată online) va fi
        lansat ulterior. La momentul respectiv, termenii vor fi extinși pentru
        a reglementa procesul de comandă, plată, livrare, retur și garanție.
      </p>

      <h2>3. Reguli de utilizare</h2>
      <p>Te angajezi:</p>
      <ul>
        <li>Să folosești site-ul exclusiv în scopuri legale</li>
        <li>Să furnizezi date corecte și actuale în formularele site-ului</li>
        <li>Să nu folosești site-ul pentru spam, fraude sau orice formă de comunicare nesolicitată</li>
        <li>Să nu încerci să accesezi neautorizat secțiuni ale site-ului sau ale infrastructurii noastre</li>
        <li>Să respecți drepturile noastre de proprietate intelectuală și pe cele ale brandurilor reprezentate</li>
      </ul>
      <p>
        Ne rezervăm dreptul de a refuza sau anula o cerere de precomandă /
        colaborare dacă bănuim utilizarea incorectă a site-ului sau încălcarea
        acestor reguli.
      </p>

      <h2>4. Conținut și proprietate intelectuală</h2>
      <p>
        Toate elementele site-ului — texte, fotografii, ilustrații, design,
        logo-uri, mărci înregistrate — sunt proprietatea SC AERA SCENTT SRL,
        a brandurilor partenere (Aqua Mineral, Oliere Paris, Redefine Matcha)
        sau a licențiatorilor noștri.
      </p>
      <p>
        Conținutul este protejat de legislația privind drepturile de autor și
        proprietatea industrială. Nu este permisă reproducerea, copierea,
        descărcarea, modificarea sau distribuirea conținutului fără acordul
        nostru scris prealabil, cu excepția utilizării personale și
        ocazionale, în condițiile legii.
      </p>
      <p>
        Mărcile <em>AERA Beauty</em>, <em>Aqua Mineral</em>,{' '}
        <em>Oliere Paris</em> și <em>Redefine Matcha</em> aparțin titularilor
        respectivi și sunt utilizate pe baza acordurilor comerciale în vigoare.
      </p>

      <h2>5. Formularele de pe site</h2>
      <p>
        Formularele de pe site (precomandă, colaborare, contact) au caracter
        informativ și nu constituie comenzi ferme sau contracte. Trimiterea
        formularului ne permite să-ți răspundem cu informații despre produse,
        disponibilitate și condiții comerciale.
      </p>
      <p>
        Pentru protecția datelor tale, consultă{' '}
        <a href="/politica-confidentialitate">Politica de confidențialitate</a>.
      </p>

      <h2>6. Limitarea răspunderii</h2>
      <p>
        Depunem eforturi rezonabile pentru ca informațiile prezentate pe site
        (descrieri de produse, ingrediente, compoziții, beneficii) să fie
        corecte și actuale. Totuși:
      </p>
      <ul>
        <li>
          Informațiile despre produse sunt cu titlu informativ și nu
          înlocuiesc consultanța unui specialist (dermatolog, hairstilist,
          medic etc.).
        </li>
        <li>
          Rezultatele individuale ale utilizării produselor pot varia de la o
          persoană la alta.
        </li>
        <li>
          Pot exista erori tipografice ocazionale sau imagini care diferă
          ușor de aspectul real al produsului. Vom corecta orice astfel de
          eroare cât mai curând după ce o identificăm.
        </li>
        <li>
          Nu garantăm disponibilitatea continuă și fără întreruperi a
          site-ului. Putem efectua periodic mentenanță sau actualizări.
        </li>
      </ul>
      <p>
        În măsura permisă de lege, nu răspundem pentru pierderi indirecte,
        consecvente sau speciale rezultate din utilizarea sau imposibilitatea
        utilizării site-ului.
      </p>

      <h2>7. Modificarea termenilor</h2>
      <p>
        Putem actualiza acești termeni periodic. Versiunea curentă este
        publicată la aerabeauty.ro/termeni-si-conditii, iar data ultimei
        actualizări apare în partea de sus a paginii. Utilizarea continuă a
        site-ului după publicarea modificărilor înseamnă acceptarea lor.
      </p>

      <h2>8. Legea aplicabilă și soluționarea disputelor</h2>
      <p>
        Acești termeni sunt guvernați de legea română. Orice dispută legată
        de utilizarea site-ului va fi soluționată mai întâi pe cale amiabilă.
        Dacă nu se ajunge la un acord, competența aparține instanțelor române,
        respectiv ale municipiului București (sectorul 3).
      </p>
      <p>
        Pentru orice nelămurire, întrebare sau sesizare, ne poți contacta la{' '}
        <a href="mailto:office@aerabeauty.ro">office@aerabeauty.ro</a>.
      </p>

      <hr />

      <p className="small-note">
        Acești termeni reflectă forma curentă a site-ului (v1, prezentare). Vor
        fi extinși la lansarea magazinului online cu prevederi specifice
        privind comenzile, plățile, livrarea și returul.
      </p>
    </LegalPage>
  )
}
