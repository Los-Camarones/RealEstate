// /app/sold-featured-listings/page.tsx
'use client';

import React, { useEffect } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path as necessary
import Head from 'next/head'; // Importing Head to add meta tags for SEO
import '../globals.css';  // Adjust the path based on your project structure

export default function SoldFeaturedListings() {
  useEffect(() => {
    // Adding the IDX rendering script to the body
    const script = document.createElement('script');
    script.innerHTML = `
      document.currentScript.replaceWith(ihfKestrel.render());
    `;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Sold Featured Listings</title>
        <meta
          name="description"
          content="Explore our sold featured listings. See photos, property details, and information on recently sold properties."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Sold Featured Listings</h1>
          <p>Displaying sold featured listings using IDX integration.</p>
        </div>
      </main>
    </>
  );
}
