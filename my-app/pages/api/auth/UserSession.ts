'use server';

import type { NextApiRequest, NextApiResponse } from 'next';
import {createSupabaseServerClient} from '../../../utils/supabase/supabaseServer';


export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
  'use server';
  const supabase = await createSupabaseServerClient();
  console.log('test');

  try{
    //get current session from supabase
    //do not getSession is insecure on the server.
    const user = await supabase.auth.getUser();

    if(user.error)
    {
      //throw new error if it occurs
      console.log('error on user')
      console.log(user.error);
      throw new Error(user.error.message);
    }

    //May need to change
    res.status(200).json({user: user.data});
  }
  catch(error)
  {
    console.log('catch');
    if(error instanceof Error)
    {
      res.status(500).json({error: error.message});
    }
    else{
      res.status(500);
    }
  }

  return supabase.auth.getSession();
}
