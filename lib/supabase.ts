import { createClient } from '@supabase/supabase-js'

/**
 * Supabase server-side client (service role — never expose to client).
 * Returns null if env vars are missing (dev without Supabase configured).
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}
