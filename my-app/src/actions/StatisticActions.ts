/**
 * This file serves for any CRUD operation on our Statistic table in Supabase.
 */
"use server";

import { createSupabaseServerClient } from "@/utils/supabase/supabaseServer";
import { IStatistic } from "@/types/database_interface";

/**
 * Function to insert the number of subscribers into the Statistics table
 * @param {number} subscriberCount - Number of subscribers
 * @returns {Promise<{ success: boolean; userId?: string; errorMessage?: string }>}
 *
 */
export async function insertSubscriberCount(
  subscriberCount: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseServerClient();

  try {
    // Insert user into the custom Users schema
    const { data, error } = await supabase
      .from("Statistics")
      .insert([{ type: "Subscribers", count: subscriberCount }]);

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

export async function getSubscribersRows(): Promise<{success: boolean;error?: string;data?: any;}> {
  const supabase = createSupabaseServerClient();

  try {
    //read data from Statistics table
    let { data: Statistics, error } = await supabase
      .from("Statistics")
      .select("*")
      // Filters
      .eq("type", "Subscribers");

    if (error) {
      return {
        success: false,
        error: "Error inserting subscriber count" + error.message,
      };
    } else {
      return { success: true, data: Statistics };
    }
  } catch (error) {
    console.error("Unexpected error inserting new user:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
