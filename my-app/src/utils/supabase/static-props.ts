import { createClient as createClientPrimitive } from '@supabase/supabase-js'
/**
 * Runs at build time, where there is no user, session, or cookies.
 * @returns supabase client
 */
export function createClient() {
  const supabase = createClientPrimitive(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabase
}