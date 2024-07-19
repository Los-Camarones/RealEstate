import { type GetServerSidePropsContext } from 'next'
import { createServerClient, serializeCookieHeader } from '@supabase/ssr'

/**
 * Runs on the server. Reads cookies from the request, which is passed through from GetServerSidePropsContext.
 * @param param0 
 * @returns 
 */
export function createClient({ req, res }: GetServerSidePropsContext) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }))
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          )
        },
      },
    }
  )

  return supabase
}