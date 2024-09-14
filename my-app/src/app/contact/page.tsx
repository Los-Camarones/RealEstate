// app/contact/page.tsx
'use client'; // Enables client-side rendering, required for DOM manipulation.

import { useEffect } from 'react';
import Head from 'next/head'; // Importing Head for potential SEO settings.

export default function Contact() {
  useEffect(() => {
    // Create a script element for the contact form widget.
    const script = document.createElement('script');
    script.innerHTML = `
      document.currentScript.replaceWith(ihfKestrel.render({
        "component": "contactFormWidget"
      }));
    `;

    // Append the script to the document body.
    document.body.appendChild(script);

    // Cleanup function to remove the script on component unmount.
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us</title> {/* Optionally set the page title */}
        <meta name="description" content="Contact us for more information." /> {/* SEO meta description */}
      </Head>
      <div>
        <h1>Contact Us</h1>
        <p>Fill out the form below to get in touch with us.</p>
        {/* The IDX contact form widget will be rendered here via the script */}
      </div>
    </>
  );
}
