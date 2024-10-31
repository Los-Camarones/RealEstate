"use client";
import React, { useEffect, useState } from "react";
import styles from "../Reviews.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/actions/TestimonialsActions";
import { ITestimonial } from "@/types/database_interface";
import { getPublicURL, uploadProfilePicture } from "@/actions/BucketActions";

const blankTestimonial: ITestimonial = {
  created_at: "",
  rating: 5,
  comments: "",
  user_name: "",
  profile_picture: "",
  is_displayed: false,
};

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string | null>();
  const [selectedReview, setSelectedReview] = useState<ITestimonial | null>();
  const [newProfilePic, setNewProfilePic] = useState<string | null>();
  const [file, setFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectReview = (review: ITestimonial) => {
    setSelectedReview(review);
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className={styles.star}>
        ⭐
      </span>
    ));
  };

  const handleUpdateReview = async () => {
    if (selectedReview) {
      const response = await updateTestimonial(selectedReview);
      if (response.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === selectedReview.id ? selectedReview : review
          )
        );
        setSelectedReview(null);
        setNewProfilePic(null);
        setError(null);
      } else {
        setError(response.error || "Failed to update the testimonial.");
      }
    }
  };

  const handleAddReview = async () => {
    if (selectedReview) {
      const response = await addTestimonial(selectedReview);
      if (response.success && response.data) {
        setReviews([...reviews, response.data[0]]);
        setSelectedReview(null);
        setNewProfilePic(null);
        setError(null);
      } else {
        setError(response.error || "Failed to add the testimonial.");
      }
    }
  };

  const handleDeleteReview = async (id: string) => {
    const response = await deleteTestimonial(id);
    if (response.success) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
      setSelectedReview(null);
    } else {
      setError(response.error || "Failed to delete the testimonial.");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await getTestimonials(false);
      if (result.success) {
        setReviews(result.data || []);
      } else {
        setError(result.error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <div className={styles.headerAdminContainer}>
        <button onClick={() => setSelectedReview({ ...blankTestimonial })}>
          Add a Testimonial
        </button>
        <header className={styles.headerText}>Manage Your Testimonials</header>
      </div>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div
            key={review.id || `${review.user_name}-temp-key`}
            className={styles.card}
            onClick={() => handleSelectReview(review)}
          >
            <img src={review.profile_picture || ""} className={styles.userPicture} alt="Profile" />
            <div className={styles.stars}>
              {renderStars(review.rating || 0)}
            </div>
            <div className={styles.date}>{review.created_at || "N/A"}</div>
            <div className={styles.review}>{review.comments || "No comments"}</div>
            <div className={styles.name}>- {review.user_name || "Anonymous"}</div>
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
            value={selectedReview.user_name || ""}
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                user_name: e.target.value,
              })
            }
          />
          <label>Testimonial</label>
          <textarea
            value={selectedReview.comments || ""}
            onChange={(e) => {
              setSelectedReview({
                ...selectedReview,
                comments: e.target.value,
              });
            }}
          />
          <label>Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={selectedReview.rating || 1}
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                rating: Number(e.target.value),
              })
            }
          />
          <label>Date</label>
          <input
            type="date"
            value={selectedReview.created_at || ""}
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                created_at: e.target.value,
              })
            }
          />
          <label>Display on homepage?</label>
          <input
            type="checkbox"
            checked={selectedReview.is_displayed || false}
            onChange={(e) =>
              setSelectedReview({
                ...selectedReview,
                is_displayed: e.target.checked,
              })
            }
          />
          <button onClick={selectedReview.id ? handleUpdateReview : handleAddReview}>
            {selectedReview.id ? "Save" : "Add"}
          </button>
          {selectedReview.id && (
            <button onClick={() => handleDeleteReview(selectedReview.id!)}>
              Delete
            </button>
          )}
          <button onClick={() => setSelectedReview(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
