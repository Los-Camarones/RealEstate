"use client";

import React, { useEffect, useState } from 'react'
import { signOut } from '../../actions/AuthActions';
import { getUserInformation } from '../../actions/AuthActions';
import { useRouter } from 'next/navigation';

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

  const handleSignOut = async () => 
  {

    //call server to sign out
    const response = await signOut();

    //if good, redirect to home page
    if(response.success)
    {
      console.log('signed out');
      router.push('/');
    }
    else
    {
      setError(response.errorMessage  || "Unknown Error has occured")
    }

  }

  
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