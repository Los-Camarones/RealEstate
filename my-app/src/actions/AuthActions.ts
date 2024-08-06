/**
 * This file serves for any actions that revolve around user authentication and authorization. These include:
 * Loggin in users
 * Creating new accounts
 * Checking for authorization
 * 
 */
'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import createClient  from '../utils/supabase/supabaseClient'
import supabase from '../utils/supabase/supabaseClient';


/**
 * Handles the creation of an account for a user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - A promise that resolves to the newly created user or rejects with an error.
 */
export async function signUp(email: string, password: string)
{
  //call supabase
  const {data, error} = await supabase.auth.signUp({email, password})

  if (error) {
    return{
      success: false,
      errorMessage: error.message
    };
  }
  else
  {
    return{
      success: true,
      userID: data.user?.id
    }
  }
}

/**
 * Handles the sign in function for a user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - A promise that resolves to the sign-ind user or rejects with an error.
 */
export async function signIn(email: string, password: string) {

  const {data, error} = await supabase.auth.signInWithPassword({email, password})

  if (error) {
    return{
      success: false,
      errorMessage: error.message
    };
  }
  else
  {
    return{
      success: true,
      userID: data.user.id
    }
  }

}