<<<<<<< Updated upstream
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
const Sellers = () => {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>List for nearby houses in the same region of the location.</h1>
        <p> ask the user for their address. </p>
        <p> give an estimate house price for user's house , if the user enter they houes address . </p>
       
=======
'use client';
import React, { useEffect } from 'react';

// Declare ihfKestrel as a global variable
declare const ihfKestrel: any;
import './page.css'; // Import the CSS file
import NavBar from "../../components/Navbar/navbar";
import IHomeFinderContactWidget from "../../components/iHomeFinderContactWidget/iHomeFinderContactWidget";
import ContactMe from "../../components/ContactMe/ContactMe";
>>>>>>> Stashed changes

      </div>
      </div>
    );
}

<<<<<<< Updated upstream
export default Sellers;
=======
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
>>>>>>> Stashed changes
