'use client';

import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';
import Head from 'next/head';
import Footer from '@/components/Footer/footer';
import UserTestimonialForm from '@/components/Testimonials/UserTestimonialForm/UserTestimonialForm';

const PropertyOrganizerPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to add the IDX Property Organizer widget script
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
        {/* SEO Meta Tags */}
        <title>Property Organizer</title>
        <meta
          name="description"
          content="Organize and manage your property listings. Save your favorite properties and keep track of the latest updates and changes in the market."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Property Organizer widget */}
          <div ref={pageRef} />
        </div>
        <UserTestimonialForm></UserTestimonialForm>
      </main>
      <Footer />
    </>
  );
};

export default PropertyOrganizerPage;

