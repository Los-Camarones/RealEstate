'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";

/**
 * Logs response details for debugging.
 * @param data - Data returned from Supabase.
 * @param error - Error returned from Supabase, if any.
 * @param operation - Description of the operation being performed.
 */
function logResponseDetails(data: any, error: any, operation: string) {
  if (error) {
    console.error(`Error during ${operation}:`, error.message);
  } else {
    console.log(`Success during ${operation}:`, data);
  }
}

/**
 * Fetches all images for a given section from the images table.
 * @param section - The section to filter images (e.g., "Home", "About Me").
 */
export async function getImageContentBySection(section: string) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("section", section);

    // Log the response details
    logResponseDetails(data, error, "getImageContentBySection");

    if (error) {
      return { success: false, error: "Error fetching images." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error fetching images:", error);
    return { success: false, error: "An unexpected error occurred while fetching images." };
  }
}

/**
 * Uploads a new image to the website_pictures bucket and updates the image URL
 * for the specified page and section in the images table.
 * @param filePath - The file path in the bucket.
 * @param section - The section where the image will be used.
 * @param page - The page associated with the image.
 * @param imageUrl - The base64 encoded image data.
 */
export async function uploadImageAndUpdateURL(filePath: string, section: string, page: string, imageUrl: string) {
  try {
    const supabase = createSupabaseServerClient();

    // Log initial input data
    console.log("Starting upload process...");
    console.log("filePath:", filePath);
    console.log("section:", section);
    console.log("page:", page);

    // Check if the bucket connection is valid
    const { data: bucketData, error: bucketError } = await supabase.storage.from("website_pictures").list();
    logResponseDetails(bucketData, bucketError, "Bucket Connection Check");

    if (bucketError) {
      return { success: false, error: "Error connecting to storage bucket." };
    }

    // Attempt to upload the image to the bucket
    console.log("Attempting to upload the image...");
    const { error: uploadError } = await supabase.storage
      .from("website_pictures")
      .upload(filePath, imageUrl, { upsert: true });
    logResponseDetails(null, uploadError, "Image Upload");

    if (uploadError) {
      return { success: false, error: "Error uploading image to bucket." };
    }

    // Generate a signed URL for the image with a 10-year expiration
    console.log("Generating signed URL...");
    const { data: urlData, error: urlError } = await supabase.storage
      .from("website_pictures")
      .createSignedUrl(filePath, 10 * 365 * 24 * 60 * 60); // 10 years in seconds
    logResponseDetails(urlData, urlError, "Signed URL Generation");

    if (urlError) {
      return { success: false, error: "Error generating signed URL." };
    }

    const generatedImageUrl = urlData?.signedUrl || null;
    if (!generatedImageUrl) {
      return { success: false, error: "Failed to generate a valid signed URL." };
    }

    // Update the image_url in the images table for the specific page and section
    console.log("Updating database with generated URL...");
    const { data, error: updateError } = await supabase
      .from("images")
      .update({ image_url: generatedImageUrl })
      .eq("page", page)
      .eq("section", section);
    logResponseDetails(data, updateError, "Database Update");

    if (updateError) {
      return { success: false, error: "Error updating image URL in database." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error during image upload:", error);
    return { success: false, error: "An unexpected error occurred while uploading the image." };
  }
}

/**
 * Deletes an image from the website_pictures bucket and the images table by ID.
 * @param id - The ID of the image entry in the images table.
 * @param filePath - The file path of the image in the bucket.
 */
export async function deleteImageContent(id: number, filePath: string) {
  try {
    const supabase = createSupabaseServerClient();

    // Delete the image file from the bucket
    const { error: deleteError } = await supabase.storage
      .from("website_pictures")
      .remove([filePath]);
    logResponseDetails(null, deleteError, "Image Deletion from Bucket");

    if (deleteError) {
      return { success: false, error: "Error deleting image from storage." };
    }

    // Delete the image metadata from the images table
    const { data, error: dbError } = await supabase
      .from("images")
      .delete()
      .eq("id", id);
    logResponseDetails(data, dbError, "Image Metadata Deletion from Database");

    if (dbError) {
      return { success: false, error: "Error deleting image metadata from database." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error deleting image:", error);
    return { success: false, error: "An unexpected error occurred while deleting the image." };
  }
}
