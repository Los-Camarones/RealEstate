'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';
import Footer from '@/components/Footer/footer';
const MortgageCalculatorPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Mortgage Calculator widget script
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
        <title>Mortgage Calculator</title>
        <meta
          name="description"
          content="Use our mortgage calculator to estimate your monthly mortgage payments and explore the financial details of your dream home."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '60px' }}>
          {/* Placeholder for the IDX Mortgage Calculator widget */}
          <div ref={pageRef} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MortgageCalculatorPage;
