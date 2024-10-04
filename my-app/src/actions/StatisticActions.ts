/**
 * This file serves for any CRUD operation on our Statistic table in Supabase.
 */
"use server";

import { createSupabaseServerClient } from "@/utils/supabase/supabaseServer";

/**
 * Function to insert the number of subscribers into the Statistics table
 * @param {number} subscriberCount - Number of subscribers
 * @returns {Promise<{ success: boolean; userId?: string; errorMessage?: string }>}
 *
 */
export async function insertSubscriberCount(subscriberCount: number): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();

  try {
    // Insert user into the custom Users schema
    const { data, error } = await supabase
      .from("Statistics")
      .insert([{ type: "Subscribers", count: subscriberCount }])
      .select();

    if (error) {
      return {
        success: false,
        error: "Error inserting subscriber count" + error.message,
      };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Unexpected error inserting new user:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
