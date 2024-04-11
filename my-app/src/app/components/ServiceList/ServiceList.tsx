import React from 'react';
import './ServiceList.css';

const images = [
   { src: 'picture1.jpg', caption: 'How much is your home worth?'},
    { src:'picture2.jpg', caption: 'Lets find your dream '},
    { src: 'picture3.jpg', caption: 'Need a loan?'},
    { src: 'picture4.jpg', caption: 'For Sale'}
];

const ImageGallery = () => {
    const handleClick = (caption) => {
        console.log('Button clicked for: ${caption}');

    };
    return(
        <div className="image-container">
            {images.map((image, index) => (
                <div key={index} className="image-wrapper">
                    <button className="image-button" onClick={() => handleClick(image.caption)}></button>
                    <img src={ '/' + image.src} alt={'Image ${index + 1}'} className="circular-image"/>
                <div className="caption">{image.caption}</div>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;