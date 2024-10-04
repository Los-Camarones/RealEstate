/**
 * Functionst to call the ihomefinder api
 */
"use server";

/**
 * Function that returns the amount of subscribers from IHomeFinder
 * @returns {Promise<{ success: boolean; subscriberCount?: number; error?: string }>}
 * - If successful, returns an object with { success: true, subscriberCount: number }
 * - If unsuccessful, returns an object with { success: false, error: string }
 */
export async function getSubscriberCount() {
  //check if environment vars are present
  if (!process.env.NEXT_PUBLIC_IHOMEFINDER_USERNAME || !process.env.NEXT_PUBLIC_IHOMEFINDER_PASSWORD) {
    return { sucess: false, error: "Missing API credentials" };
  }
  try {
    //call the api to call HTTP response
    const response = await fetch(
      "https://www.idxhome.com/api/v1/client/subscribers.json",
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.NEXT_PUBLIC_IHOMEFINDER_USERNAME}:${process.env.NEXT_PUBLIC_IHOMEFINDER_PASSWORD}`
          )}`,
        },
      }
    );

    if (!response.ok) {
      console.log(response.status);
      return {
        success: false,
        error:
          "Error fetching subscriber count. Returned status " + response.status,
      };
    } else {
      //parse to json
      let responseData = await response.json();

      //grab the total amount of subscribers currently if it exists
      if (responseData.total && typeof responseData.total === "number") {
        let subscriberCount: number = responseData.total;

        return {
          success: true,
          subscriberCount: subscriberCount,
        };
      } else {
        return {
          success: false,
          error: "Subscriber count not found in response",
        };
      }
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
