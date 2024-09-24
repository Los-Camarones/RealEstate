'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';

const PropertySearchPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render());
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function to remove the script on component unmount
    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ''; // Clear all children including the script
      }
    };
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>PropertySearch</title>
        <meta
          name="description"
          content="Photos and Property Details for {listingAddress}. Get complete property information, maps, street view, schools, walk score and more. Request additional information, schedule a showing, save to your property organizer."
        />
        <meta
          name="keywords"
          content="{listingAddress}, {listingCity} Real Estate, {listingCity} Property for Sale"
        />
        <meta
          property="og:image"
          content="{listingPhotoUrl}"
        />
        <meta
          property="og:image:width"
          content="{listingPhotoWidth}"
        />
        <meta
          property="og:image:height"
          content="{listingPhotoHeight}"
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the property search widget */}
          <div ref={pageRef} />
        </div>
      </main>
    </>
  );
};

export default PropertySearchPage;
