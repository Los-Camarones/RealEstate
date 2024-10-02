import React from 'react';
import './PhotoGallery.css'; // Import the updated CSS

const PhotoGallery = () => {
  const images = [
    { name: 'SACRAMENTO', path: 'Sacramento.jpg', link: 'https://www.lourdesmendoza.com/listing-report?id=2816179' },
    { name: 'YUBA CITY', path: 'yuba.jpg', link: 'https://www.lourdesmendoza.com/listing-report?id=2816182' },
    { name: 'ELK GROVE', path: 'elk+grove.jpeg', link: 'https://www.lourdesmendoza.com/listing-report?id=2814737' },
    // Add more Areas of expee rtise
  ];

  return (
    <div className="photo-gallery-container">
    <div className="heading">
      <h2>AREAS OF EXPERTISE</h2>
      <div className="underline"></div>
    </div>
    <div className="photo-gallery">
      {images.map((image, index) => (
        <div key={index} className="photo">
          <a href={image.link} target="_blank" rel="noopener noreferrer">
            <img src={image.path} alt={image.name} />
            <div className="overlay">
              <div>
                <h3>{image.name}</h3>
                <button>Explore</button>
              </div>
            </div>
          </a>
        </div>
        
      ))}
    </div>
    </div>
  );
};

export default PhotoGallery;
