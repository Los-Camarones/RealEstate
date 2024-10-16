'use client';
import React, { useEffect } from 'react';

// Declare ihfKestrel as a global variable
declare const ihfKestrel: any;
import './page.css'; // Import the CSS file
import NavBar from "../../components/Navbar/navbar";
import IHomeFinderContactWidget from "../../components/iHomeFinderContactWidget/iHomeFinderContactWidget";
import ContactMe from "../../components/ContactMe/ContactMe";

const SellerPage: React.FC = () => {
  useEffect(() => {
    // Ensure the script is only appended once
    const container = document.getElementById('ihf-widget-container');
    if (container) container.innerHTML = ''; // Clear any existing content

    // Check if ihfKestrel is loaded before trying to render the widget
    if (typeof ihfKestrel !== 'undefined') {
      // Create the script element
      const script = document.createElement('script');
      script.id = 'ihf-script';
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render({
          "component": "valuationFormWidget",
          "style": "vertical"
        }));
      `;
      // Append the script to the container div
      container?.appendChild(script);
    } else {
      console.error('ihfKestrel is not defined');
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div id="ihf-widget-container"></div>
      <IHomeFinderContactWidget />
      <footer>
        <ContactMe />
      </footer>
    </div>
  );
};

export default SellerPage;
