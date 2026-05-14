# AERA Beauty — Sitemap & arhitectură pagini (v1)

**Status:** propunere pentru discuție · **Data:** 14 mai 2026
**Stack:** Next.js App Router · Tailwind · motion (Framer) · 21st.dev

---

## 1. Header (sticky, devine opac la scroll)

- Logo AERA BEAUTY (stânga)
- Navigație:
  - Despre
  - Produse  ▾  (mega-menu cu cele 3 branduri + thumbnails game featured)
  - Colaborează cu noi
  - Contact
- CTA mic dreapta: **"Precomandă"** (scroll smooth la formularul de pe home, sau deschide modal pe orice pagină)

---

## 2. Home `/` — landing premium

> **Notă:** secțiune Contact (date firmă + email/telefon/social) intercalată chiar deasupra formularului de precomandă (între #6 și #7 footer).


Treat ca landing, nu ca o pagină corporate. Scopul: să încânte vizual + să convertească în lead.

| # | Secțiune | Conținut | Animație motion |
|---|---|---|---|
| 1 | **Hero** | Imagine ambient generoasă + headline scurt ("Frumusețe curată, centrată pe piele") + sub-headline + CTA primar (Precomandă) + CTA secundar (Descoperă brandurile) | Fade-in + parallax subtil |
| 2 | **Filozofie AERA** | Un paragraf scurt, tipografie largă, mult whitespace | Reveal pe scroll |
| 3 | **Cele 3 branduri** | 3 carduri mari (1/3 lățime fiecare): Aqua / Oliere / Redefine — fiecare cu logo + un cuvânt-cheie + hover state | Hover lift + image scale |
| 4 | **Produse selectate** | Carousel 6–9 produse "hero" din toate brandurile, cu poză packshot pe fundal cremă | Drag/swipe + tilt subtil |
| 5 | **Diferențiatori** | 3–4 propuneri scurte ("Selectat cu rigurozitate" / "Reprezentate exclusiv în România" / "Frumusețe conștient construită") cu iconițe lineare | Stagger reveal |
| 6 | **Formular precomandă consumer (scurt)** | 5–6 câmpuri: nume, email, telefon (opțional), oraș, produs/brand de interes (dropdown), mesaj scurt + GDPR + opt-in marketing | — |
| 7 | **Footer** | Date contact AERA SCENTT SRL, social, legal | — |

---

## 3. Despre `/despre`

- Hero text-only sau cu imagine ambient discretă
- Cele trei "credo"-uri din textul deja primit, una sub alta cu spațiere generoasă:
  1. "Frumusețe curată, centrată pe piele"
  2. "Credem în mai bine"
  3. "Mai bine înseamnă echilibru"
- Posibil secțiune "Cele 3 branduri pe care le reprezentăm" (mini-cards link)
- CTA final: vezi produsele / colaborează cu noi

---

## 4. Produse `/produse` — pagina hub

- Hero pagină
- 3 carduri mari de brand: Aqua Mineral / Oliere Paris / Redefine Matcha
- Fiecare card → link către pagina brand
- *(Opțional)* secțiune "Cea mai populară gamă" featured

---

## 5. Pagină brand — Aqua Mineral `/produse/aqua-mineral`

- Hero cu logo Aqua + claim ("The Science of Beauty")
- Paragraf brand (80–150 cuvinte din text)
- **7 game** ca secțiuni cu ancore în nav lateral (sticky pe desktop):
  - Anti Aging
  - Basic Facial Care
  - Body Care
  - Gold Performance
  - Optima+ Collection
  - Premium
  - Smart Delivery System
- Fiecare gamă = mini-hero (titlu + 20–40 cuvinte) + grid 2-3 col cu carduri produs (poză packshot + nume + descriere scurtă 2 rânduri)
- CTA final pagină: **"Precomandă produs Aqua"** → modal cu formularul scurt, produs pre-selectat

---

## 6. Pagină brand — Oliere Paris `/produse/oliere-paris`

- Hero + paragraf brand
- **4 game** ca secțiuni:
  - Color Éclat (cu ACAI ca sub-secțiune sau menționat distinct — *de confirmat*)
  - Valour
  - Ordinaire
- Grid produse identic ca structură cu Aqua
- CTA: precomandă Oliere

---

## 7. Pagină brand — Redefine Matcha `/produse/redefine-matcha`

- Hero + paragraf brand
- Doar 5 produse → secțiune unică, grid 2-3 col, fără game intermediare
- CTA: precomandă Redefine

---

## 8. Colaborează cu noi `/colaboreaza`

- Hero text "Ne dorim să depășim granițele obișnuite..."
- Intro: pentru parteneri B2B (saloane, retail, distribuitori), creatori de conținut, presă
- **Selector brand → formular B2B specific:**
  - Tab/buton Aqua → formularul lung Aqua (profil participant + interes + produse + efect + follow-up)
  - Tab/buton Oliere → formularul lung Oliere (profil partener + interes + game + tip colaborare + follow-up)
  - Tab/buton Redefine → formularul lung Redefine (profil + interes + produse + beneficii + follow-up)
- *(Pe mobile: accordion vertical în loc de tab-uri)*

---

## 9. ~~Contact `/contact`~~ — **eliminat ca pagină separată**

Pentru v1 contactul stă în footer + secțiune dedicată pe home (deasupra formularului de precomandă). Mai puțin de întreținut, focus mai clar.

**Pe home → secțiune Contact** chiar deasupra formularului:
- Email, telefon, WhatsApp
- SC AERA SCENTT SRL · adresă · CUI
- Social media (icons)

---

## 10. Footer (toate paginile)

- Logo AERA BEAUTY (varianta mică / albă)
- Coloana 1: navigație repetată
- Coloana 2: branduri (link-uri rapide)
- Coloana 3: contact (email, telefon)
- Coloana 4: social + newsletter mini-form
- Bara jos: copyright + link-uri legale (Politica de confidențialitate, Termeni, Cookies)

---

## 11. Pagini legale (template uniform)

- `/politica-confidentialitate`
- `/termeni-si-conditii`
- `/cookies`

---

## Decizii deschise (de validat)

| # | Subiect | Recomandarea mea |
|---|---|---|
| # | Subiect | Decizie |
|---|---|---|
| A | PDP-uri individuale | ❌ NU pentru v1 — doar carduri pe pagina de gamă. Vin cu shop-ul în 2-3 săpt. |
| B | Pagină hub `/produse` | ✅ DA |
| C | CTA precomandă pe brand | ✅ Modal pe loc cu produsul/brandul pre-selectat |
| D | Formulare B2B pe Colaborează | ✅ Tab-uri (desktop) / accordion (mobile) — toate pe o pagină |
| E | ACAI | ✅ Sub-secțiune în Color Éclat |
| F | Hero home: video sau imagine | Imagine + motion subtil (de validat materialele când le avem) |
| G | Pagină /contact separată | ❌ NU — doar footer + secțiune pe home |
| H | Limbă | RO doar |
| I | Secțiune "Produse selectate" pe home | Înclinăm spre carousel orizontal, decidem la build |
