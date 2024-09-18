'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar'; // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure
import Head from 'next/head'; // Import Head to include SEO settings correctly

const PendingFeaturedListingsPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Pending Featured Listings widget script
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
        <title>Pending Featured Listings</title>
        <meta
          name="description"
          content="Explore our pending featured listings to find properties currently under contract. Stay updated on the latest pending real estate listings and discover opportunities in the market."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Pending Featured Listings widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default PendingFeaturedListingsPage;
