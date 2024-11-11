/*
This hook is used to check if the user is authenticated or not. 
Unlike useAuth.ts, it does not redirect to sign in page.
*/
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const adminAuth = () => {
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
      }
    };

    checkAuth();
  }, [router]);

  return auth;
};

export default adminAuth;
