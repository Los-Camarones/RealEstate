// app/sold-featured-listings/page.tsx
'use client'; 

import React from 'react';
import NavBar from '../../components/Navbar/navbar';
import "../globals.css";

import { useEffect } from 'react';
import Head from 'next/head'; // Importing Head to add meta tags for SEO

export default function SoldFeaturedListings() {
  useEffect(() => {
    // Adding the IDX rendering script to the body
    const script = document.createElement('script');
    script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
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
        <title>Sold Featured Listings</title> {/* Setting the page title for SEO */}
        <meta name="description" content="" /> {/* Adding a description meta tag */}
      </Head>
      <div>
        <h1>Sold Featured Listings</h1>
        <p>Displaying sold featured listings using IDX integration.</p>
      </div>
    </>
  );
}
