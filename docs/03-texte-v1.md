# AERA Beauty — texte website (v1, pentru polish)

**Voice:** editorial premium, cald · frazare medie · vocabular elevat dar inteligibil · puține adjective, multe substantive concrete · verbe active · adresare cu „tu".

**Diacritice:** complete (ă, â, î, ș, ț).

**Convenție document:** acolo unde am presupus ceva (descrieri de produs fără brief detaliat), marchez cu *italic în paranteze* — sunt punctele unde polish-ul tău va aduce cel mai mult.

---

## 1. HOME (`/`)

### 1.1 Hero

**Headline (display, două rânduri):**

> Frumusețe curată,
> *centrată pe piele.*

**Sub-headline (sans, un rând generos):**

> Trei branduri premium, atent selectate pentru pielea care arată autentic — Aqua Mineral, Oliere Paris și Redefine Matcha, aduse în România de AERA Beauty.

**CTA primar:** `Precomandă` (deschide modal)
**CTA secundar:** `Descoperă brandurile` (scroll smooth la secțiunea de branduri)

### 1.2 Secțiune filozofie

**Eyebrow:** `Filozofia AERA`

**Paragraf:**

> Credem că frumusețea adevărată vine din echilibru, nu din artificiu. Reprezentăm exclusiv branduri în care selecția ingredientelor este la fel de riguroasă ca rezultatul vizibil — formule curate, performanță reală, fără compromisuri.

**CTA discret:** `Despre AERA →`

### 1.3 Cele trei branduri (3 carduri mari)

Fiecare card: logo + 1 cuvânt-cheie + 1 propoziție.

**Aqua Mineral** · `Skincare`
> Frumusețea Mării Moarte, formulată cu rigoare cosmetică.

**Oliere Paris** · `Haircare`
> Uleiuri naturale care refac firul de păr fără să-l încarce.

**Redefine Matcha** · `Haircare`
> Energia matcha, transformată în îngrijire pentru păr.

CTA per card: `Vezi colecția →`

### 1.4 Produse selectate (carousel / grid)

**Eyebrow:** `Produse selectate`

**Headline:** *Cele mai cerute formule din cele trei branduri.*

**Subtitle scurt:**
> O selecție pentru începutul rutinei — pe rest îi descoperi pe paginile de brand.

*(produsele se trag dintr-o listă curată de 6–9 hero-uri; la build alegem.)*

### 1.5 Diferențiatori (3 micro-secțiuni cu icon line)

**1. Selectate cu rigoare**
> Branduri evaluate pe formulă, transparență și etică — nu pe popularitate.

**2. Reprezentare exclusivă în România**
> Importăm direct, fără intermediari, ca să garantăm autenticitate și prospețime.

**3. Suport personalizat**
> Recomandări de rutină, demonstrații, consultanță pentru specialiști și retaileri.

### 1.6 Secțiune contact (deasupra formularului)

**Eyebrow:** `Vorbim`

**Headline:** *Aici ne găsești.*

```
Email:     office@aerabeauty.ro    [placeholder, de confirmat cu clientul]
Telefon:   +40 ___ ___ ___        [de completat]
WhatsApp:  +40 ___ ___ ___        [opțional, același]
Sediu:     SC AERA SCENTT SRL · [adresă] · CUI: [cod]
```

Social: Instagram · Facebook · TikTok (iconițe linie)

### 1.7 Formular precomandă (scurt) — chiar înainte de footer

**Eyebrow:** `Precomandă`

**Headline:** *Spune-ne ce te interesează.*

**Subtitle:**
> Site-ul nostru este în versiune de prezentare. Magazinul deschide curând. Lasă-ne datele tale și te contactăm cu detalii, preț și disponibilitate.

**Câmpuri (în ordine):**

| Label | Placeholder | Tip | Validare |
|---|---|---|---|
| Nume și prenume * | „Maria Popescu" | text | obligatoriu, min. 2 cuvinte |
| Email * | „maria@exemplu.ro" | email | obligatoriu, format email |
| Telefon | „+40 7__ ___ ___" | tel | opțional |
| Oraș | „București" | text | opțional |
| Brand de interes * | dropdown: Aqua Mineral / Oliere Paris / Redefine Matcha / Toate | select | obligatoriu |
| Produs sau gamă | „Youth Essence Serum" | text | opțional |
| Mesaj | „Spune-ne ce cauți: produs, cantitate, întrebări." | textarea | opțional, max 500 char |

