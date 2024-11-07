/*
This hook is used to check if the user is authenticated or not. 
If the user is not authenticated, it will redirect to the login page. 
This hook is used in the _app.tsx file to check the authentication status of the user.
*/
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const userAuth = () => {
const [auth, setAuth] = useState<boolean>(false);
const router = useRouter();

  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('userStateToken='));
      console.log('checking cookie' ,cookie);
      if(cookie) {
        const value = cookie.split('=')[1];
        console.log('value' , value);
        if (value) {
          setAuth(true)
        }
      }
    };
    
    checkCookie();
  }, [router]);

  return auth;
};

export default userAuth;
