'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../globals.css';

const SellerPage: React.FC = () => {
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
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render({
            "component": "valuationFormWidget",
            "style": "vertical"
          }));
        `;
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
        <title>Sell Your Property | Free Home Valuation</title>
        <meta
          name="description"
          content="Thinking of selling your home? Get a free, accurate valuation to find out what your property is worth."
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
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Get a Free Home Valuation</h1>
          <p className="text-lg text-gray-600 mb-8 px-4">
            Thinking of selling? Start with a free, customized market analysis of your property.
          </p>
          <p className="text-md text-gray-500 mb-4 px-4">
            Simply provide the details below, and we will reach out with an estimated value of your property.
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">Property Information</h2>
          <p className="text-md text-gray-500 mb-6 px-4">
            Tell us a little more about your home to get an accurate valuation, including details like location, property features, and condition.
          </p>
        </div>
        <motion.div
          ref={pageRef}
          className="relative z-10 w-full max-w-7xl bg-white bg-opacity-95 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IDX Valuation Form Widget */}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default SellerPage;
