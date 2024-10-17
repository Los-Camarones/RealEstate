'use server';

import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";
import { ITestimonial } from "@/types/database_interface";

/**
 * Fetches testimonials from Supabase.
 * homepage_testimonials: boolean to display only homepage testimonials
 *
 * @returns A Promise that resolves to an object containing:
 *   - `success`: A boolean indicating whether the fetch was successful.
 *   - `data`: An array of testimonial objects if successful, or `undefined` if an error occurred.
 *   - `error`: An error message if the fetch failed.
 */
export async function getTestimonials(homepage_testimonials: boolean) {

    try {
        const supabase = createSupabaseServerClient();

        let result;
        if(homepage_testimonials) {
           result = await supabase
          .from('Testimonials')
          .select()
          .eq('is_displayed', homepage_testimonials ? true : null);
        } else {
           result = await supabase
          .from('Testimonials')
          .select()
        }

        const data = result.data;
        const error = result.error;



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

/**
 * Adds a testimonial to supabase
 * @param testimonial 
 */
export async function addTestimonial(testimonial: ITestimonial) {

  try {
    const supabase = createSupabaseServerClient();

    //add value in supabase
    const { data, error } = await supabase
    .from('Testimonials')
    .insert([
      { created_at: testimonial.created_at || Date.now(), // may change
         rating: testimonial.rating,
         comments: testimonial.comments,
         user_name: testimonial.user_name,
         profile_picture: testimonial.profile_picture,
         is_displayed: testimonial.is_displayed
         },
    ])
    .select()

    if (error) {
      console.error('Error adding testimonial: ', error?.message);
      return {success: false, error: 'Error adding testimonial.' };
    }
    else{
        return{success: true, data: data}
    }

  } catch (error) {
    console.error('Unexpected error fetching user information:', error);
    return {success: false, error: 'An unexpected error occurred.' };
  }

}