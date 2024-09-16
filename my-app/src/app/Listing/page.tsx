// /app/listing/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const ListingPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current) {
      // Inject the IDX widget script into the DOM
      const script = document.createElement('script');
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render());
      `;
      widgetRef.current.appendChild(script);

      // Cleanup function to prevent duplication
      return () => {
        if (widgetRef.current) {
          while (widgetRef.current.firstChild) {
            widgetRef.current.removeChild(widgetRef.current.firstChild);
          }
        }
      };
    }
  }, []);

  return (
    <main>
      <header>
        <NavBar />
      </header>
      <head>
        {/* SEO Meta Tags */}
        <title>Property Search</title>
        <meta property="og:image" content="{listingPhotoUrl}" />
        <meta property="og:image:width" content="{listingPhotoWidth}" />
        <meta property="og:image:height" content="{listingPhotoHeight}" />
        <meta
          name="description"
          content="Photos and Property Details for {listingAddress}. Get complete property information, maps, street view, schools, walk score, and more. Request additional information, schedule a showing, save to your property organizer."
        />
        <meta
          name="keywords"
          content="{listingAddress}, {listingCity} Real Estate, {listingCity} Property for Sale"
        />
      </head>
      <div style={{ padding: '20px' }}>
        <h1>Property Search</h1>
        {/* Placeholder where the IDX widget will be rendered */}
        <div ref={widgetRef} />
      </div>
    </main>
  );
};

export default ListingPage;
