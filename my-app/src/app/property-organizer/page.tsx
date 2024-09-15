'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar'; 
import '../globals.css'; 

const PropertyOrganizerPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Property Organizer widget script
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
          {/* Placeholder for the IDX Property Organizer widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default PropertyOrganizerPage;

