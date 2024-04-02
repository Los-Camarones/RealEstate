import React from 'react';
import Image from 'next/image';
import NavBar from './navbar';
import HomePageContent from './HomePageContent';
import "./globals.css";

function Page() {
  return (
    <div> {/* Main container */}
      <div className="flex justify-between p-4 bg-gray-500 text-white">
        <div className="flex items-center">
          <button>
            <Image src="/logo_.png" alt="logo" width={150} height={150} />
          </button>
        </div>
        <NavBar />
      </div>

      {/* Background photo */}
      <div style={{
        backgroundImage: "url('/MyBR.jpg')", // background image
        backgroundSize: 'cover', // Cover the entire area of the div
        backgroundPosition: 'center', // Center the background image
        height: '100vh', // Make it take the full height of the viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Text Overlay */}
        <div className="overlay-content" style={{ textAlign: 'center', color: '#fff' }}> {/* Adjust the color based on your background */}
          <h1>Transform your Dreams Into a Luxurious Address!</h1>
          <h2>Lourdes Mendoza</h2>
          <h3>The 0007 Real Estate Agent</h3>
          <p>Powered by BIG BLOCK REALTY NORTH</p>
          </div>
      </div>

      {/* About Lourdes Section */}
      <HomePageContent />

      {/* Rest of the page content */}
    </div>
  );
}

export default Page;


