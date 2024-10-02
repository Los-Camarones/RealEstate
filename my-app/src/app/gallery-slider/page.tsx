'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';

const GallerySliderPage = () => {
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
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Gallery Slider</title>
        <meta
          name="description"
          content="Explore featured properties with our gallery slider showcasing active listings in the market."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Gallery Slider widget */}
          <div ref={pageRef} />
        </div>
      </main>
    </>
  );
};

export default GallerySliderPage;
