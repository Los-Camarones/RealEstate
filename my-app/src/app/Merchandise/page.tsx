'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import '../globals.css';

const MerchandisePage: React.FC = () => {
  useEffect(() => {
    // Add Ecwid script to load the store
    const script = document.createElement("script");
    script.src = `https://app.ecwid.com/script.js?${process.env.NEXT_PUBLIC_ECWID_STORE_ID}&data_platform=code&data_date=2024-11-06`;
    script.async = true;
    script.setAttribute("charset", "utf-8");
    document.body.appendChild(script);

    // Load the product browser function after script loads
    script.onload = () => {
      (window as any).xProductBrowser?.(
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        `id=my-store-${process.env.NEXT_PUBLIC_ECWID_STORE_ID}`
      );
    };

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Merchandise | Our Realtor Site</title>
        <meta name="description" content="Explore our exclusive realtor merchandise collection." />
      </Head>
      
      <NavBar />

      <main className="p-6">
        <h1 className="text-4xl font-bold mb-6">Merchandise</h1>
        <p className="mb-8">Explore our exclusive realtor merchandise below!</p>
        <div id={`my-store-${process.env.NEXT_PUBLIC_ECWID_STORE_ID}`}></div>
      </main>
      
      <Footer />
    </>
  );
};

export default MerchandisePage;
