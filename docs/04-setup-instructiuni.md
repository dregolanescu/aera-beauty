# AERA Beauty — instrucțiuni de setup repo

Pași concreți pentru a porni proiectul pe Claude CLI.

## 1. Inițializează repo-ul Next.js

```bash
npx create-next-app@latest aera-beauty \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --use-npm
cd aera-beauty
```

## 2. Instalează dependențele suplimentare

```bash
npm i motion lucide-react clsx tailwind-merge
npm i -D prettier prettier-plugin-tailwindcss
```

`motion` = succesorul `framer-motion` (același API, package nou).
`clsx` + `tailwind-merge` = pentru helper-ul `cn()` din `lib/utils.ts`.

## 3. Inițializează Git și remote pe GitHub

```bash
git init
git add .
git commit -m "chore: init Next.js + Tailwind + motion"

# Creează repo pe GitHub (privat inițial), apoi:
git remote add origin git@github.com:<user>/aera-beauty.git
git branch -M main
git push -u origin main
```

## 4. Conectează la Vercel

- vercel.com → New Project → Import GitHub repo `aera-beauty`
- Framework Preset: Next.js (auto)
- Build & Output: default
- Environment variables: adaugăm la pasul cu formulare (Resend API key, Supabase URL etc.)
- Custom domain: `aerabeauty.ro` (configurare DNS — record CNAME spre `cname.vercel-dns.com`)

## 5. Mută documentele din workspace Cowork în repo

Din folderul tău local `C:\Users\drago\OneDrive\Documents\Claude\Projects\AERA Beauty\`, mută:

```
docs/
├── 01-sitemap.md
├── 02-design-tokens.md
└── 03-texte-v1.md

CLAUDE.md                 → în root-ul repo-ului

skill-aera-beauty/        → mută la .claude/skills/aera-beauty/
└── SKILL.md
```

În Windows (PowerShell):
```powershell
mkdir docs
mv "01-sitemap.md", "02-design-tokens.md", "03-texte-v1.md" docs/
mkdir .claude\skills\aera-beauty
mv skill-aera-beauty\SKILL.md .claude\skills\aera-beauty\
rmdir skill-aera-beauty
```

## 6. Copiază asset-urile

Din `C:\Users\drago\Downloads\WEBSITE AERA\MATERIALE CLIENT\`:

```
public/
├── logo/
│   ├── aera-beauty-mocha.svg    (din LOGO AERA BEAUTY-01.svg, mocha cum e deja)
│   ├── aera-beauty-ivory.svg    (variantă ivory pe mocha — îl creezi tu dintr-un export)
│   ├── aera-beauty-mark.svg     (mark izolat, doar "A" — îl creezi tu)
│   ├── aqua-mineral-logo.svg    (din PRODUSE/AQUA MINERAL/LOGO AQUA MINERAL/Aqua New Logo-01.svg)
│   ├── oliere-paris-logo.svg    (din PRODUSE/OLIERE/LOGO OLIERE/logo_vector_oliere.svg)
│   └── redefine-matcha-logo.svg (din PRODUSE/REDEFINE/LOGO REDEFINE/LOGO REDEFINE_1.png — sau cel mai potrivit)
└── products/
    ├── aqua/                    (toate pack-shot-urile Aqua, redenumite kebab-case)
    ├── oliere/                  (idem Oliere)
    └── redefine/                (idem Redefine)
```

Convenție denumire produse: `lower-kebab-case.jpg` (ex: `youth-essence-serum.jpg`, `oliere-color-eclat-shampoo.jpg`).

## 7. Pornește Claude Code în repo

```bash
cd aera-beauty
claude
```

Verifică în CLI că vede:
- `CLAUDE.md` (citit automat la fiecare conversație)
- Skill `aera-beauty` (verifică cu `/skills` în CLI)
- Skill-urile globale `UI UX Pro Max` și `design:*` (dacă instalate)

## 8. Primul task pentru Claude Code (sugerat)

> Citește `docs/01-sitemap.md`, `docs/02-design-tokens.md` și `CLAUDE.md`. Apoi setează design system-ul: `tailwind.config.ts` cu tokens-urile mele, `app/fonts.ts` cu Bodoni Moda + Noto Serif Display + Inter, `app/globals.css` cu clasele responsive `.hero-title`, `.page-title`, `.section-title`, `.body`, `.eyebrow` folosind `clamp()`. Apoi creează un layout placeholder cu Header și Footer goale, și o pagină home cu doar Hero static (titlu + sub-titlu + CTA), ca să confirmăm că fontele și paleta funcționează. Folosește skill-ul `aera-beauty` pentru reguli.

După ce funcționează asta, mergi pe rând: brand pages, formular precomandă, formulare B2B, pagini legale, polish, deploy.

## 9. Configurări env (le adăugăm când ajungem)

```
RESEND_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NOTIFY_EMAIL=hello@aerabeauty.ro
NEXT_PUBLIC_SITE_URL=https://aerabeauty.ro
```
