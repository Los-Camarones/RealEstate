import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../utils/supabase/supabaseClient';


/**Creates a user on supabase and inserts them into the schema
 * 
 * @param req - 
 * @param res 
 */
export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
  if (req.method === 'POST') {
    try {
      const {firstName, lastName, email, phone, password } = req.body;

      // TODO: encrypt data
      //const encryptedEmail = encryptData(email);
      //const encryptedPhone = encryptData(phone);

      // Create user using credentials
      const {data: signupData, error } = await supabase.auth.signUp({
        email: email,
        password
      });

      if (error) 
      {
        throw error;
      }
      
      //TODO: Fix schema so the below code can work
      //insert into our schema 
      const {data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          //enter information from user
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          email: email
        },
        { returning: 'minimal' }
      ])

      if(insertError)
      {
        throw insertError;
      }

      // Handle success (optional: return created user details)
      res.status(200).json({first_name:firstName });

    } 
    catch (error) 
    {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error});
    }
  } 
  else 
  {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}