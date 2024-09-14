// /app/featured-listings/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Importing Head for SEO settings.
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const FeaturedListingsPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Featured Listings widget script
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
        <title>Featured Listings</title>
        <meta
          name="description"
          content="Explore our featured listings to find the best properties available. View detailed information, photos, and more."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Featured Listings</h1>
          <p>Browse through our curated featured listings to discover exceptional properties.</p>
          {/* Placeholder for the IDX Featured Listings widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default FeaturedListingsPage;