**Checkbox-uri (separate, nebifate implicit):**

☐ **GDPR (obligatoriu)** — *„Sunt de acord cu prelucrarea datelor mele personale conform [Politicii de confidențialitate](/politica-confidentialitate), pentru a fi contactat(ă) în legătură cu cererea mea."*

☐ **Marketing (opțional)** — *„Vreau să primesc, ocazional, recomandări și noutăți AERA Beauty pe email. Mă pot dezabona oricând."*

**Buton:** `Trimite cererea` (inactiv până la completarea câmpurilor obligatorii)

**Mesaj de confirmare (după submit):**

> Mulțumim. Am primit cererea ta și revenim în maximum 48 de ore lucrătoare. Între timp, dacă vrei să răsfoiești, [vezi colecțiile noastre →](/produse)

**Mesaj de eroare generic:**

> Ceva nu a mers. Reîncearcă într-un minut, sau scrie-ne direct la office@aerabeauty.ro.

### 1.8 Footer

**Tagline (sub logo):**
> Frumusețe curată, reprezentată în România.

**Coloana 1 — Navigație:** Despre · Produse · Colaborează · Contact (jump pe home)
**Coloana 2 — Branduri:** Aqua Mineral · Oliere Paris · Redefine Matcha
**Coloana 3 — Contact:** email · telefon · WhatsApp
**Coloana 4 — Conectează-te:** Instagram · Facebook · TikTok · Newsletter (mini-form 1 câmp + GDPR)

**Bara jos:**
> © 2026 SC AERA SCENTT SRL · [Politica de confidențialitate](/politica-confidentialitate) · [Termeni și condiții](/termeni-si-conditii) · [Cookies](/cookies)

---

## 2. DESPRE (`/despre`)

### 2.1 Hero

**Eyebrow:** `Despre AERA Beauty`

**Headline:**
> Frumusețe curată,
> *centrată pe piele.*

### 2.2 Corp text (preluat din materialele clientului, polish minim)

> Credem într-o piele care arată autentic — și într-o strălucire care vine din echilibru, nu din artificiu. Ghidate de transparență și exprimate prin culoare, redefinim convențiile frumuseții curate, prin formule sigure și performante, gândite să protejeze și să revitalizeze pielea.

**Sub-secțiune cu eyebrow „Credem în mai bine":**

> Am înțeles devreme că „natural" nu înseamnă automat benefic, iar „sintetic" nu este sinonim cu nociv. Frumusețea curată se naște la intersecția acestor lumi — acolo unde selecția riguroasă a ingredientelor devine esențială, fără compromis.

**Sub-secțiune cu eyebrow „Mai bine înseamnă echilibru":**

> Pentru noi, frumusețea curată este una conștient construită. Ingredientele sunt alese cu grijă pentru a funcționa în armonie, susținând sănătatea și integritatea pielii — atât la suprafață, cât și în straturile profunde.

### 2.3 Tranziție către branduri

**Headline mic:**
> Trei branduri pe care le reprezentăm.

**Paragraf:**
> AERA Beauty aduce în România trei direcții complementare în îngrijirea premium — skincare bazat pe minerale (Aqua Mineral), haircare profesional pe uleiuri (Oliere Paris) și o linie nouă, energică, în jurul matcha-ului (Redefine).

CTA: `Vezi produsele →`

---

## 3. PRODUSE — HUB (`/produse`)

### 3.1 Hero

**Eyebrow:** `Produse`

**Headline:**
> Trei branduri,
> *o singură rigoare.*

**Subtitle:**
> Fiecare brand pe care îl reprezentăm a trecut prin aceeași evaluare: formulă, transparență, performanță reală.

### 3.2 Cele trei carduri brand

(text identic cu home §1.3, în format card mare — logo + 1 cuvânt + 1 propoziție + CTA)

---

## 4. AQUA MINERAL (`/produse/aqua-mineral`)

### 4.1 Hero

