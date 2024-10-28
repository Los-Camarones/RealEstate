'use client'; 

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar'; 
import '../globals.css'; 
import Head from 'next/head'; 
import Footer from '@/components/Footer/footer';
const PendingFeaturedListingsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Pending Featured Listings widget script
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
          <div ref={pageRef} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PendingFeaturedListingsPage;
