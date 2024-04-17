'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from './components/Navbar/navbar';
import HomePageContent from './components/HomePageContent/HomePageContent';
import "./globals.css";
import SearchHomes from './components/SearchHomes/SearchHomes';
import ServiceList from './components/ServiceList/ServiceList';

import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SocialMediaLinks from './components/SocialMedia/socialmedia';
import exp from 'constants';

const background_adjust = "h-80 w-full object-cover mb-4";

function Page(){ 

  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => { // Auto play the carousel
    const interval = setInterval(() => {
      setSelectedItem((prevSelectedItem) => (prevSelectedItem + 1) % 3); // Replace 3 with the number of images
    }, 3000); // Change the number to adjust the speed of the carousel

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);
  


  return (
    <>
      <SocialMediaLinks/>
      <div> {/* Main container */}
        <div className="flex justify-between p-4 bg-gray-500 text-white">
          <div className="flex items-center">
            <button>
              <Image src="/logo_.png" alt="logo" width={150} height={150} />
            </button>
          </div>
          <NavBar />
        </div>

        <Carousel autoPlay interval={2000} infiniteLoop useKeyboardArrows dynamicHeight showIndicators={false} showThumbs={false} showStatus={false} selectedItem={selectedItem} onChange={setSelectedItem} showArrows={false}>
          <div className= {background_adjust}>
            <img src="/MyBR.jpg" alt="Image 4" />
          </div>
          <div className = {background_adjust}>
            <img src="/picture2.jpg" alt="Image 1" />
          </div>
          <div className = {background_adjust}>
            <img src="/picture3.jpg" alt="Image 2" />
          </div>
          <div className = {background_adjust}>
            <img src="/picture4.jpg" alt="Image 3" />
          </div>
        </Carousel>

        <div>
          {/*Search component*/}
          <SearchHomes/>
        </div>


      
      <div>
      <div>
        {/*about lourdes section*/}
        <HomePageContent/>
      </div>
      </div>

        {/*Service List*/}
        <div>
          <ServiceList/>
        </div>


        {/* Rest of the page content */}

      
      </div>
    </>
  );
}

export default Page;