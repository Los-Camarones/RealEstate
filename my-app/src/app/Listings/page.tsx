'use client';

import { useEffect } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const Listing = () => {
  useEffect(() => {
    // Create the script element for rendering ihfKestrel
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
    
    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function: Remove the script on component unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div style={{ paddingTop: '6rem' }}> {/* Placeholder for any future content */} </div>
      </main>
    </>
  );
};

export default Listing;
