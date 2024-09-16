'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar'; // Adjust the path if necessary
import '../globals.css'; // Adjust the path based on your project structure

const ValuationRequestPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current && !widgetRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render({
          "component": "valuationWidget"
        }));
      `;
      widgetRef.current.appendChild(script);
    }

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
          {/* Placeholder for the IDX Valuation Request widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default ValuationRequestPage;
