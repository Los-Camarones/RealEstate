'use client'; // Enables client-side rendering, required for DOM manipulation.

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar'; // Adjust the path if necessary
import '../globals.css'; // Adjust the path based on your project structure

const EmailAlertsPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Function to add the IDX Email Alerts widget script
    const addScript = () => {
      if (!document.body.contains(scriptRef.current!)) {
        const script = document.createElement('script');
        script.innerHTML = `
          if (typeof ihfKestrel !== 'undefined' && ihfKestrel.render) {
            try {
              document.currentScript.replaceWith(ihfKestrel.render({
                "component": "emailAlertsWidget"
              }));
            } catch (error) {
              console.error('Error rendering ihfKestrel:', error);
            }
          } else {
            console.error('ihfKestrel is not defined or render function is missing.');
          }
        `;

        // Append the script to the body
        document.body.appendChild(script);
        scriptRef.current = script; // Assign the script to the ref
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
    <>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Email Alerts widget */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default EmailAlertsPage;

