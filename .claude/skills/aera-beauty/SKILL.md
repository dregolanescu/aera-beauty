---
name: aera-beauty
description: Apply AERA Beauty brand voice, palette, typography scale, and component conventions when working on the AERA Beauty website (Next.js + Tailwind + motion). Trigger when building components, writing copy, styling pages, choosing colors, picking font sizes, designing forms, or any task touching the visual or textual layer of this project.
---

# Skill — AERA Beauty

Acest skill conține regulile critice pentru website-ul AERA Beauty. Aplicabil pentru tot ce ține de **design, copy, componente, animații, layout și formulare** în acest proiect.

Documentele complete sunt în `docs/`:
- `docs/01-sitemap.md` — arhitectură pagini
- `docs/02-design-tokens.md` — design system complet (paletă, tipo, motion)
- `docs/03-texte-v1.md` — texte și voice ghid

Regulile de mai jos sunt **sumarul critic** — pentru detalii consult fișierele.

---

## 1. Identitate brand

AERA Beauty este umbrella-brandul care reprezintă în România trei branduri premium importate:
- **Aqua Mineral** — skincare cu minerale din Marea Moartă
- **Oliere Paris** — haircare profesional cu uleiuri naturale
- **Redefine Matcha** — haircare cu extract de matcha

Site v1 = prezentare, **fără e-commerce**. Magazin online vine în ~2-3 săptămâni.

**Domeniu:** `aerabeauty.ro`.
**Limbă:** doar română, diacritice complete (ș, ț, ă, â, î) obligatorii.

---

## 2. Voice & tone

**Editorial premium, cald.** Frazare medie (8-18 cuvinte). Vocabular elevat dar inteligibil. Verbe active. Substantive concrete. Adresare cu **„tu"**, niciodată „dumneavoastră".

**Folosește:**
- „echilibru", „rigoare", „rituală", „centrată pe piele", „atent", „selectat", „autentic", „transparență"
- Verbe puternice: susține, redă, hrănește, dezvăluie, refac, intensifică, protejează

**Evită:**
- „cel mai bun", „premium" gratuit, „revoluționar", „secretul", „magic"
- Adjective stivuite („produs minunat, extraordinar, fabulos")
- Marketing-speak generic („soluția ta", „experiența unică")
- Emoji-uri

**Capitalizare:** sentence case peste tot, excepție eyebrow + button caps și SVG-ul logo.

**Diacritice:** mereu complete. Și în placeholders, error messages, alt-text.

---

## 3. Paleta (tokens stricte)

| Token | Hex | Folosire |
|---|---|---|
| `cocoa-900` | `#3D2F25` | Text emfatic, hover buton primar |
| `cocoa-700` | `#5B4638` | **Brand principal.** Text body, buton primar, accent |
| `taupe-500` | `#8C7567` | Text secundar, microcopy |
| `stone-200` | `#E8DFD3` | Borduri, separatoare |
| `cream-100` | `#F5EFE7` | Background principal pagină |
| `ivory-50` | `#FBF7F0` | Background carduri |
| `aqua-teal` | `#2C5F6F` | Accent doar pe pagina Aqua, rar |
| `oliere-olive` | `#6B6F47` | Accent doar pe pagina Oliere, rar |
| `redefine-matcha` | `#7A8B5C` | Buton primar pe pagina Redefine (excepție) |

**Reguli dure:**
- **Nu inventa hex-uri.** Doar tokens-urile din tabel.
- Pe paginile brand non-Redefine, butonul primar e mereu `cocoa-700`. Doar pagina Redefine schimbă în `redefine-matcha`.
- Accentele brand apar parcimonios — etichete de gamă, pin-uri, iconografie. Niciodată pe header global sau footer.
- Fără gradients, fără shadows. Atmosfera vine din spațiu și tipografie.

---

## 4. Tipografie

### Fonts
- **`Bodoni Moda`** — display principal (hero, page titles, section titles, sub-headlines italic, citate). High fashion, glamorous.
- **`Noto Serif Display`** — display secundar pentru zone "clinice" (ingrediente, tehnologii ™, FAQ tehnic). Modern, academic.
- **`Inter`** — body & UI. Weights 400 + 500 doar.

Toate via `next/font/google` cu subset `latin` + `latin-ext`. **Nu** încărca Bahnschrift — e fontul logo-ului, livrat ca SVG asset.

### Scară responsive (folosește clamp pe titluri)

| Rol | Mobile | Desktop | Font |
|---|---|---|---|
| Hero H1 | 38-48px | 72-96px | Bodoni Moda |
| Page H1 | 32-40px | 56-72px | Bodoni Moda |
| H2 Section | 26-32px | 40-52px | Bodoni Moda |
| H3 Product block | 22-24px | 28-36px | Bodoni Moda |
| H4 Card title | 18-20px | 22-24px | Bodoni Moda |
| Body large | 18-20px | 21-24px | Inter |
| Body normal | **min 16px** | 17-18px | Inter |
| Eyebrow caps | 11-12px | 12-13px | Inter 500 |
| Button caps | 14-15px | 14-16px | Inter 500 |

**Letter-spacing:**
- Titluri mari display: −0.025em până la −0.045em
- Eyebrow / button caps: +0.10em până la +0.14em
- Body: 0

**Line-height:** 0.95-1.15 pe titluri, 1.5-1.65 pe body.

Folosește clasele `.hero-title`, `.page-title`, `.section-title`, `.body`, `.eyebrow` definite în `globals.css` — NU hardcoda `text-5xl` pe titluri editoriale.

---

## 5. Logo (regulă critică)

**Logo-ul AERA BEAUTY este SVG asset, niciodată text live.**

- Niciodată nu scrie „AERA" sau „AERA BEAUTY" ca `<h1>` text sau `<span>`.
- Folosește mereu SVG-ul real din `public/logo/`:
  - `aera-beauty-mocha.svg` (default, pe cream)
  - `aera-beauty-ivory.svg` (pe fundal mocha — footer)
  - `aera-beauty-mark.svg` (favicon, mark izolat)

Pentru sub-brand-uri, similar: `aqua-mineral-logo.svg`, `oliere-paris-logo.svg`, `redefine-matcha-logo.svg`.

---

## 6. Componente esențiale

### Buton primar
- Background: `cocoa-700` (excepție pagina Redefine: `redefine-matcha`)
- Text: `ivory-50`
- Padding: `14px 28px`
- Border radius: `2px` (aproape sharp, premium editorial)
- Font: Inter 500, caps, letter-spacing `0.10-0.12em`
- Hover: background `cocoa-900` (sau matcha-dark pe Redefine)
- Transition: `all 200ms ease`

### Buton ghost / secundar
- Background: transparent
- Text: `cocoa-700`
- Border: `0.5px solid cocoa-700`
- Hover: background `cocoa-700`, text `ivory-50`

### Input
- Background: `#FFFFFF`
- Border: `0.5px solid stone-200`
- Padding: `14px 16px`
- Border radius: `4px`
- Focus: border `cocoa-700`, ring 0 (sau ring foarte subtil)
- Font: Inter 16px (16px mobile pentru a evita zoom iOS)

### Card produs
- Background: `ivory-50`
- Border: `0.5px solid stone-200`
- Border radius: `6px`
- Padding: `16px`
- Hover: lift `4px` + scale imagine `1.03`

### Modal precomandă
- Backdrop: `rgba(61, 47, 37, 0.4)` + `backdrop-blur(8px)`
- Container: `ivory-50`, border radius `12px`, padding `40px 32px`
- Animație entrance: slide-up 320ms `cubic-bezier(0.16, 1, 0.3, 1)`
- Trap focus obligatoriu, escape close, return focus la trigger

---

## 7. Motion

Importă din `motion/react`, NU din legacy `framer-motion`:

```ts
import { motion, AnimatePresence } from 'motion/react'
```

### Animații standard

| Element | Durată | Ease | Notes |
|---|---|---|---|
| Hero entrance | 600ms | ease-out | Fade + parallax subtil pe imagine |
| Reveal pe scroll | 80ms stagger | ease-out | Fade-up 24-30px |
| Hover card | 200ms | ease-out | Lift 4px + scale imagine 1.03 |
| Modal | 320ms | cubic-bezier(0.16,1,0.3,1) | Slide-up + backdrop blur |
| Link underline | 240ms | ease-out | Reveal stânga→dreapta, 1px |
| Header scroll | 200ms | ease-out | Devine opac + blur 12px |

### Reguli
- **`prefers-reduced-motion`**: dezactivează parallax, tilt, scale-uri mari. Păstrează doar fade-uri ≤200ms.
- **Nu animăm mai mult de 1 element principal per fold simultan.**
- Hero are entrance, paginile interne au doar reveal pe scroll.

---

## 8. Formulare & GDPR

Două formulare:
- **Precomandă (scurt)** — pe home, înainte de footer, și în modal global.
- **B2B (lung)** — pe `/colaboreaza`, 3 variante per brand (tab-uri desktop, accordion mobile).

### Reguli pentru toate formularele

1. **Două checkbox-uri SEPARATE, NEBIFATE implicit:**
   - Acord GDPR (obligatoriu pentru submit)
   - Opt-in marketing (opțional)
2. Text consimțământ explicit + link `<a>` către `/politica-confidentialitate`.
3. Buton submit **inactiv** până la completarea câmpurilor obligatorii + bifare GDPR.
4. La submit:
   - Salvează în Supabase/Airtable cu **timestamp + IP + versiunea text consimțământ + payload**.
   - Trimite email confirmare la utilizator (pentru opt-in marketing: dublă validare cu link click).
   - Trimite email notificare la `hello@aerabeauty.ro`.
5. Mesaj confirmare pe site, fără reload.
6. Toate input-urile au `<label>` asociat (visible sau `sr-only`).

Textele exacte (labels, placeholders, GDPR text, confirm message, error message) sunt în `docs/03-texte-v1.md` §1.7, §7.4, §9.

---

## 9. Cum lucrezi în acest repo

1. **Înainte de orice task non-trivial**, citește documentul relevant din `docs/`.
2. Folosește `ExitPlanMode` pentru task-uri care implică mai multe fișiere.
3. Branch dedicat pentru fiecare feature (`feat/hero`, `feat/brand-aqua`, `fix/form-validation`).
4. Toate PR-urile au preview Vercel — review-ul vizual se face acolo.
5. Pe componente noi: cere `design:design-critique` la final.
6. Înainte de merge la main pentru pagini importante: rulează `design:accessibility-review`.

---

## 10. Anti-patterns (lista scurtă)

- ❌ Hex direct în className (`bg-[#5B4638]`) — folosește `bg-cocoa-700`.
- ❌ „AERA" ca text live — folosește SVG.
- ❌ `framer-motion` import — folosește `motion/react`.
- ❌ Body text sub 16px mobile.
- ❌ Display font (Bodoni) în formulare, checkout, paragrafe lungi (>3 propoziții).
- ❌ Adjective stivuite în copy.
- ❌ Emoji-uri în UI sau copy.
- ❌ Drop shadows, gradients, glow, neon.
- ❌ Carousel sau tab cu `display: none` care nu respectă focus management.
- ❌ Acord GDPR bifat implicit.
