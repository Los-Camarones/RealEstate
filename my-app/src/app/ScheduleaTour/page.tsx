'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserID } from '../../actions/AuthActions'; // Adjust the import to point to your server-side auth actions

const ScheduleaTour = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checking if the user is authenticated...');

      // Call the server-side function to get the user ID
      const response = await getUserID();

      console.log('Response from getUserID:', response); // Log the full response for debugging

      if (response.success) {
        console.log('User is authenticated:', response.userId); // Log user ID if authenticated
        setIsAuthenticated(true); // User is authenticated
      } else {
        console.warn('User is not authenticated:', response.message); // Log if not authenticated
        // If not authenticated, redirect to the sign-in page with a redirect parameter
        router.push('/Sign-in?redirect=/ScheduleaTour');
      }

      setLoading(false); // Stop the loading state once the check is complete
      console.log('Authentication check completed.'); // Indicate the check has finished
    };

    checkAuth();
  }, [router]);

  if (loading) {
    // Show a loading spinner or message while checking authentication
    return <div>Loading, please wait...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, rendering nothing.'); // Log when rendering nothing due to lack of authentication
    return null; // Render nothing if not authenticated; redirection is handled in useEffect
  }

  // Render the "Schedule a Tour" form if authenticated
  return (
    <div style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: '80%', 
      maxWidth: '400px',
      background: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: '1000'
    }}>
      <h1>Schedule a Tour</h1>
      <p>Fill out the form below to schedule a tour of the property.</p>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '0 0 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '0 0 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ 
              width: '100%', 
              padding: '8px', 
              margin: '0 0 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px 0', 
            background: '#fae042', 
            color: 'black', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ScheduleaTour;
