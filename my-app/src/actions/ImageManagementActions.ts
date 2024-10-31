/**
 * ImageManagementActions.ts
 * Functions for managing images in Supabase
 */

'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";

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

    if (error) {
      console.error("Error fetching images:", error.message);
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
 * @param file - The image file to upload.
 * @param section - The section where the image will be used.
 * @param page - The page associated with the image.
 */
export async function uploadImageAndUpdateURL(file: File, section: string, page: string) {
  try {
    const supabase = createSupabaseServerClient();

    // Define a unique file path in the bucket based on page and section
    const filePath = `${page}/${section}/${file.name}`;
    
    // Upload the image file to the bucket
    const { error: uploadError } = await supabase.storage
      .from("website_pictures")
      .upload(filePath, file, { upsert: true }); // `upsert` to overwrite any existing file with the same name

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return { success: false, error: "Error uploading image." };
    }

    // Generate a signed URL for the image with a 10-year expiration
    const { data: urlData, error: urlError } = await supabase.storage
      .from("website_pictures")
      .createSignedUrl(filePath, 10 * 365 * 24 * 60 * 60); // 10 years in seconds

    if (urlError) {
      console.error("Error generating signed URL:", urlError.message);
      return { success: false, error: "Error generating signed URL." };
    }

    const imageUrl = urlData.signedUrl;

    // Update the image_url in the images table for the specific page and section
    const { data, error: updateError } = await supabase
      .from("images")
      .update({ image_url: imageUrl })
      .eq("page", page)
      .eq("section", section);

    if (updateError) {
      console.error("Error updating image URL:", updateError.message);
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

    if (deleteError) {
      console.error("Error deleting image from storage:", deleteError.message);
      return { success: false, error: "Error deleting image from storage." };
    }

    // Delete the image metadata from the images table
    const { data, error: dbError } = await supabase
      .from("images")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Error deleting image metadata:", dbError.message);
      return { success: false, error: "Error deleting image metadata from database." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error deleting image:", error);
    return { success: false, error: "An unexpected error occurred while deleting the image." };
  }
}
