/*
The Dashboard page is a protected route that can only be accessed by authenticated users.
It uses the useAuth hook to check if the user is authenticated before rendering the content.
If the user is not authenticated, it shows a loading spinner or redirects to the login page.
*/

'use client';

import React from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';  

const Dashboard = () => {
  const auth = useAuth();  // Added the useAuth hook to check if the user is authenticated
  const router = useRouter();

  if (!auth) {
    // If the user is not authenticated, return a loading spinner or redirect
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />  
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* The main dashboard content is shown only if the user is authenticated */}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
