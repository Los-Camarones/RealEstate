// CarouselComponent.tsx

import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const background_adjust = "relative w-full mb-4"; // Removed h-80 from here, we will set height in img

const carouselImages = [
  "/picture2.jpg",
  "/MyBR.jpg",
  "/picture4.jpg",
  "/322 Tomato Alley Front Room Sofa View.jpg",
  "/322 Tomato Alley Front Room.jpg",
  "/322 Tomato Alley Front View w gate.jpg",
  "/322 Tomato Alley Kitchen View.jpg",
  "/f8-1813109-1838001-08.jpg",
  "/f8-1813109-1838001-10.jpg",
  "/f8-1813109-1838002-12.jpg",
];

const CarouselComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    // Auto play the carousel
    const interval = setInterval(() => {
      setSelectedItem((prevSelectedItem) => (prevSelectedItem + 1) % carouselImages.length); // Use the length of the images array
    }, 4000); // Change the number to adjust the speed of the carousel

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <div className="relative">
      {/* Carousel with changing images */}
      <Carousel
        autoPlay
        interval={4000}
        infiniteLoop
        useKeyboardArrows
        dynamicHeight
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        selectedItem={selectedItem}
        onChange={setSelectedItem}
        showArrows={true}
      >
        {carouselImages.map((imgSrc, index) => (
          <div key={index} className={background_adjust}>
            <img
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className="w-full h-screen object-cover" // Make the images full screen height
            />
          </div>
        ))}
      </Carousel>

      {/* Fixed text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-4">
        <h1 className="heading1">Turning Your Dreams into an Address</h1>
        <h2 className="heading2">LOURDES MENDOZA</h2>
        <h3 className="heading3">Big Block Realty North® | CA DRE# 01527343</h3>
        <a href="#footer">
          <button className="contact-btn">Contact Me</button>
        </a>
      </div>
    </div>
  );
};

export default CarouselComponent;


