'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MarketsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
        pageRef.current.appendChild(script);
      }
    };

    addScript();

    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <>
      <Head>
        <title>Communities</title>
        <meta
          name="description"
          content="Explore various real estate communities and find your perfect neighborhood. Get comprehensive information on community amenities, housing options, and local market trends."
        />
      </Head>
      <NavBar />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-8"
      >
        <div className="relative z-10 w-full max-w-7xl p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-90 rounded-lg shadow-lg mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-white">Communities</h1>
          <p className="text-lg text-gray-300 mb-8 px-4">
            Discover your ideal neighborhood. From vibrant cityscapes to serene suburbs, explore communities that match your lifestyle and preferences.
          </p>
          <p className="text-md text-gray-400 mb-4 px-4">
            Use the widget below to search for properties and explore community details.
          </p>
        </div>
        <motion.div
          ref={pageRef}
          className="relative z-10 w-full max-w-7xl bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-90 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IDX Markets Widget */}
        </motion.div>
      </motion.div>
      <footer className="w-full text-center py-4 text-gray-400 bg-gradient-to-r from-gray-800 to-black relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{
            height: '10px', // Thickness of the light effect
            bottom: '0', // Position at the bottom
            left: '0',
            right: '0',
          }}
        ></motion.div>
        <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
        <p className="text-xs">Real Estate IDX Powered by iHomefinder</p>
      </footer>
    </>
  );
};

export default MarketsPage;