**Logo Aqua Mineral · tagline:** *The Science of Beauty*

**Headline:**
> Marea Moartă,
> *îmbrăcată în știință.*

**Subtitle:**
> Aqua Mineral este un brand premium de îngrijire bazat pe minerale și ape din Marea Moartă, îmbogățite cu ingrediente de înaltă calitate și tehnologii cosmetice inovatoare. Fiecare formulă acționează în sinergie pentru a susține sănătatea pielii, a combate semnele îmbătrânirii și a oferi rezultate vizibile.

### 4.2 Gamele Aqua Mineral (7 secțiuni cu ancore)

#### Basic Facial Care

**Eyebrow:** `Gama` · **Titlu:** `Basic Facial Care`

> Esențialele unei rutine echilibrate. Curăță, tonifiază și pregătește pielea pentru ingredientele active care urmează. Formulele eliberează porii, susțin absorbția optimă și mențin tenul curat și luminos.

Produse:
- **Daily Dewdrops Facial Cleanser** — *(Gel de curățare blând, cu minerale din Marea Moartă, pentru un ten proaspăt fără senzația de uscare.)*
- **Daily Dewdrops Facial Toner** — *(Toner reechilibrant, fără alcool, pregătește pielea pentru pașii următori și redă tonicitatea.)*
- **Milky Facial Scrub** — *(Exfoliant cremos cu microparticule fine, netezește textura fără să irite pielea sensibilă.)*
- **Clarity Peeling Gel** — *(Peeling enzimatic care îndepărtează celulele moarte și revelează un ten clar, luminos.)*

#### Anti Aging

**Eyebrow:** `Gama` · **Titlu:** `Anti Aging`

> Îngrijire zilnică pentru o piele proaspătă, fermă și luminoasă. Dezvoltată cu tehnologia brevetată Renovage™, gama combină mineralele din Marea Moartă cu inovație cosmetică, susținând structura și fermitatea pielii. Uleiurile și extractele naturale intensifică hidratarea și suplețea.

Produse:
- **Youth Essence Serum** — *(Ser anti-aging cu efect tensor, redă vitalitatea pielii mature.)*
- **Uplift Firming Eye Gel** — *(Gel pentru conturul ochilor, reduce vizibil cearcănele și liniile fine.)*
- **Optima Hydrating Day Cream — Normal to Dry Skin** — *(Cremă de zi nutritivă, ideală pentru pielea normală spre uscată.)*
- **Optima Hydrating Day Cream — Normal to Oily Skin** — *(Cremă de zi cu textură lejeră, hidratează fără să încarce tenul mixt.)*

#### Body Care

**Eyebrow:** `Gama` · **Titlu:** `Body Care`

> Introducerea ideală în universul Aqua Mineral. Mineralele exfoliante se combină cu uleiuri naturale reparatoare pentru o piele revitalizată în profunzime — netedă, hidratată, vizibil întinerită.

Produse:
- **Blissful Body Butter — Starlight Glamour** — *(Unt de corp luxuriant, hidratează intens și lasă o aromă subtilă, festivă.)*
- **Total Silk Body Scrub — Forest Dreams** — *(Scrub corporal cu minerale și uleiuri esențiale, netezește pielea cu o notă verde discretă.)*

#### Gold Performance

**Eyebrow:** `Gama` · **Titlu:** `Gold Performance`

> Pentru pielea matură sau cu semne vizibile de îmbătrânire — formule cu particule de aur 24K și extracte avansate, care acționează rapid asupra fermității și luminozității. Rezultatul: un efect imediat de netezire și o îmbunătățire progresivă, vizibilă în timp.

Produse:
- **24K Intensive Face Cream** — *(Cremă rich cu aur 24K, redă elasticitatea pielii mature.)*
- **24K Intensive Face Serum** — *(Ser concentrat cu particule de aur, susține fermitatea și luminozitatea.)*
- **24K Intensive Mask** — *(Mască intensivă, oferă un efect imediat de prospețime și luminozitate.)*

#### Optima+ Collection

**Eyebrow:** `Gama` · **Titlu:** `Optima+ Collection`

> Ritual în patru pași pentru pielea care a pierdut din fermitate. Provitamina B5, mineralele din Marea Moartă și tehnologia Resistem™ combat efectele radicalilor liberi, netezesc liniile fine și redau pielii tonusul vizibil.

