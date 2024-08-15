"use client";

import React, { useState } from 'react'
import { signOut } from '../../actions/AuthActions';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {

  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignOut = async () => 
  {

    console.log('signed out');

    //call server to sign out
    const response = await signOut();

    //if good, redirect to home page
    if(response.success)
    {
      router.push('/');
    }
    else
    {
      setError(response.errorMessage  || "Unknown Error has occured")
    }

  }
  return (
    <div>
      <div>
        First name Last Name
      </div>
      {/*When an error occurs this will show up */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile