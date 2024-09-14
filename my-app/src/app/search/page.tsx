// /app/search/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Importing Head for SEO settings.
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const PropertySearchPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Property Search widget script
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
        <title>Property Search</title>
        <meta
          name="description"
          content="Find your ideal property with our comprehensive property search. Explore listings with detailed information and photos."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Property Search</h1>
          <p>Use our property search to find your dream home. Browse listings with complete details and images.</p>
          {/* Placeholder for the IDX Property Search widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default PropertySearchPage;
