'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const Sellers = () => {
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>Sellers</title>
        <meta name="description" content="Find out how much your house is worth and stay tuned for our new features!" />
      </Head>
      <NavBar />

      <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/bailey-anselme-Bkp3gLygyeA-unsplash.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-4 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Sellers Page is</h1>
          <h2 className="text-6xl md:text-8xl font-bold mb-8">Coming Soon</h2>
          <p className="text-lg md:text-xl mb-4">Stay Tuned!</p>

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

          <button
            className="mt-8 px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-200 transition duration-300"
            onClick={() => router.push('/valuation')}
          >
            Want to know how much your house is worth? Click here
          </button>
        </div>

        <div className="mt-16 max-w-lg text-center relative z-10">
          <h3 className="text-xl font-semibold">About Us</h3>
          <p className="text-sm mt-4">
            We are working on something amazing! Stay tuned for our new website launch where you can find all the information you need.
            Subscribe below to be the first to know about our launch.
            -Los Camarones Team
          </p>
          <div className="mt-8 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
              Subscribe Now
            </button>
          </div>
        </div>

        <footer className="mt-16 text-center text-sm relative z-10">
          <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        .wall-clock {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </>
  );
};

export default Sellers;
