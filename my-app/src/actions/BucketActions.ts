/**
 * Any functions that need to call the Bucket Storage from Supabase
 */
'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";
import { decode } from 'base64-arraybuffer'
import { randomUUID, UUID } from "crypto";



/**
 * Inserts a profile picture to the bucket storage
 */

export async function uploadProfilePicture(image_name: string, file_image: string) {

  try {
    const supabase = createSupabaseServerClient();

    //generate a UUID to attach the image
    const uuid = randomUUID();

    const new_image_path = image_name+uuid;

    //upload file to supabase bucket
    const { data, error } = await supabase
    .storage
    .from('testimonials_images')
    .upload(`${new_image_path}`, decode(file_image), {
      contentType: 'image/png'
  })

  if (error) {
    console.error('Error uploading profile picture:', error?.message);
    return {success: false, error: 'Error uploading profile picture.' };
  }
  else{
    return{success: true, data: data}

  }
    
  } catch (error) {
    console.error('Unexpected error fetching user information:', error);
    return {success: false, error: 'An unexpected error occurred.' };  
  }
}

/**
 * Function to get the signed URL of a profile picture
 * @param image_path 
 */
export async function getPublicURL(image_name: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data } = supabase
    .storage
    .from('testimonials_images')
    .getPublicUrl(`${image_name}`)

    if(data) {
      return{success: true, data: data}
    } else {
      return {success: false, error: 'Could not retrieve URL to profile picture'};

    }

  } catch (error) {
    console.error('Unexpected error fetching profile picture URL:', error);
    return {success: false, error: 'An unexpected error occurred.' };  
  }
}