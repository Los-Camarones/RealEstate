/**
 * API fetch call that will be called once a week. Scheduled by a CRON job on vercel.
 */
import { getSubscriberCount } from "@/actions/HomeFinderActions";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServer";
import { insertSubscriberCount } from "@/actions/StatisticActions";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  try {
    // Call the function to get the subscriber count
    const subscriberRes = await getSubscriberCount();

    // Check if the response is successful and the subscriber count is a number
    if (subscriberRes.success && typeof subscriberRes.subscriberCount === "number") {
      const subscriberCount: number = subscriberRes.subscriberCount;

      // Try inserting the subscriber count into the database
      const insertResponse = await insertSubscriberCount(subscriberCount);

      // If the insert is successful, return a success message
      if (insertResponse.success) {
        return new Response('Inserted Subscriber Successfully', { status: 200 });
      } else {
        console.error("Insert failed:", insertResponse.error);
        return new Response(`Failed to insert subscriber: ${insertResponse.error}`, { status: 500 });
      }

    } else {
      console.error("Subscriber count fetch failed:", subscriberRes.error);
      return new Response(`Failed to fetch subscriber count: ${subscriberRes.error}`, { status: 400 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response('An unexpected error occurred', { status: 500 });
  }
}