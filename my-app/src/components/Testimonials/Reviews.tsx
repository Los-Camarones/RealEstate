// components/ReviewCardList.tsx
import React from 'react';
import styles from './Reviews.module.css'; // Import your CSS module for styling
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import Link from 'next/link'

type Review = {
  name: string;
  picture: string;
  date: string;
  stars: number;
  review: string;
};

const reviews: Review[] = [
  {
    name: 'cbulleri75',
    picture: '',
    date: '2024-09-24',
    stars: 5,
    review: "We can’t recommend Lourdes enough. Lourdes was our realtor through the purchase of two homes and the sale of another. She was also my parents realtor in the purchase of their home! Lourdes always held our hand throughout every experience, always making sure our questions and concerns were heard and quickly addressed. The process was honestly easy with Lourdes and her team, we simply had to sign the papers while they did all the heavy lifting. Lourdes understands the business and was able to make intelligent recommendations that produced fast results for us (we were able to sell and buy our dream home within 2 months). Even more remarkable, Lourdes listened and sought to understand our goals, she then made it her personal responsibility to ensure we achieved them. She understood what was important to us and remained focused until we realized our dreams. Lourdes works for you, as if you are her family. We could not be happier with our experiences with Lourdes, she truly made our dreams a reality."
  },
  {
    name: 'Brenda Lambert',
    picture: '',
    date: '2024-09-23',
    stars: 4,
    review: "After 5pm its nice to have an agent pick up let alone spend the amount of time to describe one of her listings. I appreciated her explanation of this property and her enthusiasm about the potential. She gave me facts not referrals to other sources which shows a true professional. I have not bought or sold a home yet with Lourdes but I intend to. In the past I have been a homeowner and a real estate agent/manager, I would refer her based on this first impression. No matter how much technology or stats, its going to be REALTOR like Lourdes to bring the buyer and seller together and make it a sold home." 
  },
  {
    name: 'Julian Pulido',
    picture: '/julianImage2.jpg',
    date: '2024-09-22',
    stars: 5,
    review: "Great and knowledgeable real estate agent. Would highly recommend to anyone looking to buy or sell a home."
  },
  {

    name: "Mohammad Ahmed",
    picture: 'MoAhmed.jpg',
    date: "2024-02-25",
    stars: 5,
    review: "Test"

  },
  {

    name: "Eric Delgado",
    picture: '/ericDelgado.jpg',
    date: "2024-02-25",
    stars: 5,
    review: "HAAAAAAAAAAAAAAA"

  },
  {

    name: "Julian Flores",
    picture: 'julianFlores.jpg',
    date: "2024-02-25",
    stars: 5,
    review: "ay yoooo"

  },
];



const Reviews: React.FC = () => {

  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className={styles.star}>⭐</span>
    ));
  };
  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.card}>
          <a href="https://www.google.com/search?q=lourdes+mendoza+sacramento&sca_esv=253929064fe52cf4&sca_upv=1&source=hp&ei=0mvzZtuaJOmxur8PxqDh-A4&iflsig=AL9hbdgAAAAAZvN54sQz_RSY9vy0t2JsVBrbvNNLg7s-&ved=0ahUKEwjby_j__NyIAxXpmO4BHUZQGO8Q4dUDCA8&uact=5&oq=lourdes+mendoza+sacramento&gs_lp=Egdnd3Mtd2l6Ihpsb3VyZGVzIG1lbmRvemEgc2FjcmFtZW50bzICECYyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjaIlAAWPkgcAB4AJABAJgBeaABlRCqAQQyNC4yuAEDyAEA-AEBmAIaoAK8EMICERAuGIAEGLEDGNEDGIMBGMcBwgIOEC4YgAQYsQMY0QMYxwHCAg4QABiABBixAxiDARiKBcICCxAuGIAEGLEDGIMBwgIOEC4YgAQYsQMYgwEYigXCAggQABiABBixA8ICBRAAGIAEwgIIEC4YgAQYsQPCAgUQLhiABMICCBAuGIAEGNQCwgILEAAYgAQYsQMYgwHCAg4QLhiABBjHARiOBRivAcICDRAuGIAEGMcBGAoYrwHCAgcQLhiABBgKwgILEC4YgAQYxwEYrwHCAgYQABgWGB7CAgsQABiABBiGAxiKBZgDAJIHBDIzLjOgB_WMAg&sclient=gws-wiz#lrd=0x809adb0ffbbe1a79:0x418e5ad19fe8b657,1,,,," target="_blank" rel="noopener noreferrer">
          <img src={review.picture}  className={styles.userPicture} />
          <div className={styles.stars}>{review.stars} {renderStars(review.stars)}</div>
          <div className={styles.date}>{review.date}</div>
          <div className={styles.review}>{review.review}</div>
          <div className={styles.name}>- {review.name}</div>
          <div className={styles.googleIcon}>
            <GoogleIcon />
          </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
