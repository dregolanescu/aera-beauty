-- AERA Beauty — Supabase schema for lead capture
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

create table public.precomenzi (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  city text,
  brand text not null,
  product text,
  message text,
  marketing_optin boolean not null default false,
  gdpr_accepted_at timestamptz not null,
  gdpr_text_version text not null,
  ip_hashed text,
  user_agent text,
  status text not null default 'new'
);

-- RLS: only service_role can read/write (server-side only, never expose anon key)
alter table public.precomenzi enable row level security;

-- Index for quick lookups
create index idx_precomenzi_email on public.precomenzi (email);
create index idx_precomenzi_brand on public.precomenzi (brand);
create index idx_precomenzi_status on public.precomenzi (status);
create index idx_precomenzi_created on public.precomenzi (created_at desc);
