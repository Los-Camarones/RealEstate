'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const SupplementalListingsPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Supplemental Listings widget script
    const addScript = () => {
      if (widgetRef.current && !widgetRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          if (typeof ihfKestrel !== 'undefined' && ihfKestrel.render) {
            try {
              document.currentScript.replaceWith(ihfKestrel.render());
            } catch (error) {
              console.error('Error rendering ihfKestrel:', error);
            }
          }
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
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Supplemental Listings widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default SupplementalListingsPage;

