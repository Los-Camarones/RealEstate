'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import HomePageContent from './components/HomePageContent/HomePageContent';
import "./globals.css";
import SearchHomes from './components/SearchHomes/SearchHomes';
import ServiceList from './components/ServiceList/ServiceList';

function Page(){ // Assuming data is passed as a prop (modify if needed)
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

      <div>
        {/*Search component*/}
        <SearchHomes/>
      </div>
      
      <div>
        {/*about lourdes section*/}
        <HomePageContent/>
      </div>


      {/*Service List*/}
      <div>
        
        <ServiceList/>
      </div>


      {/* Rest of the page content */}
      <div>

      </div>


   {/* Footer */}
   <Footer/>
        
      
      </div>
   );
  
}

export default Page;


