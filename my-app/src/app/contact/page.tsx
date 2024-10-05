'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';
import styles from './contact.module.css'
import Link from 'next/link';

const ContactPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Contact widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render());
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
        <meta
          name="description"
          content="Get in touch with us for any inquiries, questions, or feedback. We're here to assist you with all your real estate needs."
        />
      </Head>
      <NavBar />
      <main>
        <div className={styles.mainHeader}>      
          <h1 >Send me a message!</h1>
        </div>
        
        <Link href="/Referrals">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Check out my list of referrals
          </button>
        </Link>

        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Contact widget */}
          <div ref={pageRef} />
        </div>
      </main>
    </>
  );
};

export default ContactPage;
