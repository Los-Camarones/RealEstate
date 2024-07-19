import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Account = () => {
  const router = useRouter();
  const[user, setUser] = useState(null);

  useEffect(()=> {

    //call api to see if there is a user in session
    const fetchUserSession = async() =>
    {
      try{

        //call api
        const res = await fetch('/api/UserSession');

        //if 200 OK from api then get data
        if(res.ok)
        {
          const data = await res.json();
          setUser(data);
        }
        else
        {
          //user not authenticated, reroute
          router.push('/Sign-in')
        }
      }
      catch(error)
      {
        if(error instanceof Error)
        {
          console.error('Error fetching user session', error.message);
        }
        else
        {
          console.error('Error fetching user session');
        }
      }
    }

    fetchUserSession();


  }, []);

  if(!user){
    return <p>Loading session...</p>
  }
  return (
    <main>
      <header>
      </header>
      <h1>Welcome to your account!</h1>
      <p>Email: {user.email}</p>
    </main>
  )
}

export default Account