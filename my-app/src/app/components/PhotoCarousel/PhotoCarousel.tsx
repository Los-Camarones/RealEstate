//without caption
// PhotoCarousel.js
import React, { useState, useEffect } from 'react';
import './PhotoCarousel.css';


const PhotoCarousel = ({ /*image paths*/}) => {
  const imagePaths = [
   'amador.png',
   'butte.png',
   'colusa.png',
   'elDorado.png',
   'merced.png',
   'monterey.png',
   'nevada.png',
   'placer.png',
   'sacramento.png',
   'sanBenito.png',
   'sanJoaquin.png',
   'sanMateo.png',
   'santaClara.png',
   'santaCruz.png',
   'stanislaus.png',
   'sutter.png',
   'yolo.png',
   'yuba.png'

  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 3000); // Auto slide change every 5 seconds
    return () => clearInterval(interval);
  }, [imagePaths.length]);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel-container">
      {imagePaths.map((image, index) => (
        <img
          key={index}
          className={`carousel-image ${index === slideIndex ? 'active' : ''}`}
          src={image}
          alt={`Image ${index + 1}`}
        />
      ))}
      <div className="carousel-controls">
        <button onClick={prevSlide}>&#10094;</button>
        <button onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default PhotoCarousel;

