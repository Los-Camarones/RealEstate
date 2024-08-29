/**
 * This file serves for any actions that revolve around user authentication and authorization. These include:
 * Loggin in users
 * Creating new accounts
 * Checking for authorization
 * 
 */
'use server';


import supabase from '../utils/supabase/supabaseClient';
import { createSupabaseServerClient } from '../utils/supabase/supabaseServer';



/**
 * Handles the creation of an account for a user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - A promise that resolves to the newly created user or rejects with an error.
 */
export async function signUp(email: string, password: string)
{
  //create supabase server client
  const supabase = createSupabaseServerClient();

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
export async function signIn(email: string, password: string) 
{
  //create supabase server client
  const supabase = createSupabaseServerClient();


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

/**
 * Handles the sign out function for a user
 * @returns {Promise<Object>} - A promise that resolves to the sign-ind user or rejects with an error.
 */
export async function signOut() 
{

  const { error } = await supabase.auth.signOut()

  //TODO: clear cookies?
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
    }
  }

}

/**
 * Retrieves the user ID from the Supabase authentication.
 * 
 * This function attempts to fetch the user ID associated with the current authenticated session.
 * It returns an object indicating the success of the operation, an optional error message, and the user ID if successful.
 * 
 * @returns {Promise<{ success: boolean; message: string; userId?: string }>}
 * An object containing:
 * - `success` (boolean): Indicates if the operation was successful.
 * - `message` (string | undefined): Message explaining error if an error did occure, octherwise undefined.
 * - `userId` (string | undefined): The user ID if the operation was successful; otherwise, it is undefined.
 */
export async function getUserID()
{
   //create supabase server client
   const supabase = createSupabaseServerClient();

   try{
 
     //get user
     const { data: { user }, error: authError } = await supabase.auth.getUser();
 
     //return error if theres auth error
     if(authError)
     {
       return { success: false, message: `Authentication error: ${authError.message}` };
     }
 
     //get id of user
     const userID = user?.id;
     
     //if no user ID, ID return error 
     if(!userID)
     {
       return { success: false, message: "No user id found" };
     }
     else
     {
      return {success: true, id: userID}
     }
    }
    catch(error)
    {
      //catch all unexpected errors
      return { success: false, message: 'An unexpected error occurred.' };
    }
}


/**
 * Function to insert new users to our schema. 
 * Note: this is our own database schema, which is different from supabase auth schema 
 * @param email 
 * @param fName 
 * @param lName 
 * @param phoneNumber 
 */
export async function insertNewUser(email: string, fName: string, lName:string, phoneNumber: string)
{
  //create supabase server client
  const supabase = createSupabaseServerClient();

  try{

    //get our userID if the user has a authenticated session
    const userID = (await getUserID()).id

    if(!userID)
    {
      return { success: false, message: "No user id found" };
    }


    // insert to our user table 
    const {data: insertData, error: insertError } = await supabase
        .from('Users')
        .insert([
          {
            //enter information from user
            id: userID,
            firstName: fName,
            lastName: lName,
            phoneNumber: phoneNumber,
            email: email
          }
        ])
  
        if(insertError)
        {
          console.log("3");
          return { success: false, message: insertError.message};
        }

        return { success: true, message: 'User successfully added!', userId: userID };
  }
  catch(error)
  {
    //catch all unexpected errors
    return { success: false, message: 'An unexpected error occurred.' };
  }

}

/**
 * Gets the user information via sql query.
 */
export async function getUserInformation()
{
    //create supabase server client
    const supabase = createSupabaseServerClient();

    
    try {

      //get our userID if the user has a authenticated session
      const userID = (await getUserID()).id

      if(!userID)
      {
        return { success: false, message: "No user id found" };
      }

      //use sql query to get user info based on their id
      let { data: User, error } = await supabase
        .from('Users')
        .select("*")
        .eq('id', userID)

      if(error)
      {
        return { success: false, message: error.message};
      }
      else
      {
        return { success: true, data: User};
      }

      
    } catch (error) 
    {
      //catch all unexpected errors
      return { success: false, message: 'An unexpected error occurred.' };
    }
}