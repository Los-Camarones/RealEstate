import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../src/utils/supabase/supabaseClient';

/**
 * Calls Supabase to handle sign in feature for users
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  if(req.method === 'POST')
  {
    //grab user's credentials from request
    const{email, password} = req.body;

    try
    {
      //call api sign in
      const{data, error} = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if(error)
      {
        //unauthorization error 401
        return res.status(401).json({error: error.message});
      }

      //successful login 200 OK
      return res.status(200).json({message: 'Success login in'});
    } 
    catch(error)
    {
      if(error instanceof(Error))
      {
        console.log('Error signing in' , error.message);
      }
      else
      {
        console.log(error);
      }

      //500 internal server error
      return res.status(500).json({error: 'Internal server error'});

    }
    
  }
  else
  {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}