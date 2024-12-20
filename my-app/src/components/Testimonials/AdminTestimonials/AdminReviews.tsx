"use client";
// components/ReviewCardList.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./admin.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/actions/TestimonialsActions";
//deleteTestimonial, updateTestimonial,
import { ITestimonial } from "@/types/database_interface";
import { getPublicURL, uploadProfilePicture } from "@/actions/BucketActions";

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ITestimonial[]>([]);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<ITestimonial | null>();
  const [message, setMessage] = useState<string | null>(null);


  const blank_url_profile_pic ="https://nczvyuangfyovbjycopv.supabase.co/storage/v1/object/public/testimonials_images/default_pfp.jpg"
  const [newTestimonial] = useState<ITestimonial>({
    created_at: "",
    rating: 5,
    comments: "",
    user_name: "",
    profile_picture: blank_url_profile_pic,
    is_displayed: false,
  });

  const [newProfilePic, setNewProfilePic] = useState<string | null>();
  const [file, setFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      //check file size to make sure its less than 1mb
      if(file.size >= 1000000) {
        setError("Image size cannot exceed 1mb");
        return;
      } else {
        setError(null);
      }


      if (file) {
        setFile(file);

        const url = URL.createObjectURL(file);
        setNewProfilePic(url);
        setSelectedReview((selectedReview) => {
          if (selectedReview) {
            return {
              ...selectedReview,
              profile_picture: url,
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
          };
        });
      }
    }
  };


  const handleSelectReview = (review: ITestimonial) => {
    setSelectedReview(review);
  };

  const handleDeleteReview = async (id: string) => {
    const response = await deleteTestimonial(id);
    if (response.success) {
      showAlert('Testimonial deleted successfully!');
      setReviews((prev) => prev.filter((review) => review.id !== id));
      setSelectedReview(null);
    } else {
      setError(response.error || "Failed to delete the testimonial.");
    }
  };

  /**
   * Activated when clicked on 'save' review
   * If there is a new profile picture, it uploads new one and sets it
   * Sets any new attributes if they were updated
   * @returns 
   */
  const handleUpdateReview = async () => {
    if (selectedReview?.created_at &&selectedReview.user_name &&selectedReview.rating) {

      //create temporary variable to hold our selected review
      let updatedReview: ITestimonial = { ...selectedReview};

      //handle change if profile picture was changed and 
      if(newProfilePic && file) {

        //convert the file to base64
        const fileBase64 = await fileToBase64(file);

        //upload to supabase
        const response = await uploadProfilePicture(selectedReview.user_name, fileBase64);

        if (response.success && response.data?.path) {
          console.log("uploaded profile pic successfully!");

          //grab the image name after uploading on supabase
          const new_image_name = response.data?.path;

          //fetch the url of the image that is store on the bucket of supabase
          const responseUrl = await getPublicURL(new_image_name);

          if (responseUrl.success && responseUrl.data) {

            //grab the public url
            const publicURL = responseUrl.data.publicUrl;

            // Update the state with the new profile picture URL
            updatedReview = {
              ...selectedReview,  // Spread the current state
              profile_picture: publicURL,  // Update the profile picture
            };
          
            // Set state to updated review
            setSelectedReview(updatedReview);

          } else {
            console.log(responseUrl.error);
            setError(responseUrl.error);
          }
        } else {
          console.log("uploaded picture failed");
          console.log(response.error);
          setError(response.error);

          //return so you dont add this testimonial until they fix uploading picture issue
          return;

        }
      }
      const response = await updateTestimonial(updatedReview);

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

        showAlert('Testimonial updated successfully!');


        setError(null);

      } else {
        console.log("failed ", response.error);
        setError(response.error);
        setSuccess(false);
        return;
      }
      setSelectedReview(null); // Close sidebar after update
      setNewProfilePic(null);
    } else {
      //comments, username, or rating wasn't provided
      setError("Missing input. Please fill out name, date, and the rating.")
    }
  };

  /**
   * Activated when clicked on "add" testimonial
   * If there was a profile picture, handles converting to base64 and uploading to supabase
   * Uploads the testimonial/review with current attributes to supabase
   * Updates the reviews array on the client side
   * @returns 
   */
  const handleAddReview = async () => {

    //if a date, username, and rating exists
    if (selectedReview?.created_at &&selectedReview.user_name &&selectedReview.rating) {

      //create temporary variable to hold our selected review
      let updatedReview: ITestimonial = { ...selectedReview};

      //check if the user added a new profile pic
      if (newProfilePic && file) {

        //add to supabase bucket
        const fileBase64 = await fileToBase64(file);
        const response = await uploadProfilePicture(selectedReview.user_name, fileBase64);

        if (response.success && response.data?.path) {
          console.log("uploaded profile pic successfully!");

          //grab the image name after uploading on supabase
          const new_image_name = response.data?.path;

          //fetch the url of the image that is store on the bucket of supabase
          const responseUrl = await getPublicURL(new_image_name);

          if (responseUrl.success && responseUrl.data) {
            //grab the public url
            const publicURL = responseUrl.data.publicUrl;

            // Update the state with the new profile picture URL
            updatedReview = {
              ...selectedReview,  // Spread the current state
              profile_picture: publicURL,  // Update the profile picture
            };
          
            // Set state to updated review
            setSelectedReview(updatedReview);

          } else {
            console.log(responseUrl.error);
            setError(responseUrl.error);
          }
        } else {
          console.log("uploaded picture failed");
          console.log(response.error);
          setError(response.error);

          //return so you dont add this testimonial until they fix uploading picture issue
          return;

        }
      }
      console.log("printing testimonial before adding" ,updatedReview);
      //add review on supabase
      const response = await addTestimonial(updatedReview);

      if (response.success && response.data) {
        console.log("Successfully added testimonial!");
        setSuccess(true);

        showAlert('Testimonial added successfully!');


        //refresh our reviews
        setReviews([...reviews, response.data[0]]);

        //set our selectedReview to null
        setSelectedReview(null);

        //set error to null if there was one 
        setError(null);

      } else {
        console.log("failed ", response.error);
        setError(response.error);
        setSuccess(false);
      }
    } else {
      //comments, username, or rating wasn't provided
      setError("Missing input. Please fill out name, date, and the rating.")
    }


    setSelectedReview(null); // Close sidebar after update
    setNewProfilePic(null);
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, i) => (
      <span key={i} className={styles.star}>
        ⭐
      </span>
    ));
  };

  /**
   * Function to convert image file to base64 format
   * @param file image of file type
   * @returns 
   */
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file); // Read the file as a base64 encoded string

      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1]; // Extract the base64 part
          resolve(base64String); // Resolve with the base64 string
        } else {
          reject("File could not be read as a string");
        }
      };

      reader.onerror = () => {
        reject("Error reading file");
      };
    });
  }

  const showAlert = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
        setMessage(null);
    }, 10000); // Alert disappears after 10 seconds
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
    <div>
    <div className={styles.headerAdminContainer}>
      <header className={styles.headerText}>Manage Your Testimonials</header>
      <button
        className={styles.addButton}
        //everytime you click on "add testimonial" , a blank new Testimonial is set as your selected Review
        onClick={() => setSelectedReview({ ...newTestimonial })}
      >
        Add a Testimonial
      </button>

    </div>

      <div className={styles.containerAlert}>      
        {message && (
                <div className={styles.alertStyle}>
                    {message}
                </div>
            )}
        </div>
 

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={styles.card}
            onClick={() => handleSelectReview(review)}
          >
            <img src={review.profile_picture} className={styles.userPicture} />
            <div className={styles.name}>- {review.user_name || "Anonymous"}</div>
            <div className={styles.stars}>
              {review.rating} {renderStars(review.rating)}
            </div>

            {/*If card is not displayed on home page it will be gray */}
            {!review.is_displayed && (<div className={styles.cardOverLay}></div> )}
            <div className={styles.date}>{review.created_at}</div>
            <div className={styles.review}>{review.comments}</div>
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

          {newProfilePic ? (
            <img src={newProfilePic} alt="" />
          ) : (
            <img src={selectedReview.profile_picture} alt="" />
          )}

          <div>
            {isEditing ? (
              <input type="file" onChange={handleProfilePicChange} />
            ) : (
              <button
                className={styles.addButton}
                onClick={() => setIsEditing(true)}
              >
                Change Profile Picture
              </button>
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
            rows={1}
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
            {error && <p className={styles.errorMessage}>{error}</p>}

          <button
            onClick={selectedReview.id ? handleUpdateReview : handleAddReview}
          >
            {selectedReview.id ? "Save" : "Add"}
          </button>
          {selectedReview.id && (
            <button onClick={() => handleDeleteReview(selectedReview.id!)}>
              Delete
            </button>
          )}
      <button
        onClick={() => {
          setSelectedReview(null);
          setNewProfilePic(null);
          setError(null);
        }}
      >
        Close
      </button>

        </div>
      )}
    </div>
  );
};

export default AdminReviews;