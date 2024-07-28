import React from 'react';
import './PhotoGallery.css'; // Import CSS file

const PhotoGallery = () => {
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

  return (
    <div className="photo-gallery">
      {imagePaths.map((image, index) => (
        <div key={index} className="photo">
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;


