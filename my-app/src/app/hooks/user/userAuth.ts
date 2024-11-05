/*
This hook is used to check if the user is authenticated or not. 
If the user is not authenticated, it will redirect to the login page. 
This hook is used in the _app.tsx file to check the authentication status of the user.
*/
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const userAuth = () => {
const [hasCookie, setHasCookie] = useState<boolean>(false);
const router = useRouter();

  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('userStateCookie=true'));
      setHasCookie(!!cookie);
    };
    
    checkCookie();
  }, []);

  return hasCookie;
};

export default userAuth;
