// Reviews.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './Reviews.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { getTestimonials } from '../../actions/TestimonialsActions';
import { ITestimonial } from '../../types/database_interface';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getTestimonials(true);
        if (result.success) {
          setReviews(result.data ?? []);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className={styles.star}>⭐</span>
    ));
  };

  const settings = {
    infinite: true,
    speed: 8000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.reviewsContainer}>
      <header className={styles.headerContainer}>
        <h1 className={styles.header}>TESTIMONIALS</h1>
      </header>
      <Slider {...settings} className={styles.slider}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.card}>
              <a href="https://www.google.com/search?q=lourdes+mendoza+sacramento..." target="_blank" rel="noopener noreferrer">
                <div className={styles.cardHeader}>
                  <img src={review.profile_picture} className={styles.userPicture} alt="User Profile" />
                  <div>
                    <div className={styles.name}>- {review.user_name}</div>
                    <div className={styles.stars}>{renderStars(review.rating)}</div>
                  </div>
                </div>
                <div className={styles.reviewContent}>
                  <div className={styles.review}>{review.comments}</div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.date}>{new Date(review.created_at).toLocaleDateString()}</div>
                  <GoogleIcon className={styles.googleIcon} />
                </div>
              </a>
            </div>
          </div>
        ))}
      </Slider>
      <div className={styles.addReviewContainer}>
        <Link href="/property-organizer">
          <button className={styles.addReviewButton}>Add Testimonial</button>
        </Link>
      </div>
    </div>
  );
};

export default Reviews;