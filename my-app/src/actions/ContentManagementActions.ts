/**
 * ContentManagementActions.ts
 * Functions for managing content in Supabase
 */

'use server';
import { createSupabaseServerClient } from "../utils/supabase/supabaseServer";

// Test Supabase connectivity
export async function testSupabaseConnection() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Supabase connection test error:", error.message);
      return { success: false, error: "Failed to connect to Supabase." };
    }

    console.log("Supabase connection test data:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error testing Supabase connection:", error);
    return { success: false, error: "Unexpected error during Supabase connection test." };
  }
}

// Fetch social media links from media_links table
export async function getSocialLinks() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("media_links")
      .select("*");

    if (error) {
      console.error("Error fetching social media links:", error.message);
      return { success: false, error: "Error fetching social media links." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error fetching social media links:", error);
    return { success: false, error: "An unexpected error occurred while fetching social media links." };
  }
}

// Update social media links in media_links table
export async function updateSocialLinks(id: number, url: string) {
    try {
      const supabase = createSupabaseServerClient();
      const { data, error } = await supabase
        .from("media_links")
        .update({ url })
        .eq("id", id);
  
      if (error) {
        console.error("Error updating social link:", error.message);
        return { success: false, error: "Error updating social link." };
      }
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error updating social link:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
  

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

/**
 * Retrieves contact info from the contact_info table
 */
export async function getContactInfo() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("*");

    if (error) {
      console.error("Error fetching contact info:", error.message);
      return { success: false, error: "Error fetching contact info." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error fetching contact info:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Updates contact info in the contact_info table
 * @param id - The ID of the contact info entry to update
 * @param phone - The new phone number
 * @param email - The new email address
 * @param address - The new address
 */
export async function updateContactInfo(id: number, phone: string, email: string, address: string) {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_info")
      .update({ phone, email, address })
      .eq("id", id);

    if (error) {
      console.error("Error updating contact info:", error.message);
      return { success: false, error: "Error updating contact info." };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error updating contact info:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}


/**
 * Retrieves all "About Me" sections from the text_content table
 */
export async function getAllAboutMeSections() {
    try {
      const supabase = createSupabaseServerClient();
  
      const { data, error } = await supabase
        .from('text_content')
        .select('*')
        .like('section_text', 'about_me_section_%'); // Filters only about_me sections
  
      if (error) {
        console.error('Error fetching About Me sections:', error.message);
        return { success: false, error: 'Error fetching About Me sections.' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error fetching About Me sections:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
  

  /**
 * Updates an "About Me" section in the text_content table
 * @param id - The ID of the text content entry to update
 * @param headingText - The new heading text
 * @param paragraphText - The new paragraph text
 */
export async function updateAboutMeSection(id: number, headingText: string, paragraphText: string) {
    try {
      const supabase = createSupabaseServerClient();
  
      const { data, error } = await supabase
        .from('text_content')
        .update({ heading_text: headingText, paragraph_text: paragraphText })
        .eq('id', id);
  
      if (error) {
        console.error('Error updating About Me section:', error.message);
        return { success: false, error: 'Error updating About Me section.' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error updating About Me section:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
  

  /**
 * Retrieves the "Bio" section from the text_content table
 */
export async function getBioSection() {
    try {
      const supabase = createSupabaseServerClient();
  
      const { data, error } = await supabase
        .from('text_content')
        .select('*')
        .eq('section_text', 'Bio'); // Filter for the "Bio" section
  
      if (error) {
        console.error('Error fetching Bio section:', error.message);
        return { success: false, error: 'Error fetching Bio section.' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error fetching Bio section:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
  
  /**
   * Updates the "Bio" section in the text_content table
   * @param id - The ID of the "Bio" section entry to update
   * @param headingText - The new heading text
   * @param paragraphText - The new paragraph text
   */
  export async function updateBioSection(id: number, headingText: string, paragraphText: string) {
    try {
      const supabase = createSupabaseServerClient();
  
      const { data, error } = await supabase
        .from('text_content')
        .update({ heading_text: headingText, paragraph_text: paragraphText })
        .eq('id', id);
  
      if (error) {
        console.error('Error updating Bio section:', error.message);
        return { success: false, error: 'Error updating Bio section.' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error updating Bio section:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
  