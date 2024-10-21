/**
 * Any functions that need to call the Bucket Storage from Supabase
 */
'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";
import { decode } from 'base64-arraybuffer'



/**
 * Inserts a profile picture to the bucket storage
 */

export async function uploadProfilePicture(URL_image: string) {

  try {
    const supabase = createSupabaseServerClient();

    //upload file to supabase bucket
    const { data, error } = await supabase
    .storage
    .from('testimonials_images')
    .upload(URL_image, decode('base64FileData'), {
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