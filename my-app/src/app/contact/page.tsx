// /app/contact/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Importing Head for SEO settings.

export default function Contact() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX contact form widget script
    const addScript = () => {
      if (widgetRef.current && !widgetRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render({
            "component": "contactFormWidget"
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
        <title>Contact Us</title> {/* Optionally set the page title */}
        <meta name="description" content="Contact us for more information." /> {/* SEO meta description */}
      </Head>
      <main>
        <h1>Contact Us</h1>
        <p>Fill out the form below to get in touch with us.</p>
        {/* Placeholder for the IDX contact form widget */}
        <div ref={widgetRef} />
      </main>
    </>
  );
}
