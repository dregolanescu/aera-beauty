# AERA Beauty — Context Claude Code

Site de prezentare premium pentru **AERA Beauty** (SC AERA SCENTT SRL), reprezentantul exclusiv în România al trei branduri: **Aqua Mineral** (skincare cu minerale din Marea Moartă), **Oliere Paris** (haircare profesional cu uleiuri naturale), **Redefine Matcha** (haircare cu extract de matcha).

**Status v1:** site de prezentare, fără e-commerce. Magazinul online se adaugă în ~2-3 săptămâni după lansarea v1 — arhitectura trebuie să-l acomodeze natural.

**Limbă:** doar română, cu diacritice complete.
**Domeniu:** `aerabeauty.ro` (cumpărat). Toate URL-urile canonice și OG URLs trebuie să folosească `https://aerabeauty.ro`. Email-uri funcționale pe acest domeniu (`office@aerabeauty.ro`, `gdpr@aerabeauty.ro` — TBD configurare).

**Documente de referință** (toate în root-ul repo-ului):
- `docs/01-sitemap.md` — arhitectura paginilor și sectionarea
- `docs/02-design-tokens.md` — paletă, tipografie, motion, scară responsive completă
- `docs/03-texte-v1.md` — toate textele site-ului (hero, brand, produse, microcopy, SEO meta)

**Skill-uri de invocat:**
- **`aera-beauty`** (`.claude/skills/aera-beauty/`) — invocă pentru orice lucru care atinge design, componente, copy, brand voice. Conține regulile critice.
- **`UI UX Pro Max`** (instalat global pe CLI) — invocă pentru decizii UI/UX, layout, micro-interacțiuni.
- **`design:design-critique`** — la final pe fiecare pagină importantă, pentru review structurat.
- **`design:accessibility-review`** — înainte de lansare, audit WCAG 2.1 AA.

---

## Stack

- **Next.js 15+** (App Router, TypeScript, React Server Components default)
- **Tailwind CSS 4** (config în `tailwind.config.ts`, tokens în `02-design-tokens.md`)
- **`motion`** (succesor `framer-motion`) — `npm i motion` — animații pentru hero, reveal pe scroll, hover, modal
- **`next/font/google`** — Bodoni Moda + Noto Serif Display + Inter cu subset `latin` și `latin-ext`
- **`@21st-extentions/toolbar`** + componentele 21st.dev — discutate la nevoie cu Dragos
- **Resend** — emailuri de notificare formulare (TBD)
- **Supabase** sau **Airtable** — stocare lead-uri + audit GDPR (TBD)
- **Vercel** — hosting + preview deploy-uri pe fiecare PR
- **GitHub** — repo + CI

---

## Structura folderelor

```
.
├── app/
│   ├── (marketing)/              # Group fără layout-shift
│   │   ├── page.tsx              # Home /
│   │   ├── despre/page.tsx       # Despre /despre
│   │   ├── produse/
│   │   │   ├── page.tsx          # Hub /produse
│   │   │   ├── aqua-mineral/page.tsx
│   │   │   ├── oliere-paris/page.tsx
│   │   │   └── redefine-matcha/page.tsx
│   │   ├── colaboreaza/page.tsx
│   │   ├── politica-confidentialitate/page.tsx
│   │   ├── termeni-si-conditii/page.tsx
│   │   └── cookies/page.tsx
│   ├── api/
│   │   ├── precomanda/route.ts   # Endpoint formular scurt
│   │   └── colaborare/route.ts   # Endpoint formulare B2B
│   ├── fonts.ts                  # Next.js font loading
│   ├── layout.tsx
│   ├── globals.css
│   └── opengraph-image.tsx       # OG dinamic
├── components/
│   ├── ui/                       # Componente primitive (Button, Input, Modal, Sheet)
│   ├── layout/                   # Header, Footer, Container
│   ├── home/                     # Secțiuni specifice home (Hero, BrandTriptych etc.)
│   ├── brand/                    # Componente reutilizate pe paginile de brand
│   ├── forms/                    # PrecomandaForm, B2BForm (cu sub-variante per brand)
│   └── motion/                   # Wrappere motion (FadeIn, Stagger, ParallaxImage)
├── content/                      # Texte și date statice
│   ├── products.ts               # Listă completă produse cu meta
│   ├── brands.ts                 # Date despre branduri
│   └── seo.ts                    # Meta SEO per pagină
├── lib/
│   ├── gdpr.ts                   # Logică audit log GDPR
│   ├── email.ts                  # Wrapper Resend
│   └── utils.ts                  # cn() etc.
├── public/
│   ├── logo/                     # SVG-uri AERA + sub-branduri
│   ├── products/                 # Pack-shots optimizate (Next.js Image)
│   └── ambient/                  # Imagini lifestyle (TBD de la client)
├── docs/                         # Documentele de planificare
├── .claude/skills/aera-beauty/   # Skill custom
└── CLAUDE.md                     # Acest fișier
```

