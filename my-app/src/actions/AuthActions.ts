/**
 * This file serves for actions related to user authentication and authorization, including:
 * - Logging in users
 * - Creating new accounts
 * - Checking authorization
 * 
 * All actions are performed securely on the server side.
 * 
 * **Use Case: Schedule a Tour Feature**
 * This setup ensures that only authenticated users can access sensitive features like scheduling a tour.
 * The user must be logged in to access the scheduling form, ensuring a secure and personalized experience.
 */

'use server';

import { createSupabaseServerClient } from '../utils/supabase/supabaseServer';
import { cookies } from 'next/headers'; // For handling cookie management securely
import { User, Session } from '@supabase/supabase-js'; // Importing relevant Supabase types

// Type definition for user data in our custom schema
export interface CustomUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

/**
 * Handles the creation of an account for a user.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{ success: boolean; userID?: string; errorMessage?: string }>}
 * 
 * **Usage**: Allows new users to create an account before accessing features like scheduling a tour.
 * **Future Considerations**: Add email verification step to enhance security and ensure valid registrations.
 */
export async function signUp(email: string, password: string): Promise<{ success: boolean; userID?: string; errorMessage?: string }> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Error signing up:', error.message);
    return {
      success: false,
      errorMessage: error.message
    };
  }

  return {
    success: true,
    userID: data.user?.id
  };
}

/**
 * Handles the sign-in function for a user.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{ success: boolean; userID?: string; errorMessage?: string }>}
 * 
 * **Usage**: Authenticate users to provide access to protected features like scheduling a tour.
 * **Future Considerations**: Implement multi-factor authentication for enhanced security.
 */
export async function signIn(email: string, password: string): Promise<{ success: boolean; userID?: string; errorMessage?: string }> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error signing in:', error.message);
    return {
      success: false,
      errorMessage: error.message
    };
  }

  return {
    success: true,
    userID: data.user?.id
  };
}

/**
 * Handles the sign-out function for a user.
 * @returns {Promise<{ success: boolean; errorMessage?: string }>}
 * 
 * **Usage**: Logs the user out and clears session data, preventing unauthorized access to protected features.
 * **Future Considerations**: Ensure that all client-side caches and states related to the session are cleared.
 */
export async function signOut(): Promise<{ success: boolean; errorMessage?: string }> {
  const supabase = createSupabaseServerClient();

  // Fetch current user to ensure there's an active session
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('Error fetching user or user not logged in:', authError?.message);
    return {
      success: false,
      errorMessage: authError?.message || 'User is not logged in.'
    };
  }

  // Perform sign-out and clear session cookies
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return {
      success: false,
      errorMessage: error.message
    };
  }

  // Clear session-related cookies securely to fully invalidate the session
  cookies().delete('sb-access-token'); // Clear access token cookie
  cookies().delete('sb-refresh-token'); // Clear refresh token cookie

  return {
    success: true
  };
}

/**
 * Retrieves the user ID from the Supabase authentication, validating the session and token securely.
 * @returns {Promise<{ success: boolean; userId?: string; message?: string }>}
 * 
 * **Usage**: Used by the Schedule a Tour feature to confirm that the user is authenticated before allowing access.
 * **Future Considerations**: Expand to include role checks for finer-grained authorization controls (e.g., admin vs regular user).
 */
export async function getUserID(): Promise<{ success: boolean; userId?: string; message?: string }> {
  const supabase = createSupabaseServerClient();

  try {
    // Fetch the current session to validate the access token
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      console.error('Error fetching session or session is not found:', sessionError?.message);
      return { success: false, message: sessionError?.message || 'No active session found.' };
    }

    // Fetch user details from Supabase Auth using the session token
    const { data: { user }, error: authError } = await supabase.auth.getUser(sessionData.session.access_token);

    if (authError || !user) {
      console.error('Error validating user with session token:', authError?.message);
      return { success: false, message: authError?.message || 'Invalid session or user not found.' };
    }

    // Further validate against your custom database if needed
    const { data, error } = await supabase
      .from('Users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      console.error('User does not exist in custom database:', error?.message);
      return { success: false, message: 'User not found in the database.' };
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Unexpected error during user authentication check:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

/**
 * Function to insert new users into our custom schema.
 * @param {string} email - User's email address
 * @param {string} fName - User's first name
 * @param {string} lName - User's last name
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<{ success: boolean; userId?: string; errorMessage?: string }>}
 * 
 * **Usage**: After authenticating, new users are added to the custom Users schema to personalize features like scheduling a tour.
 * **Future Considerations**: Integrate with CRM or other systems for extended user management and marketing purposes.
 */
export async function insertNewUser(email: string, fName: string, lName: string, phoneNumber: string): Promise<{ success: boolean; userId?: string; errorMessage?: string }> {
  const supabase = createSupabaseServerClient();

  try {
    const userResult = await getUserID();
    if (!userResult.success) {
      console.error('Error getting user ID:', userResult.message);
      return { success: false, errorMessage: userResult.message };
    }

    const { userId } = userResult;

    // Insert user into the custom Users schema
    const { data, error } = await supabase
      .from('Users')
      .insert({
        id: userId,
        firstName: fName,
        lastName: lName,
        phoneNumber,
        email
      });

    if (error) {
      console.error('Error inserting new user:', error.message);
      return { success: false, errorMessage: error.message };
    }

    return { success: true, userId };
  } catch (error) {
    console.error('Unexpected error inserting new user:', error);
    return { success: false, errorMessage: 'An unexpected error occurred.' };
  }
}

/**
 * Gets the user information via SQL query from the custom Users table.
 * @returns {Promise<CustomUser | { error: string }>}
 * 
 * **Usage**: Used to retrieve and display personalized information on the Schedule a Tour page and other features.
 * **Future Considerations**: Expand the data retrieved to include more user preferences or profile settings to enhance user experience.
 */
export async function getUserInformation(): Promise<CustomUser | { error: string }> {
  const supabase = createSupabaseServerClient();

  try {
    const userResult = await getUserID();
    if (!userResult.success) {
      console.error('Error getting user ID:', userResult.message);
      return { error: userResult.message || 'User ID not found.' };
    }

    const { userId } = userResult;

    const { data, error } = await supabase
      .from('Users')
      .select('firstName, lastName, email, phoneNumber')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching user information:', error?.message);
      return { error: 'Error fetching user information or user not found.' };
    }

    // Ensure the data conforms to the CustomUser interface
    const user: CustomUser = data;
    return user;
  } catch (error) {
    console.error('Unexpected error fetching user information:', error);
    return { error: 'An unexpected error occurred.' };
  }
}

/**
 * Sends a password request to user's email
 * @param email 
 * @returns 
 */
export async function sendResetPasswordRequest(email: string)
{
  const supabase = createSupabaseServerClient();

  try{
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    //handle error
    if(error)
    {
      return {success: false, error: 'Error reseting password.'}
    }
    else
    {
      return {success: true}

    }

  }
  catch(error)
  {
    return {success: false,  error: 'An unexpected error occurred.' };

  }
}

/**
 * Updates a user's password
 * @param password 
 * @returns 
 */
export async function updatePassword(password: string)
{
  const supabase = createSupabaseServerClient();

  try{

    //update the user's password
    const { data, error } = await supabase.auth.updateUser({password: password});

    if(error)
    {
      console.log(error);
      return{success: false, error: 'Could not update password'}
    }
    else
    {
      return{
        success: true,
        userID: data.user?.id
      }

    }
    
  }
  catch(error)
  {
    return {success: false,  error: 'An unexpected error occurred.' };

  }

}