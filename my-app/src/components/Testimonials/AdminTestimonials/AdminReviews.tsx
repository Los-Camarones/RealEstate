"use client";
// components/ReviewCardList.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "../Reviews.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import { getTestimonials, addTestimonial, updateTestimonial } from "@/actions/TestimonialsActions";
//deleteTestimonial, updateTestimonial,
import { ITestimonial } from "@/types/database_interface";
import { uploadProfilePicture } from "@/actions/BucketActions";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<ITestimonial | null>(
    null
  );

  const blank_url_profile_pic = "https://nczvyuangfyovbjycopv.supabase.co/storage/v1/object/sign/testimonials_images/blank_profile_icon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0aW1vbmlhbHNfaW1hZ2VzL2JsYW5rX3Byb2ZpbGVfaWNvbi5wbmciLCJpYXQiOjE3MjczMDc0NDcsImV4cCI6MTg1MzQ1MTQ0N30.-qlz-sDf4SA7nBM6NUQiC2-katb6pKZJN5xiFW5kzx0&t=2024-09-25T23%3A37%3A27.799Z"
  const [newTestimonial, setNewTestimonial] = useState<ITestimonial>({
    created_at: "",
    rating: 5,
    comments: "",
    user_name: "",
    profile_picture: blank_url_profile_pic,
    is_displayed: true,
  });

  const [newProfilePic, setNewProfilePic] = useState<string>();
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setNewProfilePic(url);
        setSelectedReview((selectedReview) => {
          if (selectedReview) {
            return {
              ...selectedReview,
              profile_picture: url, // Ensure this is correctly set
            };
          }
          // If prevReview is null, return an initial structure
          return {
            created_at: "",
            rating: 5,
            comments: "",
            user_name: "",
            profile_picture: "",
            is_displayed: true,
          }; // Cast it as ITestimonial
        });
      }
    }
  };


  const handleSelectReview = (review: ITestimonial) => {
    setSelectedReview(review);
  };

  const handleDeleteReview = async (id?: string) => {
    //await deleteTestimonial(id);
    setReviews(reviews.filter((review) => review.id !== id));
    setSelectedReview(null); // Close sidebar after deletion
  };

  const handleUpdateReview = async () => {
    if (selectedReview) {

      const response = await updateTestimonial(selectedReview);

      if (response.success && response.data) {
        setSuccess(true);

        // Update the review in the array
        setReviews((prevReviews) => 

        //loop through each review to map a function
        prevReviews.map((review) => 
          
          //if the id matches the id updated review, update our array with new value. else just keep same review
          review.id === response.data[0].id ? response.data[0] : review
        )
      );      
    } else {
        console.log("failed ", response.error);
        setError(response.error);
        setSuccess(false);
      }
      // setReviews(reviews.map(r => (r.id === selectedReview.id ? updatedReview : r)));
      setSelectedReview(null); // Close sidebar after update
    }
  };

  const handleAddReview = async () => {
  
    //if a date, username, and rating exists
    if (selectedReview?.created_at && selectedReview.user_name && selectedReview.rating) {

      //check if the user added a new profile pic 
      if(newProfilePic) {
        //add to supabase bucket
        const response = await uploadProfilePicture(newProfilePic);
        
        if(response.success) {
          console.log("uploaded profile pic successfully!");
          console.log(response.data);
        } else {
          console.log(response.error);
        }
      }

      //add review on supabase
      const response = await addTestimonial(selectedReview);

      if (response.success && response.data) {
        console.log("Successfully added testimonial!");
        setSuccess(true);
        //refresh our reviews
       setReviews([...reviews, response.data[0]]);
      } else {
        console.log("failed ", response.error);
        setError(response.error);
        setSuccess(false);
      }
    }


    //set the new testimonial to blank for additional input
    setNewTestimonial({
      created_at: "",
      rating: 5,
      comments: "",
      user_name: "",
      profile_picture: "",
      is_displayed: true,
    });
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className={styles.star}>
        ⭐
      </span>
    ));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getTestimonials(false);
        if (result.success) {
          setReviews(result.data ?? []);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchReviews();
  }, [setReviews]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>Manage Your Testimonials</header>
      {error && <h1>{error}</h1>}
      <button
        className={styles.button}
        //everytime you click on "add testimonial" , a blank new Testimonial is set as your selected Review
        onClick={() => setSelectedReview({ ...newTestimonial })}
      >
        Add a Testimonial
      </button>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={styles.card}
            onClick={() => handleSelectReview(review)}
          >
            <img src={review.profile_picture} className={styles.userPicture} />
            <div className={styles.stars}>
              {review.rating} {renderStars(review.rating)}
            </div>
            <div className={styles.date}>{review.created_at}</div>
            <div className={styles.review}>{review.comments}</div>
            <div className={styles.name}>- {review.user_name}</div>
            <div className={styles.googleIcon}>
              <GoogleIcon />
            </div>
          </div>
        ))}
      </div>

      {selectedReview && (
        <div className={styles.sidebar}>
          <h3>{selectedReview.id ? "Edit Testimonial" : "Add Testimonial"}</h3>

          <label>First and Last Name</label>
          <input
            type="text"
            placeholder="John Smith"
            value={selectedReview.user_name}
            required
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                user_name: e.target.value,
              })
            }
          />
          <label>Profile Picture (optional)</label>

          {newProfilePic ? (<img src={newProfilePic} alt="" />) : (<img src={selectedReview.profile_picture} alt="" />)}

          <div>
            {isEditing ? (
              <input type="file" onChange={handleProfilePicChange} />
            ) : (
              <button className={styles.button} onClick={() => setIsEditing(true)}>Change Profile Picture</button>
            )}
          </div>


          <label>Testimonial </label>
          <textarea
            value={selectedReview.comments || ""}
            onChange={(e) => {
              setSelectedReview({
                ...selectedReview,
                comments: e.target.value,
              });
            }}
            placeholder="Lourdes is Amazing!"
            style={{
              display: "block",
              minWidth: "200px",
              minHeight: "300px",
              padding: "5px",
              border: "1px solid #000000",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              color: selectedReview.comments ? "inherit" : "#aaa",
              overflow: "hidden",
              resize: "none", // Prevent resizing with the mouse
            }}
            rows={1
            }
          />


          <label>Rating 1-5 </label>
          <input
            type="number"
            min="1"
            max="5"
            required
            placeholder="Rating"
            value={selectedReview.rating}
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                rating: Number(e.target.value),
              })
            }
          />

          <label>Date </label>

          <input
            type="date"
            required
            placeholder="Date YYYY-MM-DD"
            value={
              selectedReview.created_at
                ? selectedReview.created_at
                : "2024-12-01"
            }
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                created_at: e.target.value,
              })
            }
          />

          <label id="displayBox">Display on homepage?</label>
          <input
            id="displayBox"
            type="checkbox"
            checked={selectedReview.is_displayed}
            required
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                is_displayed: e.target.checked,
              })
            }
          />

          <button
            onClick={selectedReview.id ? handleUpdateReview : handleAddReview}
          >
            {selectedReview.id ? "Save" : "Add"}
          </button>
          {selectedReview.id && (
            <button onClick={() => handleDeleteReview(selectedReview.id)}>
              Delete
            </button>
          )}
          <button onClick={() => setSelectedReview(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
