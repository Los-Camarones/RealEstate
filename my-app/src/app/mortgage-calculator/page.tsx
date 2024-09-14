// /app/mortgage-calculator/page.tsx
'use client';

import React, { useEffect } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import Head from 'next/head'; // Importing Head to add meta tags for SEO
import '../globals.css';  // Adjust the path based on your project structure

const MortgageCalculatorPage = () => {
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
        <title>Mortgage Calculator</title>
        <meta
          name="description"
          content="Use our mortgage calculator to estimate your monthly mortgage payments and understand how different factors affect your home loan."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Mortgage Calculator</h1>
          <p>Calculate your mortgage payments using the IDX Mortgage Calculator integration.</p>
        </div>
      </main>
    </>
  );
};

export default MortgageCalculatorPage;
