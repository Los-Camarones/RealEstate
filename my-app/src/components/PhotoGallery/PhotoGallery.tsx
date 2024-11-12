import React from 'react';
import './PhotoGallery.css'; // Import the updated CSS

const PhotoGallery = () => {
  const images = [
    { name: 'SACRAMENTO', path: 'Sacramento.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=798' },
    { name: 'YUBA CITY', path: 'yuba.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=1033' },
    { name: 'ELK GROVE', path: 'elk+grove.jpeg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=271' },
    // Add more Areas of expee rtise
    { name: 'El Dorado Hills', path: 'cc-el-dorado-county-ca-homes-for-sale-2-630-410.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=262'},
    { name: 'Olivehurst', path: 'sutter-county-ca-homes-for-sale-2-630-410.jpg' , link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=647'},
    { name: 'Fair Oaks', path: 'san-joaquin-county-ca-homes-for-sale-630-410.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=282'},
    { name: 'Folsom', path: 'colusa-county-ca-homes-for-sale-2-630-410.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=294'},
    { name: 'Davis', path: 'Davis.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=216'},
    { name: 'Carmichael', path:'stanislaus-county-ca-homes-for-sale-2-630-410.jpg', link: 'https://www.lourdesmendoza.com/property-search?boardId=6&bedrooms=0&bathCount=0&propertyType=SFR,CND&status=active&sort=importDate&dateRange=0&cityId=137'}
  ];

  return (
    <div className="photo-gallery-container">
    <div className="heading">
      <h2>EXPLORE BY COUNTY</h2>
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
