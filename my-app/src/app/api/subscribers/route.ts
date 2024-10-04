/**
 * API fetch call that will be called once a week. Scheduled by a CRON job on vercel.
 */
import { getSubscriberCount } from "@/actions/HomeFinderActions";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServer";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export function GET(request: Request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}