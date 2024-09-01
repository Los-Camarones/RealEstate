"use client";

import React, { useEffect, useState } from 'react'
import { signOut } from '../../actions/AuthActions';
import { getUserInformation } from '../../actions/AuthActions';
import { useRouter } from 'next/navigation';
import { clear } from 'console';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
const Profile: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  //function to clear all cookies
  const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });
  };

  //function to handle sign out 
  const handleSignOut = async () => 
  {

    //call supabase server to sign out
    const response = await signOut();

    //if good, clear cookies and session and redirect to home page
    if(response.success)
    {
      console.log('signed out');
      clearCookies();
      //supabase.auth.setSession(null);
      localStorage.clear();
      sessionStorage.clear();
      router.push('/');
    }
    else
    {
      setError(response.errorMessage  || "Unknown Error has occured")
    }

  }

    //fetch user information from supabase
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userInfo = await getUserInformation();
          setUser(userInfo);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);




  

  
  //loading states
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available</div>;


  return (
    <div>
      <div>
        <h2>User Profile</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
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