---

## Comenzi de bază

```bash
npm install            # Setup
npm run dev            # Dev server (localhost:3000)
npm run build          # Build producție
npm run lint           # Lint
npm run type-check     # TS check
npm run format         # Prettier
```

CI: lint + type-check + build pe fiecare PR (GitHub Actions).

---

## Convenții cod

### Component naming
- PascalCase pentru componente (`ProductCard.tsx`)
- camelCase pentru helperi (`formatProductName.ts`)
- kebab-case pentru rute (`oliere-paris`)

### Server vs Client Components
- **Default: Server Components.** Tot ce nu are nevoie de interactivitate stă server.
- `'use client'` doar unde e necesar: formulare, modale, animații motion interactive, hover state-uri complexe.
- Formularele sunt client; trimit via Server Action sau fetch la `/api/...`.

### Tailwind
- Folosește **tokens custom** din `tailwind.config.ts` (`cocoa-700`, `cream-100`, etc.) — NU hex direct în className.
- Pentru tipo: folosește clasele custom `.hero-title`, `.page-title`, `.section-title`, `.body`, `.eyebrow` definite în `globals.css` cu `clamp()`. NU hardcode `text-5xl` pe titluri editoriale — scara responsive e fluidă, nu discrete.
- Spațiere: folosește `gap-`/`space-y-` cu rem (`gap-8`, `space-y-24`); evită `px-` arbitrare.

### Motion
- Importă din `motion/react`, NU din legacy `framer-motion`:
  ```ts
  import { motion, AnimatePresence } from 'motion/react'
  ```
- Wrapere comune în `components/motion/`: `<FadeIn>`, `<Stagger>`, `<ParallaxImage>`, `<RevealOnScroll>`.
- Respect `prefers-reduced-motion`: în reduced motion, dezactivăm parallax + tilt, păstrăm doar fade scurt.

### Imports order
1. React / Next
2. Third-party (motion, lucide, etc.)
3. `@/components/...`
4. `@/lib/...`
5. `@/content/...`
6. CSS

---

## Reguli dure (nu negociem la build)

