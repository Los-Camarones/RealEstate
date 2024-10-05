/*
This hook is used to check if the user is authenticated or not. 
If the user is not authenticated, it will redirect to the login page. 
This hook is used in the _app.tsx file to check the authentication status of the user.
*/
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        if (response.status === 200) {
          setAuth(true);
        }
      } catch (err) {
        setAuth(false);
        router.push('/Sign-in'); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  return auth;
};

export default useAuth;
