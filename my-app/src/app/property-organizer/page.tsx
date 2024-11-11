"use client";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import UserTestimonialForm from "@/components/Testimonials/UserTestimonialForm/UserTestimonialForm";
import Footer from "@/components/Footer/footer";

const PropertyOrganizerPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { checkAuthStatus } = useAuth();
  const [prevAuthStatus, setPrevAuthStatus] = useState<boolean>(false);
  const [isObserving, setIsObserving] = useState(false);
  const [currentAuthStatus, setcurrentAuthStatus] = useState(false);
  const observerRef = useRef(null);



  /**
   * Function to see if user is logged in based on webscraping on ihomefinder shadowDom
   * If "sign in" is present, user is not logged in
   * else, user must be logged in.
   * @returns boolean
   */
  function isLoggedIn() {
    //select the ihomefinder div, which is our shadown host
    const shadowHost = document.querySelector(".ihf-container") as HTMLElement;

    if (shadowHost && shadowHost.shadowRoot) {
      //Access the shadow root (open shadow DOM)
      const shadowRoot = shadowHost.shadowRoot;

      //query all our spans
      const spans = shadowRoot.querySelectorAll("span");

      // Check if any span contains "sign in"
      if (spans && spans.length > 0) {
        for (let i = 0; i < spans.length; i++) {
          const span = spans[i];
          console.log(span.textContent);

          if (span.textContent) {
            const text = span.textContent.trim().toLowerCase();

            if (text.includes("sign in")) {
              console.log("not logged in");
              setcurrentAuthStatus(false);
              return false;  // Exit the function immediately if "sign in" is found
            }

            if(text.includes("logout")) {
              console.log("logout detected. you must be signed in");
              setcurrentAuthStatus(true);
              return true;
            }
          }
        }
      } else {
        // Shadow DOM not present. Return false just in case
         console.log("false not logged in");
        setcurrentAuthStatus(false);
        return false;
      }

      // "sign in" is not present. Therefore, the user is logged in
      console.log("logged in");
      setcurrentAuthStatus(true);
      return true;
    }
  }



  /**
   * Handles token set/delete based on if the user is logged in
   */
  async function handleToken() {
    if (isLoggedIn()) {
      //set token
      try {
        const response = await axios.post("./api/user/setCookie");
        console.log('added token');
        setPrevAuthStatus(true);

      } catch (error) {
        console.log("error occured");
      }
    } else if (!isLoggedIn()){
      //delete token
      try {
        const response = await axios.post("./api/user/deleteCookie");
        console.log('token deleted');
        setPrevAuthStatus(false);
      } catch (error) {
        console.log("error occured");
      }
    }
  }


  useEffect(() => {

    // Function to add the IDX Property Organizer widget script
    const addScript = () => {
      if (pageRef.current && !pageRef.current.querySelector('script')) {
        const script = document.createElement('script');
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render());
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    console.log("added ihomefinder script");
    addScript();


    return() => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ''; // Clear all children including the script
      }
    }
  })


  useEffect(() => {
    let observer: MutationObserver | null = null; // Declare the observer outside to manage it

    // Function to handle mutations in the Shadow DOM
    const handleMutation = async () => {
        await handleToken();  
        checkAuthStatus();
    };

    // Function to set up and start the observer
    const initializeObserver = () => {
        const shadowHost = document.querySelector(".ihf-container") as HTMLElement;

        if (shadowHost && shadowHost.shadowRoot) {
            const shadowRoot = shadowHost.shadowRoot;

            // If observer exists from a previous call, disconnect it before creating a new one
            if (observer) observer.disconnect();

            // Create a new MutationObserver and start observing
            observer = new MutationObserver(handleMutation);
            observer.observe(shadowRoot, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: false,
            });

            setIsObserving(true);

            // Trigger initial authentication check
            handleMutation();
        } else {
            // Retry if shadowHost or shadowRoot is not found, in case it’s still loading
            setTimeout(initializeObserver, 3000);
        }
    };

    // Set up a continuous check for the login plugin component's presence
    const monitorComponentPresence = setInterval(() => {
        console.log("running interval")
        const shadowHost = document.querySelector(".ihf-container") as HTMLElement;
        if (!shadowHost || !shadowHost.shadowRoot) {

          if (observer) {
            console.log("observer is observer");
          } 
          
            initializeObserver(); // Reinitialize observer if the component reappears

          
        }
    }, 1000);

    // Initialize observer when the document is ready
    if (document.readyState === 'complete') {
        initializeObserver();
    } else {
        window.addEventListener('load', initializeObserver);
    }
  

    // Clean up on component unmount
    return () => {
        if (observer) observer.disconnect();
        window.removeEventListener('load', initializeObserver);
        setIsObserving(false);
        clearInterval(monitorComponentPresence); // Stop checking for component presence
    };
}, []);

function printTest() {
  console.log("currently observing outside useeffect");
}
while(isObserving) {
  setTimeout(printTest, 4000);
}




  return (
    <>
      <Head>
        <title>Property Organizer</title>
        <meta
          name="description"
          content="Login to the Property Organizer to manage your saved properties."
        />
      </Head>
      <NavBar />
      <main>
        <div style={{ padding: '20px' }}>
          {/* Placeholder for the IDX Property Organizer widget */}
          <div ref={pageRef} />
        </div>

        {currentAuthStatus && (
          <UserTestimonialForm></UserTestimonialForm>
        )}
        
      </main>
      <Footer />
    </>
  );
};

export default PropertyOrganizerPage;
