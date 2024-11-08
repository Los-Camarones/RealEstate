'use server';

import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";
import { ITestimonial } from "@/types/database_interface";

/**
 * Fetches testimonials from Supabase.
 * @param homepage_testimonials boolean to display only homepage testimonials
 */
export async function getTestimonials(homepage_testimonials: boolean) {
  try {
    const supabase = createSupabaseServerClient();
    let result;
    if (homepage_testimonials) {
      result = await supabase
        .from('Testimonials')
        .select()
        .eq('is_displayed', homepage_testimonials ? true : null);
    } else {
      result = await supabase.from('Testimonials').select();
    }

    const data = result.data;
    const error = result.error;

    if (error) {
      console.error('Error fetching testimonials:', error?.message);
      return { success: false, error: 'Error retrieving testimonials.' };
    }
    return { success: true, data: data };
  } catch (error) {
    console.error('Unexpected error fetching testimonials:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Adds a testimonial to Supabase
 * @param testimonial
 */
export async function addTestimonial(testimonial: ITestimonial) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('Testimonials')
      .insert([
        {
          created_at: testimonial.created_at,
          rating: testimonial.rating,
          comments: testimonial.comments,
          user_name: testimonial.user_name,
          profile_picture: testimonial.profile_picture,
          is_displayed: testimonial.is_displayed,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding testimonial:', error?.message);
      return { success: false, error: 'Error adding testimonial.' };
    }
    return { success: true, data: data };
  } catch (error) {
    console.error('Unexpected error adding testimonial:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Updates a testimonial in Supabase
 * @param testimonial
 */
export async function updateTestimonial(testimonial: ITestimonial) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('Testimonials')
      .update({
        created_at: testimonial.created_at,
        rating: testimonial.rating,
        comments: testimonial.comments,
        user_name: testimonial.user_name,
        profile_picture: testimonial.profile_picture,
        is_displayed: testimonial.is_displayed,
      })
      .eq('id', testimonial.id)
      .select();

    if (error) {
      console.error('Error updating testimonial:', error?.message);
      return { success: false, error: 'Error updating testimonial.' };
    }
    return { success: true, data: data };
  } catch (error) {
    console.error('Unexpected error updating testimonial:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Deletes a testimonial from Supabase by ID
 * @param id
 */
export async function deleteTestimonial(id: string) {
  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase
      .from('Testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error?.message);
      return { success: false, error: 'Error deleting testimonial.' };
    }
    return { success: true };
  } catch (error) {
    console.error('Unexpected error deleting testimonial:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
