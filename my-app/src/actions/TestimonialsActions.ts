'use server';

import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";

/**
 * Fetches testimonials from Supabase.
 *
 * @returns A Promise that resolves to an object containing:
 *   - `success`: A boolean indicating whether the fetch was successful.
 *   - `data`: An array of testimonial objects if successful, or `undefined` if an error occurred.
 *   - `error`: An error message if the fetch failed.
 */
export async function getTestimonials() {

    try {
        const supabase = createSupabaseServerClient();
    
        const { data, error } = await supabase
        .from('Testimonials')
        .select()
      
    
        if (error) {
          console.error('Error fetching user information:', error?.message);
          return {success: false, error: 'Error retrieving testimonials.' };
        }
        else{
            return{success: true, data: data}
        }
    
        // Ensure the data conforms to the CustomUser interface
        //const user: CustomUser = data;
      } catch (error) {
        console.error('Unexpected error fetching user information:', error);
        return {success: false, error: 'An unexpected error occurred.' };
      }

}