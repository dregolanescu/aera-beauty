-- Tabelă dedicată pentru keep-alive-ul Supabase.
--
-- Scop: două surse independente scriu și citesc aici, ca să genereze activitate
-- REALĂ pe baza de date (planul free pune proiectul pe pauză după 7 zile cu
-- „activitate insuficientă"):
--   id = 1 → GitHub Actions (.github/workflows/supabase-keepalive.yml), la 3 ore
--   id = 2 → Vercel Cron (app/api/cron/supabase-keepalive), din oră în oră
-- Fiecare sursă verifică vechimea rândului celeilalte și dă alarmă dacă aceea tace.
-- Rândul id = 2 e creat de primul upsert al cron-ului de pe Vercel.
--
-- Istoric: un simplu SELECT nu a resetat contorul de „low activity" (ping-uri cu
-- HTTP 200 pe 16 și 20 iul 2026, iar Supabase a pauzat proiectul oricum pe 22 iul).
-- Nici un upsert pe zi n-a fost suficient: avertismente de pauză pe 17 aug și
-- 26 oct 2026. De aici volumul mai mare din v3.
--
-- Nu atingem niciodată `precomenzi` / `colaborari` — alea conțin date GDPR.

create table if not exists public.keepalive (
  id        integer primary key,
  last_ping timestamptz not null default now(),
  source    text
);

-- Rândul actualizat de workflow-ul din GitHub (id = 1).
insert into public.keepalive (id, last_ping, source)
values (1, now(), 'seed')
on conflict (id) do nothing;

-- RLS pornit, fără politici: doar service_role (care bypass-ează RLS) poate
-- scrie aici. Cheia anon/publishable nu are niciun acces.
alter table public.keepalive enable row level security;
