-- Tabelă dedicată pentru keep-alive-ul Supabase (GitHub Actions).
--
-- Scop: workflow-ul .github/workflows/supabase-keepalive.yml face zilnic un
-- upsert aici, ca să genereze activitate REALĂ de scriere pe baza de date.
--
-- De ce: un simplu SELECT nu resetează contorul de "low activity" al planului
-- free. Verificat empiric — ping-uri cu HTTP 200 pe 16 și 20 iul 2026, iar
-- Supabase a pauzat proiectul oricum pe 22 iul, exact la 7 zile de la
-- repornirea anterioară.
--
-- Nu atingem niciodată `precomenzi` / `colaborari` — alea conțin date GDPR.

create table if not exists public.keepalive (
  id        integer primary key,
  last_ping timestamptz not null default now(),
  source    text
);

-- Rândul unic pe care îl actualizează workflow-ul (id = 1).
insert into public.keepalive (id, last_ping, source)
values (1, now(), 'seed')
on conflict (id) do nothing;

-- RLS pornit, fără politici: doar service_role (care bypass-ează RLS) poate
-- scrie aici. Cheia anon/publishable nu are niciun acces.
alter table public.keepalive enable row level security;
