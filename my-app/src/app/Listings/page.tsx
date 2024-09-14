'use client';

import { useEffect } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const Listing = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
    
    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function: only remove the script if it is still a child of the body
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '2rem' }}> {/* Inline style for testing purposes */}
      </div>
    </div>
  );
};

export default Listing;
