/**
 * This file serves for actions related to user authentication and authorization, including:
 * - Logging in users
 * - Creating new accounts
 * - Checking authorization
 * 
 * All actions are performed securely on the server side.
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

  // Optionally, handle rate limiting here if needed (e.g., using middleware)
  
  return {
    success: true,
    userID: data.user?.id
  };
}

/**
 * Handles the sign-out function for a user.
 * @returns {Promise<{ success: boolean; errorMessage?: string }>}
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

  // Clear session-related cookies securely
  cookies().delete('sb-access-token'); // Clear access token cookie
  cookies().delete('sb-refresh-token'); // Clear refresh token cookie

  return {
    success: true
  };
}

/**
 * Retrieves the user ID from the Supabase authentication, validating JWT securely.
 * @returns {Promise<{ success: boolean; userId?: string; message?: string }>}
 */
export async function getUserID(): Promise<{ success: boolean; userId?: string; message?: string }> {
  const supabase = createSupabaseServerClient();

  try {
    // Securely fetch user session and validate JWT against Supabase server
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('Error fetching user:', error?.message);
      return { success: false, message: error?.message || 'No user found.' };
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Unexpected error fetching user ID:', error);
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
