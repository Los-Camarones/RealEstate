'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';

export default function Contact() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Function to add the IDX contact form widget script
    const addScript = () => {
      if (!document.body.contains(scriptRef.current!)) {
        const script = document.createElement('script');
        script.innerHTML = `
          if (typeof ihfKestrel !== 'undefined' && ihfKestrel.render) {
            try {
              document.currentScript.replaceWith(ihfKestrel.render({
                "component": "contactFormWidget"
              }));
            } catch (error) {
              console.error('Error rendering ihfKestrel:', error);
            }
          } else {
            console.error('ihfKestrel is not defined or render function is missing.');
          }
        `;
        document.body.appendChild(script);
        scriptRef.current = script; // Save the script element in the ref
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function to remove the script on component unmount
    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <main>
      <h1>Contact Us</h1>
      <p>Fill out the form below to get in touch with us.</p>
      {/* Placeholder for the IDX contact form widget */}
      <div ref={widgetRef} />
    </main>
  );
}

