# Supabase setup pentru AERA Beauty

## Pași

1. **Creează proiect** pe [supabase.com](https://supabase.com) (sau folosește unul existent)

2. **Rulează SQL-ul** din `docs/supabase-setup.sql`:
   - Dashboard > SQL Editor > New query
   - Paste conținutul `supabase-setup.sql`
   - Click Run

3. **Copiază credentials**:
   - Dashboard > Settings > API
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

4. **Adaugă în Vercel**:
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add GDPR_IP_SALT          # orice string random pentru hashing IP
   ```
   Sau manual: Vercel Dashboard > Project > Settings > Environment Variables

5. **Adaugă în `.env.local`** pentru dev:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   GDPR_IP_SALT=un-string-random-pentru-hash
   ```

## Resend (email)

1. Cont pe [resend.com](https://resend.com)
2. Adaugă domeniu `aerabeauty.ro` (DNS verification)
3. API Key → `RESEND_API_KEY`
4. Adaugă în Vercel + `.env.local`

## Fallback

Dacă env vars lipsesc, Server Action funcționează normal dar:
- Fără Supabase: datele sunt logged la console (nu se pierd vizibil, dar nu persistă)
- Fără Resend: emailurile nu se trimit (formularul returnează success)

## Tabel `precomenzi` — coloane

| Coloană | Tip | Note |
|---|---|---|
| id | uuid | PK, auto-generated |
| created_at | timestamptz | auto |
| name | text | obligatoriu |
| email | text | obligatoriu |
| phone | text | opțional |
| city | text | opțional |
| brand | text | aqua-mineral / oliere-paris / redefine-matcha / toate |
| product | text | opțional |
| message | text | max 500 char |
| marketing_optin | boolean | default false |
| gdpr_accepted_at | timestamptz | momentul bifării |
| gdpr_text_version | text | ex: v1-2026-05 |
| ip_hashed | text | SHA256(salt + IP) |
| user_agent | text | browser UA |
| status | text | default 'new', apoi 'contacted', 'closed' |
