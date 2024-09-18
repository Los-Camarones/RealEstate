/**
 * This file will be loaded for any page within this subdirectory.
 * It will check if a user is authentiacted and redirect to the login page if not
 * https://www.youtube.com/watch?v=v6UvgfSIjQ0&t=44s
 */

import {createSupabaseServerClient} from '../../utils/supabase/supabaseServer';
import { redirect } from "next/navigation";



export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  //create a server client supabase. allow for get/set cookies
  const supabase = createSupabaseServerClient();

  //check if there is a user first. get cookies
  const {data : {user}}= await supabase.auth.getUser()

  //if no user for existinng session, return to sign in page
  if (!user)
  {
    redirect('/Sign-in')
  }

  return(
    <>
      {children}
    </>
  )
}