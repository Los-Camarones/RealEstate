'use client';
import React from 'react';
import NavBar from '../components/Navbar/navbar';
import HomePageContent from '../components/HomePageContent/HomePageContent';
import './globals.css';
import SearchHomes from '../components/SearchHomes/SearchHomes';
import SocialMediaLinks from '../components/SocialMedia/socialmedia';
import Footer from '../components/Footer/footer';
import Reviews1 from '../components/Testimonials/Reviews';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import CarouselComponent from '../components/CarouselComponent/CarouselComponent'; // Importing the new carousel component
import ServiceList from '@/components/ServiceList/ServiceList';
import QuickSearchWidget from '@/components/QuickSearchwidget.tsx/OuickSearchwidget';

const Page: React.FC = () => {
  return (
    <>
      <SocialMediaLinks />
      <div> 
        {/* Navbar */}
        <NavBar />

        {/* Carousel */}
        <CarouselComponent /> {/* Using the new isolated CarouselComponent */}

        {/* Quick Search Widget */}   
        <QuickSearchWidget />

        {/* About Lourdes Section */}
        <HomePageContent />

        {/* Service List */}
        <ServiceList />

        {/* Photo Gallery */}
        <div>
          <center>
            <strong>
              <PhotoGallery />
            </strong>
          </center>
        </div>
        <hr></hr>
        {/* Reviews Section */}
        <div>
          <Reviews1 />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Page;
