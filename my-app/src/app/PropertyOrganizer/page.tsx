"use client";

import React, { useEffect } from "react";
import PropertyOrganizerLogin from "../../components/PropertyOrganizerLogin/PropertyOrganizerLogin";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "@/actions/AuthContext";

const PropertyOrganizerPage: React.FC = () => {
  const { checkAuthStatus } = useAuth();

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
          //console.log(span.textContent);

          if (span.textContent) {
            const text = span.textContent.trim().toLowerCase();

            if (text.includes("sign in")) {
              // console.log("not logged in");
              return false;  // Exit the function immediately if "sign in" is found
            }
          }
        }
      } else {
        // Shadow DOM not present. Return false just in case
        // console.log("false not logged in");
        return false;
      }

      // "sign in" is not present. Therefore, the user is logged in
      // console.log("logged in");
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

      } catch (error) {
        console.log("error occured");
      }
    } else {
      //delete token
      try {
        const response = await axios.post("./api/user/deleteCookie");
        console.log('token deleted');
      } catch (error) {
        console.log("error occured");
      }
    }
  }

  useEffect(() => {

    // Define function to handle changes in the observed element's mutations
    const handleMutation = async (mutationList: Array<any>) => {
      
        // Ensure token is properly set before checking authentication status
        await handleToken();  
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
                childList: true,       // Observe additions/removals of child nodes
                subtree: true,         // Observe changes in all descendants, not just direct children
                attributes: false,      // Observe changes to attributes
                characterData: false   // Ignore changes in character data for efficiency
            });
        }
    };

    // Check if the document is already fully loaded before initializing the observer
    if (document.readyState === 'complete') {
        console.log('document ready');
        initializeObserver(); // Immediately initialize if document is fully loaded
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
        <h2>User Login</h2>
        <div style={{ paddingLeft: "200px", paddingRight: "200px" }}>
          <PropertyOrganizerLogin />
        </div>
      </main>
    </>
  );
};

export default PropertyOrganizerPage;
