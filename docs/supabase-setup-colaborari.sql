-- AERA Beauty — Supabase schema pentru lead-uri B2B (colaborări)
-- Rulează în Supabase SQL Editor (Dashboard > SQL Editor > New query)

create table public.colaborari (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Brand vizat
  brand text not null check (brand in ('aqua-mineral', 'oliere-paris', 'redefine-matcha')),

  -- Date contact
  name text not null,
  email text not null,
  phone text,
  city text,

  -- Profil (single-select, value din colaborare-forms.ts)
  profile text not null,
  profile_other text, -- pentru "Altul" cu input liber

  -- Multi-select: array de slug-uri
  interest jsonb not null default '[]'::jsonb,
  products jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,

  -- Follow-up preferat (whatsapp | email | telefon)
  follow_up text not null check (follow_up in ('whatsapp', 'email', 'telefon')),

  -- Mesaj liber (opțional)
  message text,

  -- GDPR & marketing
  marketing_optin boolean not null default false,
  gdpr_accepted_at timestamptz not null,
  gdpr_text_version text not null,

  -- Audit
  ip_hashed text,
  user_agent text,

  -- Stare lead (new / contacted / qualified / closed)
  status text not null default 'new'
);

-- RLS: doar service_role (server-side only, niciodată cheia anon)
alter table public.colaborari enable row level security;

-- Index-uri pentru filtrare rapidă
create index idx_colaborari_brand on public.colaborari (brand);
create index idx_colaborari_email on public.colaborari (email);
create index idx_colaborari_profile on public.colaborari (profile);
create index idx_colaborari_status on public.colaborari (status);
create index idx_colaborari_created on public.colaborari (created_at desc);
