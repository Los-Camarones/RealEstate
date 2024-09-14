// /app/email-alerts/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Importing Head for SEO settings.
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const EmailAlertsPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Email Alerts widget script
    const addScript = () => {
      if (widgetRef.current && !widgetRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render({
            "component": "emailAlertsWidget"
          }));
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
        <title>Email Alerts</title>
        <meta
          name="description"
          content="Sign up for email alerts to stay updated on new listings, price changes, and market trends that match your criteria."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>Email Alerts</h1>
          <p>Sign up for email alerts to receive updates about new listings and market changes.</p>
          {/* Placeholder for the IDX Email Alerts widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default EmailAlertsPage;
