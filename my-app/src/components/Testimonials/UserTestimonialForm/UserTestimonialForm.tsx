import { ITestimonial } from "@/types/database_interface";
import React, { useState } from "react";
import styles from "./TestimonialForm.module.css";

const UserTestimonialForm = () => {
  const blank_url_profile_pic =
    "https://nczvyuangfyovbjycopv.supabase.co/storage/v1/object/public/testimonials_images/default_pfp.jpg";
  const [newTestimonial, setNewTestimonial] = useState<ITestimonial>({
    created_at: "",
    rating: 5,
    comments: "",
    user_name: "",
    profile_picture: blank_url_profile_pic,
    is_displayed: true,
  });
  const [newProfilePic, setNewProfilePic] = useState<string | null>();
  const [file, setFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //setPicture(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Create a Testimonial</header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => {
              setNewTestimonial({
                ...newTestimonial,
                comments: e.target.value,
              });
            }}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Date:</label>
          <input
            type="date"
            onChange={(e) => {
              setNewTestimonial({
                ...newTestimonial,
                created_at: e.target.value,
              });
            }}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Rating (1-5):</label>
          <select
            onChange={(e) => {
              setNewTestimonial({
                ...newTestimonial,
                comments: e.target.value,
              });
            }}            required
            className={styles.input}
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Picture (optional):</label>
          
          {newProfilePic ? (
            <img src={newProfilePic} alt="" />
          ) : (
            <img src={newTestimonial.profile_picture} alt="" />
          )}
          <input type="file" accept="image/*" onChange={handlePictureUpload} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserTestimonialForm;
