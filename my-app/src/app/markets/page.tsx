'use client';
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const MarketsPage = () => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  // State to hold the remaining time for the countdown
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    // Calculate the end date (two weeks from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    // Update the remaining time every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = endDate.getTime() - now;

      if (timeLeft < 0) {
        // If time is up, clear the interval
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Helper function to format the remaining time into days, hours, minutes, and seconds
  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Helper function to format the time in hh:mm:ss for the clock
  const formatClockTime = (time: number) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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

return (
  <>
    <Head>
      {/* SEO Meta Tags */}
      <title>Real Estate Markets</title>
      <meta
        name="description"
        content="Explore detailed real estate market information and trends. Get insights on various markets, including property values, market conditions, and more."
      />
    </Head>
    <NavBar />
    
        <main className="relative min-h-screen flex flex-col items-center justify-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/bailey-anselme-Bkp3gLygyeA-unsplash.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content Container */}
        <div className="relative z-10 text-center px-4 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Real Estate Markets</h1>
          <h2 className="text-6xl md:text-8xl font-bold mb-8">Coming Soon</h2>
          <p className="text-lg md:text-xl mb-4">Stay tuned! Look up houses based on your community.</p>
          {/* Countdown Timer */}
          <div className="text-3xl md:text-4xl font-bold mb-4">
            Time Remaining: {formatTime(remainingTime)}
          </div>
          {/* Wall Clock */}
          <div className="flex justify-center items-center mb-8">
            <div className="wall-clock rounded-full border-4 border-white w-48 h-48 flex items-center justify-center">
              <span className="text-2xl font-mono">{formatClockTime(remainingTime)}</span>
            </div>
          </div>
        </div>
        {/* IDX Markets Widget */}
        <div ref={pageRef} className="relative z-10 text-center mt-16 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg w-full max-w-5xl">
          <h3 className="text-xl font-semibold mb-4">Market Information Loading...</h3>
          <p className="text-sm mb-4">Please wait while we fetch the latest market data for you.</p>
        </div>
        <footer className="mt-16 text-center text-sm relative z-10 text-white">
          <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
        </footer>
      </main>
      <style jsx>{`
        .wall-clock {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </>
  );
};
export default MarketsPage;