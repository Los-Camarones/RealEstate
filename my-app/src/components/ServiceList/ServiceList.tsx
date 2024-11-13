import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import './ServiceList.css';

const images = [
  { src: 'picture1.jpg', caption: 'How much is your home worth?', route: '/valuation' },
  { src: 'picture2.jpg', caption: "Let's find your dream home!", route: '/property-search' },
  { src: 'picture3.jpg', caption: 'Need a loan?', route: '/GetPreQualified' },
  { src: 'picture4.jpg', caption: 'Looking to sell?', route: '/Sellers' },
];

const ImageGallery = () => {
  return (
    <div className="image-container">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={image.route} className="image-link">
            <img
              src={`/${image.src}`}
              alt={`Image ${index + 1}`}
              className="image"
            />
            <div className="caption">{image.caption}</div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;