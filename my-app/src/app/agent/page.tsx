// /app/agent/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import Head from 'next/head';
import '../globals.css';  // Adjust the path based on your project structure

const AgentPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current) {
      // Inject the IDX widget script into the DOM
      const script = document.createElement('script');
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render());
      `;
      widgetRef.current.appendChild(script);

      // Cleanup function to prevent duplication
      return () => {
        if (widgetRef.current) {
          while (widgetRef.current.firstChild) {
            widgetRef.current.removeChild(widgetRef.current.firstChild);
          }
        }
      };
    }
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>{`{agentName}`}</title>
        <meta
          name="description"
          content="Explore agent profiles, view listings, and contact for more information on property services."
        />
      </Head>
      <main>
        <header>
          <NavBar />
        </header>
        <div style={{ padding: '20px' }}>
          <h1>{`Agent: {agentName}`}</h1>
          {/* Placeholder where the IDX widget will be rendered */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default AgentPage;
