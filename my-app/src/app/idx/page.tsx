'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const Idx = () => {
  // Ref to keep track of the script to avoid duplicate rendering
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Function to add the ihfKestrel script and render the widget
    const addScript = () => {
      if (typeof window !== 'undefined' && typeof window.ihfKestrel !== 'undefined') {
        try {
          // Check if scriptRef is null or not to prevent duplicate script additions
          if (!scriptRef.current) {
            const script = document.createElement('script');
            script.innerHTML = `
              document.currentScript.replaceWith(
                ihfKestrel.render()
              );
            `;
            document.body.appendChild(script);
            scriptRef.current = script; // Set the ref to the created script
          }
        } catch (error) {
          console.error('Error rendering ihfKestrel:', error);
        }
      } else {
        console.error('ihfKestrel is not defined or does not have a render method.');
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function: Remove the script on component unmount
    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null; // Reset the ref
      }
    };
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <>
      <NavBar />
      <main>
        <div style={{ paddingTop: '6rem' }}>
          {/* Placeholder for the IDX Idx widget */}
        </div>
      </main>
    </>
  );
};

export default Idx;

