'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';

const FeaturedListingsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Featured Listings widget script
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
        <title>Featured Listings</title>
        <meta
          name="description"
          content="Discover our featured real estate listings, showcasing the best properties available on the market. Explore high-quality homes with our Featured Listings widget."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '40px' }}>
          {/* Placeholder for the IDX Featured Listings widget */}
          <div ref={pageRef} />
        </div>
      </main>
    </>
  );
};

export default FeaturedListingsPage;
