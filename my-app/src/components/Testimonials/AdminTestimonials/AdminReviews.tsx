"use client";
// components/ReviewCardList.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "../Reviews.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import { getTestimonials, addTestimonial } from "@/actions/TestimonialsActions";
//deleteTestimonial, updateTestimonial,
import { ITestimonial } from "@/types/database_interface";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string>();
  const [selectedReview, setSelectedReview] = useState<ITestimonial | null>(
    null
  );

  const [newTestimonial, setNewTestimonial] = useState<ITestimonial>({
    created_at: "",
    rating: 5,
    comments: "",
    user_name: "",
    profile_picture: "",
    is_displayed: true,
  });

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
  }, []);

  const handleSelectReview = (review: ITestimonial) => {
    setSelectedReview(review);
  };

  const handleDeleteClick = async (id?: string) => {
    //await deleteTestimonial(id);
    setReviews(reviews.filter((review) => review.id !== id));
    setSelectedReview(null); // Close sidebar after deletion
  };

  const handleUpdateReview = async () => {
    if (selectedReview) {
      // const updatedReview = await updateTestimonial(selectedReview);
      // setReviews(reviews.map(r => (r.id === selectedReview.id ? updatedReview : r)));
      setSelectedReview(null); // Close sidebar after update
    }
  };

  const handleAddReview = async () => {
    const addedReview = await addTestimonial(newTestimonial);
    setReviews([...reviews, newTestimonial]);
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>Manage Your Testimonials</header>

      <button
        className={styles.button}
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
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                user_name: e.target.value,
              })
            }
          />
<label>Profile Picture (optional)</label>
<input
  type="file"
  accept="image/*" // Only allows image files
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedReview({ ...selectedReview, profile_picture: event.target?.result as string });
      };
      reader.readAsDataURL(file); // Convert image to base64 URL for preview
    }
  }}
/>
          <label>Testimonial </label>
          <span
            contentEditable
            suppressContentEditableWarning
            style={{
              display: "inline-block",
              minWidth: "200px",
              minHeight: "30px",
              padding: "5px",
              border: "1px solid #000000",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              color: selectedReview.comments ? "inherit" : "#aaa", // Placeholder color
            }}
            onInput={(e) => {
              const target = e.target as HTMLSpanElement;
              setSelectedReview({
                ...selectedReview,
                comments: target.innerText,
              });
            }}
          >
            {selectedReview.comments || "ex: Lourdes is amazing!"}
          </span>

          <label>Rating 1-5 </label>
          <input
            type="number"
            min={1}
            max={5}
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
          <button
            onClick={selectedReview.id ? handleUpdateReview : handleAddReview}
          >
            {selectedReview.id ? "Save" : "Add"}
          </button>
          {selectedReview.id && (
            <button onClick={() => handleDeleteClick(selectedReview.id)}>
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
