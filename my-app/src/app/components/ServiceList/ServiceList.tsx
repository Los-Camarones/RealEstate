import React from 'react';
import Link from 'next/link';
import './ServiceList.css';

const images = [
   { src: 'picture1.jpg', caption: 'How much is your home worth?', route: '/WhatMyHomeWorth'},
    { src:'picture2.jpg', caption: 'Lets find your dream home', route: '/listings'},
    { src: 'picture3.jpg', caption: 'Need a loan?', route: '/Sellers'},
    { src: 'picture4.jpg', caption: 'For Sale', route: '/Sellers'}
];

const ImageGallery = () => {
    
    return(
        <div className="image-container">
            {images.map((image, index) => (
                <div key={index} className="image-wrapper">
                    <Link href ={image.route} className="image-link">
                    
                    <img src={ '/' + image.src} alt={'Image ${index + 1}'} className="circular-image"/>
                <div className="caption">{image.caption}</div>
                    
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;