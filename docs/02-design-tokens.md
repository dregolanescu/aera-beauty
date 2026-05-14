# AERA Beauty — Design tokens & moodboard

**Direcție:** editorial premium · mocha cald pe cremă · tipografie de revistă · multă respirație.
**Referințe:** Tatcha, Kjaer Weis, Oliere Paris, Aqua Mineral Thailand.
**Voce vizuală:** mai aproape de o revistă de beauty decât de un e-commerce. Pack-shot-urile produselor sunt deja "fundal alb" → site-ul trebuie să creeze atmosfera prin tipografie, spațiu, mișcare.

---

## 1. Paleta

### Bază (folosită pe tot site-ul)

| Token | Hex | Folosire |
|---|---|---|
| `cocoa-900` | `#3D2F25` | Text emfatic, titluri pe fundal deschis, hover-state pe buton primar |
| `cocoa-700` | `#5B4638` | **Culoare brand principală.** Text body, buton primar, accente |
| `taupe-500` | `#8C7567` | Text secundar, microcopy, etichete eyebrow |
| `stone-200` | `#E8DFD3` | Borduri, separatoare, dividers subțiri |
| `cream-100` | `#F5EFE7` | Background principal pagină |
| `ivory-50` | `#FBF7F0` | Background carduri / containere |
| `white` | `#FFFFFF` | Doar fundal pack-shot produs |

### Accente per brand (folosite parcimonios)

| Brand | Token | Hex | Regulă |
|---|---|---|---|
| Aqua Mineral | `aqua-teal` | `#2C5F6F` | Rar — doar pe iconografia "Marea Moartă" și pin-uri de gamă |
| Oliere Paris | `oliere-olive` | `#6B6F47` | Rar — etichete de gamă, indicatori uleiuri |
| Redefine Matcha | `redefine-matcha` | `#7A8B5C` | Singurul brand cu UI accent — butonul primar pe pagina Redefine e matcha în loc de mocha |

