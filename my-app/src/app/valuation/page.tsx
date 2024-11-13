'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Footer from '../../components/Footer/footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ValuationRequestPage = () => {
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
        <title>Valuation Request</title>
        <meta
          name="description"
          content="Get an accurate valuation of your property. Request a free property valuation and find out the market value of your home today."
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
        className="relative min-h-screen bg-white text-gray-800 flex flex-col items-center justify-start pt-8"
      >
        <div className="relative z-10 w-full max-w-7xl p-8 bg-white bg-opacity-95 rounded-lg shadow-lg mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Valuation Request</h1>
          <p className="text-lg text-gray-600 mb-8 px-4">
            Find out your property's market value. Use this form to request a free, accurate valuation tailored to your property.
          </p>
          <p className="text-md text-gray-500 mb-4 px-4">
            Submit the form below to get started.
          </p>
        </div>
        <motion.div
          ref={pageRef}
          className="relative z-10 w-full max-w-7xl bg-white bg-opacity-95 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IDX Valuation Request Widget */}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ValuationRequestPage;
