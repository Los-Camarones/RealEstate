//reviews.tsx

//Collect all client reviews from various platforms and create a static page that displays these reviews. Including platform where it was found

import React from 'react';
import './reviews.css';

interface review {
    text: string;

    rating: number;
}

//static reviews
const Reviews: review[] = [
    {text: "We can’t recommend Lourdes enough. Lourdes was our realtor through the purchase of two homes and the sale of another. She was also my parents realtor in the purchase of their home! Lourdes always held our hand throughout every experience, always making sure our questions and concerns were heard and quickly addressed. The process was honestly easy with Lourdes and her team, we simply had to sign the papers while they did all the heavy lifting. Lourdes understands the business and was able to make intelligent recommendations that produced fast results for us (we were able to sell and buy our dream home within 2 months). Even more remarkable, Lourdes listened and sought to understand our goals, she then made it her personal responsibility to ensure we achieved them. She understood what was important to us and remained focused until we realized our dreams. Lourdes works for you, as if you are her family. We could not be happier with our experiences with Lourdes, she truly made our dreams a reality. -cbulleri75", rating: 5 },
    {text: "After 5pm its nice to have an agent pick up let alone spend the amount of time to describe one of her listings. I appreciated her explanation of this property and her enthusiasm about the potential. She gave me facts not referrals to other sources which shows a true professional. I have not bought or sold a home yet with Lourdes but I intend to. In the past I have been a homeowner and a real estate agent/manager, I would refer her based on this first impression. No matter how much technology or stats, its going to be REALTOR like Lourdes to bring the buyer and seller together and make it a sold home. - Brenda Lambert" , rating: 5},
    {text: "review 3, -name", rating: 5},
];

//star rating componenet 

const StarRating: React.FC<{rating: number}> = ({rating}) => {
    return (
        <div className="star-rating" data-rating={rating}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
        </div>
    );
};


//reviews component 
const reviews: React.FC = () => {
    return (
        <section id="reviews">
            <h2>Client Reviews</h2>
            {Reviews.map((Review,index) => (
                <div key={index} className="review">
                    <p className="review-text">"{Review.text}" </p>
                        <StarRating rating={Review.rating} />
                    
                </div>
            ))}
        </section>
    );
};

export default reviews;