"use client";
import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css'; // Import your CSS module for styling
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import { getTestimonials } from '../../actions/TestimonialsActions';
import Link from 'next/link';
import { ITestimonial } from '../../types/database_interface';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string>();

  // Fetch user information from Supabase
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

  return (
    <div>
      <header className={styles.headerContainer}>
        <h1 className={styles.header}>TESTIMONIALS</h1>
      </header>
      <div className={styles.reviewList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.card}>
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
                <div className={styles.date}>{review.created_at}</div>
                <GoogleIcon className={styles.googleIcon} />
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className={styles.addReviewContainer}>
        <Link href="/property-organizer">
          <button className={styles.addReviewButton}>Add Testimonial</button>
        </Link>
      </div>
    </div>
  );
};

export default Reviews;
