// components/ReviewCardList.tsx
import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css'; // Import your CSS module for styling
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import { getTestimonials } from '../../actions/TestimonialsActions';
import { UUID } from 'crypto';
import { IReview } from '../../types/database_interface';



const Reviews: React.FC = () => {

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [error, setError] = useState<string>();

    //fetch user information from supabase
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const result = await getTestimonials();

          if(result.success) {
            setReviews(result.data ?? []);
          }
          else {
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
    <header>
      <h1 className={styles.header}>Testimonials</h1>
    </header>
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.card}>
          <a href="https://www.google.com/search?q=lourdes+mendoza+sacramento&sca_esv=253929064fe52cf4&sca_upv=1&source=hp&ei=0mvzZtuaJOmxur8PxqDh-A4&iflsig=AL9hbdgAAAAAZvN54sQz_RSY9vy0t2JsVBrbvNNLg7s-&ved=0ahUKEwjby_j__NyIAxXpmO4BHUZQGO8Q4dUDCA8&uact=5&oq=lourdes+mendoza+sacramento&gs_lp=Egdnd3Mtd2l6Ihpsb3VyZGVzIG1lbmRvemEgc2FjcmFtZW50bzICECYyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjaIlAAWPkgcAB4AJABAJgBeaABlRCqAQQyNC4yuAEDyAEA-AEBmAIaoAK8EMICERAuGIAEGLEDGNEDGIMBGMcBwgIOEC4YgAQYsQMY0QMYxwHCAg4QABiABBixAxiDARiKBcICCxAuGIAEGLEDGIMBwgIOEC4YgAQYsQMYgwEYigXCAggQABiABBixA8ICBRAAGIAEwgIIEC4YgAQYsQPCAgUQLhiABMICCBAuGIAEGNQCwgILEAAYgAQYsQMYgwHCAg4QLhiABBjHARiOBRivAcICDRAuGIAEGMcBGAoYrwHCAgcQLhiABBgKwgILEC4YgAQYxwEYrwHCAgYQABgWGB7CAgsQABiABBiGAxiKBZgDAJIHBDIzLjOgB_WMAg&sclient=gws-wiz#lrd=0x809adb0ffbbe1a79:0x418e5ad19fe8b657,1,,,," target="_blank" rel="noopener noreferrer">
          <img src={review.profile_picture}  className={styles.userPicture} />
          <div className={styles.stars}>{review.rating} {renderStars(review.rating)}</div>
          <div className={styles.date}>{review.created_at}</div>
          <div className={styles.review}>{review.comments}</div>
          <div className={styles.name}>- {review.user_name}</div>
          <div className={styles.googleIcon}>
            <GoogleIcon />
          </div>
          </a>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Reviews;
