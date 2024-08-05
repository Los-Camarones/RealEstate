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

export async function signUp(formData: FormData)
{
  //get form data "name" values
  const data  = 
  {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  //call supabase
  const {error} = await supabase.auth.signUp(data)

  if(error)
  {
    redirect('/error')  //maybe change
  }

  revalidatePath('/' , 'layout')
  redirect('/account')
}