1. **Logo AERA = SVG asset, niciodată text live.** Nu scriem niciodată "AERA" sau "AERA BEAUTY" ca text. Folosim `<svg>` inline sau `<Image>` cu varianta corespunzătoare (mocha pe cream, ivory pe mocha).
2. **Paleta strictă.** Doar tokens-urile din `02-design-tokens.md`. Niciun hex inventat. Accente brand (teal, olive, matcha) doar pe paginile brandului respectiv.
3. **Buton primar = mocha pe cream.** Excepție unică: pagina Redefine Matcha — butonul primar e matcha (#7A8B5C).
4. **Tipografie:** Bodoni Moda pentru display (hero, titluri), Inter pentru body & UI, Noto Serif Display ca display secundar pentru zone clinice (ingrediente, tehnologii ™). Niciodată Bodoni pe checkout sau pe paragrafe lungi.
5. **Body minimum 16px pe mobile, 17-18px pe desktop.** Scara responsive din `02-design-tokens.md` cu `clamp()`.
6. **Sentence case** peste tot, excepție eyebrow + button caps și logo-ul SVG.
7. **Adresare cu „tu"** în toate textele, nu „dumneavoastră".
8. **Diacritice complete** (ș, ț, ă, â, î) peste tot, inclusiv în input placeholders și mesaje de eroare.
9. **No emojis** în UI sau copy.

---

## GDPR & formulare (critic)

Toate formularele (precomanda + 3 B2B) trebuie să:

- Aibă **două checkbox-uri SEPARATE** și nebifate implicit:
  - Acord GDPR (obligatoriu pentru submit)
  - Opt-in marketing (opțional, separat de GDPR)
- Aibă text consimțământ explicit cu link clickabil către `/politica-confidentialitate`.
- **Logheze pentru audit GDPR**: timestamp + IP + versiunea textului consimțământ + payload anonimizat — stocate în Supabase/Airtable.
- Aibă **buton inactiv** până la completarea câmpurilor obligatorii + bifare GDPR.
- Trimită email de confirmare la utilizator (pentru opt-in marketing: dublă validare cu link click).
- Returneze mesaj de confirmare clar pe site după submit, fără reload.

Textele exacte pentru consimțământ sunt în `03-texte-v1.md`.

---

## Performance budget

- **LCP < 2.0s** pe 4G (target premium).
- **CLS < 0.05** (layout-shift zero — fontele variable + dimensiuni explicite la imagini).
- **TBT < 200ms** pe pagini de brand.
- **JS bundle:** < 100kb gzipped per pagină (Server Components default ajută).
- **Imagini:** `next/image` cu `priority` doar pe hero, restul lazy. Format AVIF/WebP.
- **Fonts:** subset `latin` + `latin-ext` obligatoriu, `display: swap`, preload doar pe Bodoni Moda 400.

---

## Accesibilitate

- **WCAG 2.1 AA** mandatoriu (audit cu skill `design:accessibility-review` înainte de lansare).
- Contrast: mocha (#5B4638) pe cream (#F5EFE7) trece AA pentru body. Pentru text mic pe accente, verifică cu tool.
- Focus visible pe tot ce e tab-abil — ring mocha 2px offset 2px.
- Modale: trap focus + escape close + `aria-modal="true"` + return focus la trigger.
- `prefers-reduced-motion`: dezactivează parallax, tilt, scale-uri mari; păstrează doar fade-uri ≤200ms.
- Toate imaginile au `alt` descriptiv (excepție decorative cu `alt=""`).
- Toate input-urile au `<label>` asociat.

---

## Workflow Dragos × Claude Code

- **Decizii de produs și conținut** se iau în Cowork mode cu Dragos (conversațiile mari, scenarii, copy review).
- **Execuția** se face în Claude Code. Pe fiecare task non-trivial:
  1. Citește documentele relevante (`docs/*.md`).
  2. Invocă skill-ul `aera-beauty` la nevoie.
  3. Creează plan scurt (`ExitPlanMode`) pentru task-uri mai mari.
  4. Implementează în branch dedicat, PR cu preview Vercel.
- **Reviews vizuale** se fac pe preview URL-ul Vercel, nu pe localhost.

---

## TBD (urmează în următoarele iterații)

- Configurare DNS + mailboxes pentru `aerabeauty.ro` (`hello@`, `gdpr@`, `colaborari@`?)
- Telefon și WhatsApp oficial AERA
- CUI și adresă sediu SC AERA SCENTT SRL
- Conturi social media (Instagram, Facebook, TikTok)
- Materiale foto ambient/lifestyle (avem doar pack-shot)
- Texte legale finalizate de avocat (avem doar schelete)
- Confirmare client pe descrierile individuale de produs
- Decizie cookies: Plausible (no-cookies) vs. Google Analytics + Meta Pixel
- Decizie CMS: hardcoded sau Sanity/Decap (deocamdată hardcoded)
