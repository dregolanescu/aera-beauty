# AERA Beauty

Website de prezentare premium pentru AERA Beauty (SC AERA SCENTT SRL) — reprezentantul exclusiv în România al brandurilor Aqua Mineral, Oliere Paris și Redefine Matcha.

**Domeniu:** [aerabeauty.ro](https://aerabeauty.ro)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (theme inline în `globals.css`)
- `motion` (succesor `framer-motion`) pentru animații
- Bodoni Moda + Noto Serif Display + Inter via `next/font/google`
- Vercel pentru hosting + preview-uri pe PR

## Setup local

```bash
npm install
npm run dev
```

Apoi deschide [http://localhost:3000](http://localhost:3000).

## Comenzi

```bash
npm run dev          # Dev server (cu Turbopack)
npm run build        # Build pentru producție
npm run start        # Pornește build-ul de producție local
npm run type-check   # Verificare TypeScript
```

## Structura proiectului

```
.
├── app/                          # Rute Next.js App Router
│   ├── layout.tsx                # Root layout cu fonts
│   ├── page.tsx                  # Home /
│   ├── globals.css               # Tailwind + tokens + clase tipo
│   └── fonts.ts                  # Bodoni Moda + Noto Serif Display + Inter
├── components/
│   ├── layout/                   # Header, Footer, Logo
│   ├── home/                     # Secțiuni home (Hero etc.)
│   └── ui/                       # Componente primitive (Button etc.)
├── lib/utils.ts                  # Helper cn() pentru className
├── public/
│   └── logo/aera-beauty.svg      # Logo wordmark
├── docs/                         # Documente de planificare
│   ├── 01-sitemap.md
│   ├── 02-design-tokens.md
│   ├── 03-texte-v1.md
│   └── 04-setup-instructiuni.md
├── .claude/skills/aera-beauty/   # Skill custom pentru Claude Code
├── CLAUDE.md                     # Context pentru Claude Code
└── AGENTS.md                     # Notă Next.js 16 pentru agenți AI
```

## Documente

Toate deciziile de design, conținut și implementare sunt în `docs/`. Începe cu `01-sitemap.md`.

## Workflow

Decizii și conținut: Cowork mode cu Dragos. Execuție tehnică: Claude Code (CLI), care citește `CLAUDE.md` automat și invocă skill-ul `aera-beauty` pentru reguli specifice.
