import React from 'react';
import './PhotoGallery.css'; // Import CSS file

const PhotoGallery = () => {
  const images = [
    {path:'amador.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Amador%20County_4_CA/map_9q9zttn3r;9qfw7yvz0'},
    {path:'butte.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Butte%20County_4_CA/map_9qcqcc3mv;9r1u563y7'},
    {path:'colusa.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Colusa_3_CA/map_9qcnyy5hd;9qcr2mm5n'},
    {path:'elDorado.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/El%20Dorado%20County_4_CA/map_9qcb6u5ym;9r48zp36p'},
    {path:'merced.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Merced%20County_4_CA/map_9q9bv1dh7;9qdx3b1pt'},
    {path:'monterey.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Monterey%20County_4_CA/map_9q35r8b7c;9qd5fdy24'},
    {path:'nevada.png',link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Nevada%20City_98_Nevada%20City%2C%20CA/map_9qctpzctp;9r41mwwq4'},
    {path:'placer.png',link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Placer%20County_4_CA/map_9qc95uqph;9r4em0nvv'},
    {path:'sacramento.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Sacramento%20County_4_CA/map_9qc34csup;9qfhd7kt7'},
    {path:'sanBenito.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/San%20Benito%20County_4_CA/map_9q3qx0pr2;9qd5b112s'},
    {path:'sanJoaquin.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/San%20Joaquin%20County_4_CA/map_9q9t9rtut;9qccznejj'},
    {path:'sanMateo.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/San%20Mateo%20County_4_CA/map_9q8gg8gdp;9q9ntpv26'},
    {path:'santaClara.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Santa%20Clara%20County_4_CA/map_9q91ekzjm;9q9w1ept3'},
    {path:'santaCruz.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Santa%20Cruz%20County_4_CA/map_9q90fjcqd;9q9ky6rye'},
    {path:'stanislaus.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Stanislaus%20County_4_CA/map_9q9drmwh6;9qf3m9gfg'},
    {path:'sutter.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Sutter%20County_4_CA/map_9qc5xd01x;9qcxveucb'},
    {path:'yolo.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Yolo%20County_4_CA/map_9qc16wrhf;9qcwe2f3d'},
    {path:'yuba.png', link: 'https://lourdesmendoza.metrolist.com/search/For_Sale/Yuba%20County_4_CA/map_9qct2meh7;9r1cw43rx'}
  ];

  return (
    <div className="photo-gallery">
      {images.map((image, index) => (
        <div key={index} className="photo">
          <a href={image.link} target="_blank" rel="noopener noreferrer">
            <img src={image.path} alt={`Image ${index + 1}`} />
          </a>
        </div>
      ))}
    </div>
  );
};


export default PhotoGallery;


