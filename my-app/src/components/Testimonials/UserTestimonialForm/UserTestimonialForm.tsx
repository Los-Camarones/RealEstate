import { ITestimonial } from "@/types/database_interface";
import React, { useState } from "react";
import styles from "./TestimonialForm.module.css";
import { getPublicURL, uploadProfilePicture } from "@/actions/BucketActions";
import { addTestimonial } from "@/actions/TestimonialsActions";
import useAuth from "@/app/hooks/useAuth";

const UserTestimonialForm = () => {
  const blank_url_profile_pic =
    "https://nczvyuangfyovbjycopv.supabase.co/storage/v1/object/public/testimonials_images/default_pfp.jpg";
  const [newTestimonial, setNewTestimonial] = useState<ITestimonial>({
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
  const[formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const[error, setError] = useState<string | null>();


  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      if (file) {
        setFile(file);

        const url = URL.createObjectURL(file);
        setNewProfilePic(url);
        setNewTestimonial((newTestimonial) => {
          if (newTestimonial) {
            return {
              ...newTestimonial,
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


  const handleSubmitTestimonial = async (e: React.FormEvent) => {

    e.preventDefault();

    //if a date, username, and rating exists
    if (newTestimonial.created_at && newTestimonial.user_name && newTestimonial.rating) {

      //create temporary variable to hold our selected review
      let updatedReview: ITestimonial = { ...newTestimonial};

      if(file && newProfilePic) {
        //handle profile picture upload

        //convert file to base 64
        const fileBase64 = await fileToBase64(file);

        //upload the picture to supabase
        const response = await uploadProfilePicture(newTestimonial.user_name, fileBase64);

        if(response.success && response.data?.path) {

          console.log("uploaded profile picture successfully!");

          //grab the image name after uploading on supabase
          const new_image_name = response.data.path;

          //fetch the url of the image that is store on the bucket of supabase
          const responseUrl = await getPublicURL(new_image_name);

          if (responseUrl.success && responseUrl.data) {
            //grab the public url
            const publicURL = responseUrl.data.publicUrl;

            // Update the state with the new profile picture URL
            updatedReview = {
              ...newTestimonial,  // Spread the current state
              profile_picture: publicURL,  // Update the profile picture
            };
          
            // Set state to updated review
            setNewTestimonial(updatedReview);

          } else {
            console.log(responseUrl.error);
            setError(responseUrl.error);
            return;

          }
        } else{
          console.log(response.error);
          setError(response.error);
          //return to make them fix their issue and so it doens't submit
          return;
        }

      }

    //add review on supabase
    const response = await addTestimonial(updatedReview);
        
    if (response.success && response.data) {
      console.log("Successfully added testimonial!");
      setFormSubmitted(true);
    
      //set our selectedReview to null
      setNewTestimonial({    
        created_at: "",
        rating: 5,
        comments: "",
        user_name: "",
        profile_picture: blank_url_profile_pic,
        is_displayed: true,});
    
    } else {
      console.log("failed ", response.error);
      setError(response.error);
      setFormSubmitted(false);
    }
  }
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
          setError("Error reading file");
          reject("Error reading file");
        };
      });
    }
    const auth = useAuth();  // Check if the user is authenticated
  
    if (!auth) {
      // If the user is not authenticated, show a loading spinner or redirect
      return <div></div>;
    }

    return (
      <div className={styles.container}>
        {!formSubmitted ? (
          <>
            <header className={styles.header}>Create a Testimonial</header>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmitTestimonial} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      user_name: e.target.value,
                    })
                  }
                  required
                  className={styles.input}
                />
              </div>
  
              <div className={styles.inputGroup}>
                <label>Date:</label>
                <input
                  type="date"
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      created_at: e.target.value,
                    })
                  }
                  required
                  className={styles.input}
                />
              </div>
  
              <div className={styles.inputGroup}>
                <label>Rating (1-5):</label>
                <select
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      rating: Number(e.target.value),
                    })
                  }
                  required
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
  
              <label>Testimonial</label>
              <textarea
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    comments: e.target.value,
                  })
                }
                placeholder="Lourdes is Amazing!"
                style={{
                  display: 'block',
                  minWidth: '100px',
                  minHeight: '100px',
                  padding: '5px',
                  border: '1px solid #000000',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  color: newTestimonial.comments ? 'inherit' : '#aaa',
                  overflow: 'hidden',
                  resize: 'none', // Prevent resizing with the mouse
                }}
                rows={1}
              />
  
              <div className={styles.inputGroup}>
                <label>Picture (optional):</label>
                {newProfilePic ? (
                  <img src={newProfilePic} alt="Profile" />
                ) : (
                  <img src={newTestimonial.profile_picture} alt="Profile" />
                )}
                <input type="file" accept="image/*" onChange={handleProfilePicChange} />
              </div>
  
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </>
        ) : (
          <p className={styles.successMessage}>Thank you for submitting the form!</p>
        )}
      </div>
    );
  };
export default UserTestimonialForm;
