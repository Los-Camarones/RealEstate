'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import Head from 'next/head';
import Footer from '../../components/Footer/footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../globals.css';
import Link from 'next/link';

const ContactPage = () => {
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
        <title>Contact Us | Real Estate Assistance</title>
        <meta
          name="description"
          content="We’re here to assist with any inquiries, feedback, or questions you may have. Get in touch with us for all your real estate needs."
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
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Send Us a Message!</h1>
          <p className="text-lg text-gray-600 mb-4 px-4">
            Fill out the form below, and we will be in touch with you shortly.
          </p>
          <p className="text-md text-gray-500 mb-8 px-4">
            We’re here to assist with any inquiries, feedback, or questions you may have.
          </p>
          <Link href="/Referrals">
            <motion.button
              className="px-4 py-2 bg-transparent text-gray-700 border border-gray-700 rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Check Out Our List of Referrals
            </motion.button>
          </Link>
        </div>
        <motion.div
          ref={pageRef}
          className="relative z-10 w-full max-w-7xl bg-white bg-opacity-95 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* IDX Contact Widget */}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ContactPage;
