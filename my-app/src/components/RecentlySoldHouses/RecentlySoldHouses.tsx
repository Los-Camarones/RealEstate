'use client';
import Head from 'next/head';
import React, { useEffect, useRef } from 'react'

const RecentlySoldHouses = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the Gallery Slider widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render({
            "component": "gallerySliderWidget",
            "rows": 1,
            "navigation": true,
            "nav": "top",
            "auto": true,
            "maxResults": 25,
            "status": "active",
            "featured": true,
            "effect": "slide"
          }));
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    addScript();

    // Cleanup function to remove the script on component unmount
    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ''; // Clear all children including the script
      }
    };
  }, []);

    
  return (
    <div>
      <Head>
      <title>Gallery Slider</title>
        <meta
          name="description"
          content="Explore featured properties with our gallery slider showcasing active listings in the market."
        />
      </Head>

      <div id="gallerySliderWidget">
      {/* The widget will be rendered inside this div */}
    </div>
      <div ref={pageRef} />
    </div>

  )
}

export default RecentlySoldHouses;