Produse:
- **Supreme Face Serum** — *(Ser concentrat anti-aging, primul pas al ritualului Optima+.)*

#### Premium Collection

**Eyebrow:** `Gama` · **Titlu:** `Premium Collection`

> Pentru nevoile specifice ale pielii mature. Formule specializate care acționează țintit, cu efecte imediate susținute de utilizarea constantă — inclusiv efectul de netezire vizibil al cremei antirid Juveness. Produsele se integrează în orice rutină Aqua Mineral.

Produse:
- **Juveness De-Wrinkle Cream** — *(Cremă antirid cu efect tensor imediat, vizibil din primele aplicări.)*
- **Puffiness Eraser** — *(Tratament pentru conturul ochilor, reduce pungile și umflăturile.)*
- **Extensor Deep Lifting Mask** — *(Mască intensivă cu efect lifting, redă fermitatea trăsăturilor.)*

#### Smart Delivery System

**Eyebrow:** `Gama` · **Titlu:** `Smart Delivery System`

> Tehnologii avansate de livrare a ingredientelor active, combinate cu extracte naturale de înaltă performanță. Stimulează colagenul și acidul hialuronic, îmbunătățesc elasticitatea și reduc liniile fine — susținute de inovații precum X50® Hyalufiller, CollaPlant Z NPNF® și PhytoCellTec™ Argan.

