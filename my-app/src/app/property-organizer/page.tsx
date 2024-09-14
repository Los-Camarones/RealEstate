// /app/property-organizer/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Importing Head for SEO settings.
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const PropertyOrganizerPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Property Organizer widget script
    const addScript = () => {
      if (widgetRef.current && !widgetRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render());
        `;
        widgetRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function to remove the script on component unmount
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ''; // Clear all children including the script
      }
    };
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Property Organizer</title>
        <meta
          name="description"
          content="Manage your saved properties and searches with the Property Organizer. Stay updated on the latest listings and keep track of your favorite homes."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Property Organizer</h1>
          <p>Use the Property Organizer to save your favorite listings and manage your searches.</p>
          {/* Placeholder for the IDX Property Organizer widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default PropertyOrganizerPage;
