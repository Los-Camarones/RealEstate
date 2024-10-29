/**
 * Any functions that need to manage content in Supabase
 */
'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";

/**
 * Inserts new content into the images table
 * @param section - The section where the image will be used
 * @param imageUrl - The URL of the image
 * @param altText - The alt text for the image
 */
export async function addImageContent(section: string, imageUrl: string, altText: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('images')
      .insert([{ section, image_url: imageUrl, alt_text: altText }]);

    if (error) {
      console.error('Error adding image content:', error.message);
      return { success: false, error: 'Error adding image content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error adding image content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Inserts new text content into the text_content table
 * @param section - The section where the text will be used
 * @param headingText - The heading text for the section
 * @param paragraphText - The paragraph text for the section
 */
export async function addTextContent(section: string, headingText: string, paragraphText: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('text_content')
      .insert([{ section_text: section, heading_text: headingText, paragraph_text: paragraphText }]);

    if (error) {
      console.error('Error adding text content:', error.message);
      return { success: false, error: 'Error adding text content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error adding text content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Retrieves content from the images table by section
 * @param section - The section to filter images
 */
export async function getImageContentBySection(section: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('section', section);

    if (error) {
      console.error('Error fetching image content:', error.message);
      return { success: false, error: 'Error fetching image content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching image content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Retrieves text content from the text_content table by section
 * @param section - The section to filter text content
 */
export async function getTextContentBySection(section: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('text_content')
      .select('*')
      .eq('section_text', section);

    if (error) {
      console.error('Error fetching text content:', error.message);
      return { success: false, error: 'Error fetching text content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching text content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Updates existing text content in the text_content table
 * @param id - The ID of the text content to update
 * @param headingText - The updated heading text
 * @param paragraphText - The updated paragraph text
 */
export async function updateTextContent(id: number, headingText: string, paragraphText: string) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('text_content')
      .update({ heading_text: headingText, paragraph_text: paragraphText })
      .eq('id', id);

    if (error) {
      console.error('Error updating text content:', error.message);
      return { success: false, error: 'Error updating text content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error updating text content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Deletes content from the images table by ID
 * @param id - The ID of the image content to delete
 */
export async function deleteImageContent(id: number) {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting image content:', error.message);
      return { success: false, error: 'Error deleting image content.' };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error deleting image content:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
