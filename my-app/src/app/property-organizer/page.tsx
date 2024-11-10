"use client";

import React, { useEffect, useRef, useState } from "react";
import PropertyOrganizerLogin from "../../components/PropertyOrganizerLogin/PropertyOrganizerLogin";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import UserTestimonialForm from "@/components/Testimonials/UserTestimonialForm/UserTestimonialForm";
import Footer from "@/components/Footer/footer";

const PropertyOrganizerPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { checkAuthStatus } = useAuth();
  const [prevAuthStatus, setPrevAuthStatus] = useState<boolean>(false);
  const [shadowReady, setShadowReady] = useState(false);
  const [currentAuthStatus, setcurrentAuthStatus] = useState(false);


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
    addScript();


    return() => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ''; // Clear all children including the script
      }
    }
  })


  useEffect(() => {

    // Function to run when any changes occur in shadow dom tree. 
    const handleMutation = async (mutationList: Array<any>) => {
      
        //handles token depending on items within shadown dom tree
        await handleToken();  
        //notifies the context
        checkAuthStatus();    
    }

    // Initialize a MutationObserver to monitor changes within the targeted element (Shadow DOM)
    const observer = new MutationObserver(handleMutation);

    // Function to set up and start the observer if the target element and its Shadow DOM exist
    const initializeObserver = () => {
        // Access the shadow host container to target its Shadow DOM
        const shadowHost = document.querySelector(".ihf-container") as HTMLElement;
        
        // Verify if the shadow host and its ShadowRoot exist before proceeding
        if (shadowHost && shadowHost.shadowRoot) {
            const shadowRoot = shadowHost.shadowRoot;

            // Trigger initial authentication check when observer starts
            handleMutation([{ type: 'initial' }]);

            // Start observing for mutations within the Shadow DOM, focusing on specific types of changes
            observer.observe(shadowRoot, {
                childList: true,       
                subtree: true,         
                attributes: true,      
                characterData: false   // Ignore changes in character data 
            });
        }
    };

    // Check if the document is already fully loaded before initializing the observer
    if (document.readyState === 'complete') {
        console.log('document ready');
        initializeObserver(); 
    } else {
        // If document is still loading, wait for the load event to initialize the observer
        window.addEventListener('load', initializeObserver);
        console.log('document loading');
    }

    // Clean-up function to disconnect observer and remove event listener when component unmounts
    return () => {
        observer.disconnect(); 
        window.removeEventListener('load', initializeObserver); // Remove event listener if it was added
    };

}, []); 


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