Produse:
- **Smart Delivery Facial Cream** — *(Cremă cu sisteme inteligente de livrare, hidratează în profunzime și stimulează colagenul.)*
- **Timeless Glow Wrinkle Filler** — *(Tratament punctual pentru riduri, efect de „umplere" imediată.)*

### 4.3 CTA pagină

**Eyebrow:** `Precomandă`
**Headline:** *Vrei un produs Aqua Mineral?*
**Subtitle:** Lasă-ne datele și revenim cu detalii, recomandare și disponibilitate.
**Buton:** `Precomandă produs Aqua` → modal cu formularul scurt, brand pre-selectat

---

## 5. OLIERE PARIS (`/produse/oliere-paris`)

### 5.1 Hero

**Logo Oliere Paris**

**Headline:**
> Uleiuri,
> *rafinate la Paris.*

**Subtitle:**
> Brand de top în îngrijirea profesională a părului, dezvoltat alături de chimiști din industria cosmetică franceză. Formulele combină tehnologie avansată cu o concentrație ridicată de uleiuri naturale, recunoscute pentru capacitatea lor de a repara și revitaliza firul de păr — fără să-l încarce.

**Paragraf complementar:**

> Fiecare produs include un complex atent ales de peste zece uleiuri naturale, bogate în nutrienți esențiali, pentru un păr sănătos și rezistent de la rădăcină până la vârfuri.

### 5.2 Gamele Oliere Paris (3 secțiuni cu ancore)

#### Color Éclat

**Eyebrow:** `Gama` · **Titlu:** `Color Éclat`

> Pentru păr vopsit sau deteriorat chimic. Color Éclat protejează culoarea și reface structura firului de păr, cu uleiuri naturale și agenți de îngrijire avansați care hrănesc în profunzime. Rezultatul: protecție împotriva agresiunilor externe, risc redus de rupere, vârfuri vizibil mai netede și o strălucire intensă.

**Sub-linia Acai (în Color Éclat):**

> În interiorul gamei, **linia ACAI** este dedicată părului decolorat sau șuvițat — formulată cu ulei pur de açaí, neutralizează nuanțele nedorite (galben, portocaliu), redă moliciunea și strălucirea, și protejează culoarea împotriva razelor UV și a căldurii.

Produse:
- **Color Éclat Hair Shampoo 500 ml** — *(Șampon de îngrijire pentru păr vopsit, păstrează culoarea vibrantă mai mult timp.)*
- **Color Éclat Hair Serum 150 ml** — *(Ser leave-in, sigilează vârfurile și adaugă strălucire fără greutate.)*
- **Color Éclat Hair Moisturizer 500 ml** — *(Tratament hidratant pentru păr vopsit, redă elasticitatea.)*
- **Color Éclat Acai Shampoo 500 ml** — *(Șampon nuanțator, neutralizează tonurile galbene și portocalii.)*
- **Color Éclat Acai Hair Mask 500 ml** — *(Mască nuanțatoare, hrănește părul decolorat și reîmprospătează culoarea.)*
- **Color Éclat Anti-Dandruff Shampoo 500 ml** — *(Șampon anti-mătreață delicat cu părul vopsit, calmează scalpul.)*

#### Valour

**Eyebrow:** `Gama` · **Titlu:** `Valour`

> Reparare intensă pentru părul deteriorat de coafarea la căldură. Complexul de uleiuri naturale refacere în profunzime și redă suplețea firului de păr, protejând împotriva agresiunilor externe — inclusiv a particulelor metalice. Rezultatul vizibil încă de la prima utilizare.

Produse:
- **Valour Hair Shampoo 500 ml** — *(Șampon reparator pentru păr stresat termic.)*
- **Valour Hair Mask 500 ml** — *(Mască intensivă, reconstruiește firul de păr deteriorat.)*
- **Valour Hair Conditioner 500 ml** — *(Balsam nutritiv, închide cuticula și redă strălucirea.)*
- **Valour Hair Serum 150 ml** — *(Ser termo-protector, scut împotriva ondulatorului și plăcii.)*

#### Ordinaire

**Eyebrow:** `Gama` · **Titlu:** `Ordinaire`

> Pentru părul normal spre uscat. Formulate cu extract de avocado și ulei de semințe de in — bogate în vitamine și acizi grași esențiali — produsele Ordinaire oferă echilibrul ideal între curățare, hidratare și protecție zilnică. Întăresc firul de păr, redau suplețea și lasă un parfum delicat, de durată.

Produse:
- **Ordinaire Nourishing Shampoo 100 ml** — *(Format de călătorie, aceeași formulă nutritivă.)*
- **Ordinaire Hair Shampoo 500 ml** — *(Șampon zilnic pentru păr normal spre uscat.)*
- **Ordinaire Hair Mask 500 ml** — *(Mască hrănitoare cu avocado și in.)*
- **Ordinaire Hair Serum 150 ml** — *(Ser leave-in lejer, parfum fin și strălucire naturală.)*

### 5.3 CTA pagină

**Buton:** `Precomandă produs Oliere` → modal, brand Oliere pre-selectat

---

## 6. REDEFINE MATCHA (`/produse/redefine-matcha`)

### 6.1 Hero

**Logo Redefine Matcha**

**Headline:**
> Matcha,
> *redefinit ca îngrijire.*

**Subtitle:**
> Redefine Matcha aduce antioxidanții și energia ceaiului matcha într-o linie de îngrijire dedicată părului. Formulele combină extractul concentrat de matcha cu ingrediente care susțin densitatea, elasticitatea și strălucirea naturală a firului.

### 6.2 Produsele Redefine Matcha (secțiune unică, grid)

- **Matcha Series Hair Shampoo 400 ml** — *(Șampon zilnic cu extract de matcha, curăță delicat și revitalizează scalpul.)*
- **Matcha Series Hair Mask 500 ml** — *(Mască săptămânală, hrănește în profunzime și redă elasticitatea.)*
- **Matcha Series Hair Mask for Thin Hair 500 ml** — *(Mască special formulată pentru părul fin, oferă densitate fără să-l îngreuneze.)*
- **Matcha Series Leave-in Hair Mask 200 ml** — *(Tratament fără clătire, hidratează și protejează pe parcursul zilei.)*
- **Matcha Series Hair Serum 125 ml** — *(Ser cu efect de strălucire intensă, sigilează vârfurile și protejează termic.)*

### 6.3 CTA pagină

**Buton:** `Precomandă produs Redefine` (verde matcha, nu mocha — singura excepție UI)
→ modal, brand Redefine pre-selectat

---

## 7. COLABOREAZĂ CU NOI (`/colaboreaza`)

### 7.1 Hero

**Eyebrow:** `Colaborează cu noi`

**Headline:**
> Hai să creștem,
> *împreună.*

**Subtitle:**
> Ne dorim să depășim granițele obișnuite ale industriei de frumusețe. Dacă ești salon, retailer, distribuitor, clinică estetică, creator de conținut sau presă, ne face plăcere să te avem alături.

### 7.2 Intro

**Headline mic:** *Trei branduri, trei direcții de colaborare.*

**Paragraf:**

> Alege brandul pe care vrei să-l explorezi și completează formularul de mai jos. Folosim datele pentru a-ți face o ofertă personalizată — demo, training, kit de mostre, listare în catalog, suport marketing sau campanie. Răspundem în maximum 48 de ore lucrătoare.

### 7.3 Selector brand (tab-uri desktop / accordion mobile)

Tab 1: `Aqua Mineral` (icon mocha)
Tab 2: `Oliere Paris` (icon mocha)
Tab 3: `Redefine Matcha` (icon verde matcha)

Fiecare deschide formularul B2B specific (preluat din cele trei JPEG-uri Cosmobeauty, structură identică, doar conținut diferit per brand).

### 7.4 Microcopy comun formulare B2B

**Eyebrow secțiune 1:** `01 · Date de contact`
- Nume și prenume *
- Telefon *
- Email *
- Oraș *

**Eyebrow secțiune 2:** `02 · Profil partener` (single-select cu „Altul")
*(opțiunile diferă per brand — vezi JPEG-urile)*

**Eyebrow secțiune 3:** `03 · Interes pentru [BRAND]` (multi-select)
**Eyebrow secțiune 4:** `04 · Game / produse de interes` (multi-select chip-uri)
**Eyebrow secțiune 5:** `05 · Tip de colaborare / nevoi` sau `Efect / zonă de interes` (depinde de brand)
**Eyebrow secțiune 6:** `06 · Follow-up dorit` (single-select: WhatsApp / email / telefon)

**Eyebrow secțiune 7:** `07 · Consimțământ`

> ☐ Sunt de acord să fiu contactat(ă) de AERA Beauty prin telefon, WhatsApp sau email, în scopul gestionării solicitării mele, transmiterii de informații despre [BRAND] și contactării pentru follow-up. [Vezi Politica de confidențialitate →](/politica-confidentialitate)

> ☐ *(opțional)* Vreau să primesc, ocazional, informații despre lansări, traininguri și oportunități de colaborare AERA Beauty.

**Buton:** `Trimite cererea` (mocha — sau matcha doar pentru tab Redefine)

**Confirm message:**

> Mulțumim. Cererea ta a fost transmisă echipei AERA. Revenim în maximum 48 de ore lucrătoare cu un răspuns personalizat.

### 7.5 Secțiune încheiere

**Headline:** *Pentru orice altă întrebare:*

> Scrie-ne la **office@aerabeauty.ro** sau la **+40 ___ ___ ___**. Te ascultăm.

---

## 8. PAGINI LEGALE (template-uri — necesită avizare juridică)

**Notă:** textele de mai jos sunt schelete; pentru lansare ai nevoie de:
- Politica de confidențialitate completă, conformă GDPR și legislației române (DPO declarat sau motivat absent, transferuri date, perioadă de stocare etc.) — se face cu un avocat sau cu un șablon validat.
- Termeni și condiții — minim necesar pentru un site fără shop (regulile de utilizare, proprietatea intelectuală, limitarea răspunderii).
- Politica de cookies — cu lista exactă a cookie-urilor folosite (Google Analytics? Meta Pixel? etc.).

### 8.1 Politica de confidențialitate (schelet)

Capitole de acoperit:
1. Operatorul de date — SC AERA SCENTT SRL, sediul, CUI, email DPO/contact
2. Ce date colectăm — formular precomandă, formulare B2B, newsletter, cookies
3. Temeiul legal — consimțământ (art. 6 (1) (a) GDPR) + interes legitim
4. Scopul prelucrării — gestionarea cererii, transmiterea de informații, marketing (cu consimțământ separat)
5. Perioada de stocare — *(de stabilit: 3 ani de la ultimul contact?)*
6. Destinatari — furnizori de servicii (email provider, hosting, analytics)
7. Transferuri internaționale — *(dacă Resend/Vercel/etc. sunt în US, menționăm clauze contractuale standard)*
8. Drepturile utilizatorului — acces, rectificare, ștergere, opoziție, portabilitate, retragere consimțământ
9. Contact pentru exercitarea drepturilor — email dedicat (ex: gdpr@aerabeauty.ro)
10. Modificări ale politicii

### 8.2 Termeni și condiții (schelet)

1. Despre site — natura informativă, fără vânzare directă în v1
2. Proprietate intelectuală — logo-uri, texte, imagini
3. Comportamentul utilizatorului
4. Limitarea răspunderii
5. Modificări
6. Legea aplicabilă și jurisdicția

### 8.3 Politica de cookies (schelet)

1. Ce sunt cookies-urile
2. Categorii folosite pe site:
   - **Strict necesare** (sesiune, GDPR consent) — fără consimțământ
   - **Analitice** (Google Analytics? Plausible?) — cu consimțământ
   - **Marketing** (Meta Pixel? Google Ads?) — cu consimțământ
3. Cum dezactivezi cookies
4. Reactualizare politică

**Banner de cookies pe site:** *„Folosim cookies pentru a îmbunătăți experiența ta și a măsura performanța site-ului. Poți alege ce accepți."* + butoane `Acceptă toate` / `Doar necesare` / `Setări`.

---

## 9. Microcopy diverse

### 9.1 Header

- Link „Despre" → `/despre`
- Link „Produse" → `/produse` (cu dropdown: Aqua / Oliere / Redefine)
- Link „Colaborează" → `/colaboreaza`
- Link „Contact" → ancoră `#contact` pe home
- CTA „Precomandă" → modal global

**Mobile menu open:** `Meniu`
**Mobile menu close:** `Închide`

### 9.2 Modal precomandă (global)

**Titlu:** *Precomandă*
**Subtitle:** *Te contactăm cu detalii și disponibilitate.*
*(restul: identic cu formularul de pe home)*

**Buton închidere:** `×` (aria-label: „Închide modal")

### 9.3 Stări empty / loading

- Loading: „Se încarcă…"
- Eroare network: „Conexiunea s-a întrerupt. Reîncearcă."
- 404: *„Această pagină a luat o pauză. Hai înapoi pe [pagina principală](/). "*

### 9.4 Meta SEO (titluri pagini, descrieri)

| Pagină | Title | Description |
|---|---|---|
| `/` | AERA Beauty — Frumusețe curată, centrată pe piele | Trei branduri premium aduse în România: Aqua Mineral, Oliere Paris și Redefine Matcha. |
| `/despre` | Despre AERA Beauty | Cine suntem și de ce reprezentăm exclusiv branduri premium în România. |
| `/produse` | Produse AERA Beauty | Skincare cu minerale din Marea Moartă și haircare profesional cu uleiuri naturale. |
| `/produse/aqua-mineral` | Aqua Mineral — Skincare cu minerale din Marea Moartă | Anti-aging, body care, gold performance, smart delivery. Distribuit în România de AERA Beauty. |
| `/produse/oliere-paris` | Oliere Paris — Haircare premium cu uleiuri naturale | Color Éclat, Valour, Ordinaire. Reparare profesională a firului de păr. |
| `/produse/redefine-matcha` | Redefine Matcha — Energia matcha pentru păr | Șampoane, măști și seruri cu extract de matcha. |
| `/colaboreaza` | Colaborează cu AERA Beauty | Pentru saloane, distribuitori, retaileri, creatori de conținut și presă. |

---

## 10. De clarificat cu clientul (înainte să dăm bun de tipar)

1. Email oficial AERA Beauty (domeniu confirmat: `aerabeauty.ro` — de configurat mailboxes `hello@`, `gdpr@`, eventual `colaborari@`)
2. Telefon și WhatsApp
3. Adresă sediu + CUI complet
4. Conturi social media (există? URL-uri?)
5. Există fotografii lifestyle/ambient (texturi, mâini, băi premium) sau folosim doar pack-shot?
6. ACAI — confirmare că rămâne sub-linie Color Éclat (am presupus DA pe baza folderelor de fotografii)
7. Descrieri detaliate de produs pe care le-am scris generic — clientul ar trebui să confirme/corecteze ingredientele și beneficiile
8. Avocat pentru pagini legale
