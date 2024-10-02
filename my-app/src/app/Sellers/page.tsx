'use client';
import React, { useEffect } from 'react';
import './page.css'; // Import the CSS file

const SellerPage: React.FC = () => {
  useEffect(() => {
    // Ensure the script is only appended once
    const container = document.getElementById('ihf-widget-container');
    if (container) container.innerHTML = ''; // Clear any existing content

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
  }, []);

  return (
    <div className="container">
      <h1 className="title">Sell My House</h1>
      {/* Container for the iHomefinder widget */}
      <div id="ihf-widget-container" className="ihf-widget-container"></div>
    </div>
  );
};

export default SellerPage;
