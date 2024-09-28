'use client';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const MarketsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Markets widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script as soon as the component is mounted
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
        <title>Real Estate Markets</title>
        <meta
          name="description"
          content="Explore detailed real estate market information and trends. Get insights on various markets, including property values, market conditions, and more."
        />
      </Head>
      <NavBar />
      <div ref={pageRef} className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-8">
        <div className="relative z-10 w-full max-w-7xl p-8 bg-white bg-opacity-90 rounded-lg shadow-lg mb-16">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Markets</h1>
          <p className="text-lg text-center text-gray-600 mb-8 px-4">
            Explore various real estate communities and find your perfect neighborhood. Get comprehensive information on community amenities, housing options, and local market trends to make informed decisions. Whether you're looking for a family-friendly area, a vibrant downtown, or a quiet suburban community, our tool helps you discover the best places to live.
          </p>
          <p className="text-md text-center text-gray-600 mb-4 px-4">
            Use the widget below to search for properties and learn more about different communities based on your preferences.
          </p>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-gray-500 bg-gray-800">
        <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
        <p className="text-xs">Real Estate IDX Powered by iHomefinder</p>
      </footer>
    </>
  );
};

export default MarketsPage;

