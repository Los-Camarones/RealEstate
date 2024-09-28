'use client';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import { motion, useAnimation } from 'framer-motion'; // Import framer-motion for animations
import { useInView } from 'react-intersection-observer';

const CommunitiesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once when in view
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

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

  useEffect(() => {
    if (inView) {
      controls.start('visible'); // Start animation when component is in view
    }
  }, [controls, inView]);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Explore Communities</title>
        <meta
          name="description"
          content="Discover diverse communities with comprehensive real estate information. Learn about amenities, housing options, and market trends to find your ideal neighborhood."
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
        className="relative min-h-screen bg-gradient-to-br from-[#f3f4f6] via-[#c9e5f7] to-[#8ec0ff] flex flex-col items-center justify-start pt-8"
      >
        <div className="relative z-10 w-full max-w-7xl p-8 bg-white bg-opacity-90 rounded-lg shadow-lg mb-16">
          <h1 className="text-4xl font-bold mb-4 text-center text-[#2d4059]">Communities</h1>
          <p className="text-lg text-center text-[#61707d] mb-8 px-4">
            Discover communities with amenities, housing options, and market trends. Find your perfect neighborhood with our tool, tailored to your lifestyle and preferences.
          </p>
          <p className="text-md text-center text-[#61707d] mb-4 px-4">
            Use the widget below to explore properties in various communities.
          </p>
        </div>
        <motion.div
          ref={pageRef}
          className="relative z-10 w-full max-w-7xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IDX Markets Widget */}
        </motion.div>
      </motion.div>
      <footer className="w-full text-center py-4 text-[#61707d] bg-[#2d4059]">
        <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
        <p className="text-xs">Real Estate IDX Powered by iHomefinder</p>
      </footer>
    </>
  );
};

export default CommunitiesPage;



