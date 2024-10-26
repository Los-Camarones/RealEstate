'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';
import Footer from '@/components/Footer/footer';

const SoldFeaturedListingsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Sold Featured Listings widget script
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
        <title>Sold Featured Listings</title>
        <meta
          name="description"
          content="Explore our sold featured listings. View details on recently sold properties, including photos and other relevant information."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '40px' }}>
          {/* Placeholder for the IDX Sold Featured Listings widget */}
          <div ref={pageRef} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SoldFeaturedListingsPage;

