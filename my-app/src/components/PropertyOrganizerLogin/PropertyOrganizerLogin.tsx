'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

const PropertyOrganizerLogin: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render({
            "component": "loginWidget",
            "style": "twoline"
          }));
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    addScript();

    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ''; // Clear all children including the script
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Property Organizer Login</title>
        <meta name="description" content="Login widget for property organizer." />
      </Head>
      <div ref={pageRef} />
    </>
  );
};

export default PropertyOrganizerLogin;

