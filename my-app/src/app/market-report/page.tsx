// /app/market-report/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; 
import NavBar from '../../components/Navbar/navbar';  
import '../globals.css';  

const MarketReportPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current && !widgetRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render());
      `;
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`{marketName}: Market Report`}</title>
        <meta name="description" content="{marketDescription}" />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          <h1>{`Market Report: {marketName}`}</h1>
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default MarketReportPage;
