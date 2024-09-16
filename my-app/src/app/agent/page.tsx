'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/navbar';  // Adjust the path if necessary
import '../globals.css';  // Adjust the path based on your project structure

const AgentPage = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current && !widgetRef.current.querySelector('script')) {
      // Inject the IDX widget script into the DOM
      const script = document.createElement('script');
      script.innerHTML = `
        if (typeof ihfKestrel !== 'undefined' && ihfKestrel.render) {
          try {
            document.currentScript.replaceWith(ihfKestrel.render({
              "component": "agentWidget"
            }));
          } catch (error) {
            console.error('Error rendering ihfKestrel:', error);
          }
        }
      `;
      widgetRef.current.appendChild(script);

      // Cleanup function to prevent duplication
      return () => {
        if (widgetRef.current) {
          widgetRef.current.innerHTML = ''; // Clear all children including the script
        }
      };
    }
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder where the IDX widget will be rendered */}
          <div ref={widgetRef} />
        </div>
      </main>
    </>
  );
};

export default AgentPage;
