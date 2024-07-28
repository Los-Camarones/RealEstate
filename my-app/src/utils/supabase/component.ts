import { createBrowserClient } from '@supabase/ssr'
/**
 * To access Supabase from within components, specifically designed for client-side JavaScript applications running in the browser
 * Better to use supabaseClient.js to create a supabase client.
 * Source: https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=pages
 * 
 * @returns 
 */
export function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabase
}