**Reguli importante:**
- Accentele nu apar pe header, footer, formulare globale — doar pe paginile de brand respective.
- Nu se folosesc gradients între accente. Toate culorile flat.
- Texte pe culori brand: pentru contrast accesibil, peste teal/olive/matcha se folosește `ivory-50` (#FBF7F0).

---

## 2. Tipografie

> Bază pentru scara responsive: **Beauty Premium Typography Guide** (uploadat de client) — extinsă și aplicată complet aici. Principiul: nu fonturi mari peste tot, contrastul creează senzația premium — headlines mari și memorabile, body calm și lizibil, labels fine și controlate.

### Display principal — `Bodoni Moda` (Google Fonts, variable)

Pentru hero, page titles, section titles, sub-headlines italic, citate editoriale.

- **Atmosferă:** Classic Didone, High Fashion, Glamorous. Pe linia Tatcha / Vogue / brand-uri italiene premium.
- Variable font cu axă `opsz` (optical size 6–96) — la dimensiuni mari (hero) sus la 96, la dimensiuni mici sub 18. Optical size automată via `font-optical-sizing: auto`.
- Italic foarte expresiv → îl folosim ca accent pe rândul al doilea al titlurilor sau pentru citate.
- Subset: Latin + Latin Extended pentru diacritice românești.

### Display secundar — `Noto Serif Display` (Google Fonts, variable)

Pentru zonele "clinice" — ingrediente, tehnologii brevetate (Renovage™, Resistem™, X50® Hyalufiller, CollaPlant Z NPNF®, PhytoCellTec™ Argan), specificații, FAQ tehnic.

- **Atmosferă:** Modern, Clean, Academic, Global. Mai sobru, mai "laborator".
- Folosirea creează un contrast intenționat între emoție (Bodoni) și rigoare (Noto) — caracteristic site-urilor beauty premium care vând și senzație, și știință.
- Folosit parcimonios; la build decidem exact ce zone. Candidați: blocuri de ingrediente, tabele tehnologie/efect, secțiuni de FAQ tehnice, anexe științifice.

### Body & UI — `Inter` (variable)

Sans curat, neutru, premium. Doar weights 400 și 500. Latin Extended pentru diacritice.

### Scară responsive completă

| Rol | Mobile | Tablet | Desktop | Line-height | Letter-spacing | Font | Folosire |
|---|---|---|---|---|---|---|---|
| **Hero H1** | 38–48px | 56–72px | 72–96px | 0.95–1.05 | −0.04em | Bodoni Moda | Home, campanii |
| **Page H1** | 32–40px | 44–56px | 56–72px | 1.0–1.1 | −0.035em | Bodoni Moda | Despre, brand, colaborează |
| **H2 / Section** | 26–32px | 34–42px | 40–52px | 1.05–1.15 | −0.025em | Bodoni Moda | Secțiuni mari |
| **H3 / Product block** | 22–24px | 24–30px | 28–36px | 1.1–1.2 | −0.02em | Bodoni Moda | Carduri, gamă |
| **H4 / Card title** | 18–20px | 20–22px | 22–24px | 1.2–1.3 | −0.01em | Bodoni Moda | Produse, ingrediente |
| **Body large / intro** | 18–20px | 20–22px | 21–24px | 1.45–1.6 | 0 | Inter | Sub-headlines, intro |
| **Body normal** | 16px | 16–17px | 17–18px | 1.5–1.65 | 0 | Inter | Descrieri, FAQ, pagini |
| **Small / meta** | 12–13px | 12–13px | 13–14px | 1.35–1.5 | 0 | Inter | Tag-uri, claims |
| **Navigation** | 13–14px | 13–14px | 13–15px | 1.2–1.4 | 0.04em | Inter weight 500 | Header |
| **Buttons** | 14–15px | 14–15px | 14–16px | 1.1–1.2 | 0.10–0.12em | Inter weight 500, caps | CTA |
| **Eyebrow / label** | 11–12px | 12px | 12–13px | 1.2 | 0.10–0.14em | Inter weight 500, caps | Deasupra titlurilor |
| **Footer / legal** | 11–12px | 12px | 12–13px | 1.4–1.6 | 0 | Inter | Notă subsol |

### Wordmark "AERA BEAUTY" — este logo, nu tipografie

Logo-ul original e desenat de client în **Bahnschrift** (font Microsoft, semi-condensed geometric) și livrat ca SVG cu path-uri vectoriale. **Nu se încarcă Bahnschrift pe site.** Logo-ul e tratat ca asset grafic (SVG inline sau `<img>`), nu ca text live.

**Reguli:**
- În header, footer, favicon, OG image, email-uri → folosim mereu SVG-ul real (`LOGO AERA BEAUTY-01.svg` din materialele clientului).
- Nu scriem niciodată "AERA" sau "AERA BEAUTY" ca text live pe site. Mereu SVG.
- Variante necesare: SVG full color (mocha #5B4638), SVG ivory (pe fundal mocha — footer dark), favicon 32×32 pătrat (probabil un "A" izolat).

Pereche logo Bahnschrift × tipografie Bodoni Moda + Inter e intenționată: wordmark geometric/sec ↔ tipografie editorială cu contrast mediu-înalt. Aceeași logică ca la Chanel/Celine/multe branduri premium care folosesc un wordmark de un tip și un copy de alt tip.

### Reguli letter-spacing & line-height (rezumat)

- **Titluri mari display:** letter-spacing negativ −0.025em până la −0.045em (textul se "string" în sus, look editorial)
- **Body normal:** 0 (nici negativ, nici pozitiv)
- **Eyebrow / label uppercase:** +0.10em până la +0.14em (clasic "magazine" feel)
- **Button uppercase:** +0.10em până la +0.12em (clar, nu prea spațios)
- **Line-height:** strâns pe titluri (0.95–1.15), generos pe body (1.5–1.65)

### Fluid scaling cu `clamp()` (CSS)

Evităm breakpoint-uri rigide pe titluri. Body și UI rămân pe scale discret.

```css
:root {
  --font-display: 'Bodoni Moda Variable', 'Bodoni Moda', serif;
  --font-display-clinical: 'Noto Serif Display Variable', 'Noto Serif Display', serif;
  --font-body: 'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.375rem, 6.5vw, 6rem);   /* 38px → 96px */
  line-height: 1.0;
  letter-spacing: -0.04em;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4.5rem);       /* 32px → 72px */
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.625rem, 3.5vw, 3.25rem); /* 26px → 52px */
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.product-block-title {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.4vw, 2.25rem); /* 22px → 36px */
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.card-title {
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 1.5vw, 1.5rem);  /* 18px → 24px */
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.body-large {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 1.4vw, 1.5rem);  /* 18px → 24px */
  line-height: 1.55;
}

.body {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.15vw, 1.125rem);   /* 16px → 18px */
  line-height: 1.6;
}

.eyebrow {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: clamp(0.6875rem, 0.85vw, 0.8125rem); /* 11px → 13px */
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.button-label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: clamp(0.875rem, 1vw, 1rem);     /* 14px → 16px */
  line-height: 1.15;
  letter-spacing: 0.10em;
  text-transform: uppercase;
}
```

### Reguli "evită / folosește" (din ghid, adaptate)

**Evităm:**
- Body sub 16px pe mobile, sub 17px pe desktop
- Fonturi ultra-thin pentru texte mici (≤14px)
- Display font în formulare, checkout, paragrafe lungi
- Mai mult de 3-4 weights diferite pe site
- Uppercase peste tot (doar eyebrow + button)
- H1 prea mic pe desktop (ținta noastră: min. 56px pe page H1, 72px pe hero)

**Folosim:**
- Bodoni Moda pentru hero, page titles, section titles, sub-headlines italic
- Inter weights 400 + 500 pentru tot restul
- Letter-spacing negativ subtil la titluri mari
- Letter-spacing pozitiv discret la eyebrow și button (nu exagerăm)
- Line-height generos pe body (1.5–1.65) și strâns pe titluri (0.95–1.15)
- `clamp()` pentru titluri, breakpoint-uri discrete doar pentru body

### Wordmark "AERA BEAUTY" — este logo, nu tipografie

Logo-ul original e desenat de client în **Bahnschrift** (font Microsoft, semi-condensed geometric) și livrat ca SVG cu path-uri vectoriale. **Nu se încarcă Bahnschrift pe site.** Logo-ul e tratat ca asset grafic (SVG inline sau `<img>`), nu ca text live.

**Reguli:**
- În header, footer, favicon, OG image, email-uri → folosim mereu SVG-ul real (`LOGO AERA BEAUTY-01.svg` din materialele clientului).
- Nu scriem niciodată "AERA" sau "AERA BEAUTY" ca text live pe site. Mereu SVG.
- Variante necesare: SVG full color (mocha #5B4638), SVG ivory (pe fundal mocha — footer dark), favicon 32×32 pătrat (probabil un "A" izolat).

Pereche logo Bahnschrift × tipografie Bodoni Moda + Inter e intenționată: wordmark geometric/sec ↔ tipografie editorială cu contrast înalt. Aceeași logică ca la Chanel/Celine/multe branduri premium care folosesc un wordmark de un tip și un copy de alt tip.

---

## 3. Spațiere & layout

- **Container max-width:** 1280px (xl), 1440px (2xl pe hero)
- **Padding lateral:** 24px mobile, 48px tablet, 80px+ desktop
- **Vertical rhythm:** secțiuni mari separate prin 96–128px padding; mici prin 64px
- **Grid produse:** 2 col mobile, 3 col tablet, 4 col desktop max
- **Hover state cards:** lift 4px + scale imagine 1.03

## 4. Forme & borduri

- **Corner radius:** 2px pe butoane (aproape sharp, premium editorial), 4px pe inputs, 6px pe carduri produs, 12px pe modale
- **Border:** mereu 0.5px solid `stone-200`. Niciodată gros.
- **Fără shadows.** Atmosfera vine din spațiu și tipografie, nu din elevation.

## 5. Motion (Framer / `motion` package)

| Element | Animație | Durată | Easing |
|---|---|---|---|
| Hero entrance | Fade-in + parallax subtil pe imagine | 600ms | ease-out |
| Reveal pe scroll | Stagger fade-up 24–30px | 80ms între elemente | ease-out |
| Hover card | Lift 4px + scale imagine 1.03 | 200ms | ease-out |
| Modal precomandă | Slide-up + backdrop blur 8px | 320ms | ease-out cubic-bezier(0.16,1,0.3,1) |
| Carousel produse | Drag inertia + scroll-snap + tilt 2° pe activ | natural | spring |
| Link underline | Reveal stânga→dreapta, grosime 1px | 240ms | ease-out |
| Navigație | Header devine opac la scroll, blur 12px | 200ms | ease-out |

**Reguli motion:**
- `prefers-reduced-motion`: dezactivăm parallax + tilt; păstrăm doar fade-uri scurte.
- Nu animăm mai mult de 1 element principal per fold simultan.
- Hero-ul are entrance, dar paginile interne au doar reveal pe scroll (mai sobru).

---

## 6. Tailwind config (extras pentru implementare)

```js
// tailwind.config.ts — extras pentru theme.extend
{
  colors: {
    cocoa: { 900: '#3D2F25', 700: '#5B4638' },
    taupe: { 500: '#8C7567' },
    stone: { 200: '#E8DFD3' },
    cream: { 100: '#F5EFE7' },
    ivory: { 50: '#FBF7F0' },
    aqua: { teal: '#2C5F6F' },
    oliere: { olive: '#6B6F47' },
    redefine: { matcha: '#7A8B5C' },
  },
  fontFamily: {
    display: ['var(--font-bodoni-moda)', 'serif'],
    'display-clinical': ['var(--font-noto-serif-display)', 'serif'],
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  },
  borderRadius: {
    btn: '2px',
    input: '4px',
    card: '6px',
    modal: '12px',
  },
  letterSpacing: {
    wordmark: '0.14em',
    'wordmark-sm': '0.4em',
    eyebrow: '0.22em',
    cta: '0.12em',
  },
}
```

Fonts încărcate via `next/font/google` (Bodoni Moda + Noto Serif Display + Inter, variable, subset latin + latin-ext pentru diacritice românești). Configurare:

```ts
// app/fonts.ts
import { Bodoni_Moda, Noto_Serif_Display, Inter } from 'next/font/google'

export const bodoniModa = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-bodoni-moda',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-noto-serif-display',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
})
```

Aplicare în `layout.tsx`:

```tsx
<html lang="ro" className={`${bodoniModa.variable} ${notoSerifDisplay.variable} ${inter.variable}`}>
```

Checklist pre-lansare tipografie (din ghid):
- [ ] Body text minimum 16px pe mobile (verificat în devtools la 360px, 390px)
- [ ] Headlines testate pe 360px, 390px, 768px, 1440px, 1920px
- [ ] Contrast mocha pe cremă verificat cu WCAG AA tool (toate combinațiile)
- [ ] Niciun display font în formulare, checkout, paragrafe lungi
- [ ] Maximum 3-4 weights de font pe site (avem 4: Noto 400 + 400 italic, Inter 400 + 500)
- [ ] Butoane clare, nu "luxury thin"

---

## Decizii deschise

- Ai vreo referință de site din lifestyle/beauty pe care vrei să o sondez și să o adaug aici? (alta decât Tatcha/Kjaer Weis)
- Vrem ca paginile de brand să difere mai marcat între ele (background variation, motiv vizual diferit), sau coerența totală a paletei mocha-cremă e mai importantă pentru "AERA umbrella"?
