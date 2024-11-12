"use client";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import UserTestimonialForm from "@/components/Testimonials/UserTestimonialForm/UserTestimonialForm";
import Footer from "@/components/Footer/footer";
/**
 * Property organizer page that shows your ihomefinder profile
 * Uses webscraping to track if user is logged in
 */
const PropertyOrganizerPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { checkAuthStatus } = useAuth();
  const [isObserving, setIsObserving] = useState(false);
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
          // console.log(span.textContent);

          if (span.textContent) {
            const text = span.textContent.trim().toLowerCase();

            if (text.includes("sign in")) {
              // console.log("not logged in");
              setcurrentAuthStatus(false);
              return false; // Exit the function immediately if "sign in" is found
            }

            if (text.includes("logout")) {
              // console.log("logout detected. you must be signed in");
              const logoutButton = span.closest("button"); // Find the closest button
              console.log(logoutButton);

              if (logoutButton) {
                console.log("Logout button found:", logoutButton);

                // Add a click event listener to the logout button
                logoutButton.addEventListener("click", handleLogout, {
                  capture: true,
                });
                console.log("Event listener attached to the logout button.");
              }
              setcurrentAuthStatus(true);
              return true;
            }
          }
        }
      } else {
        // Shadow DOM not present. Return false just in case
        // console.log("false not logged in");
        setcurrentAuthStatus(false);
        return false;
      }

      // "sign in" is not present. Therefore, the user is logged in
      // console.log("logged in");
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
        console.log("added token");
      } catch (error) {
        console.log("error occured");
      }
    } else {
      //delete token
      try {
        const response = await axios.post("./api/user/deleteCookie");
        console.log("token deleted");
      } catch (error) {
        console.log("error occured");
      }
    }
  }

  useEffect(() => {
    // Function to add the IDX Property Organizer widget script
    const addScript = async () => {
      if (pageRef.current && !pageRef.current.querySelector("script")) {
        const script = document.createElement("script");
        script.innerHTML = `
          document.currentScript.replaceWith(ihfKestrel.render());
        `;
        pageRef.current.appendChild(script);
      }
    };

    // Add the script on component mount
    console.log("added ihomefinder script");
    addScript();

    return () => {
      if (pageRef.current) {
        pageRef.current.innerHTML = ""; // Clear all children including the script
      }
    };
  });

  //function to run when logout is clicked
  const handleLogout = async () => {
    const response = await axios.post("./api/user/deleteCookie");
    console.log("deleted cookie using event listener");
    checkAuthStatus(); //send update to context so navbar refreshes
    setcurrentAuthStatus(false);
  };

  useEffect(() => {
    let observer: MutationObserver | null = null; // Declare the observer outside to manage it

    // Function to handle mutations in the Shadow DOM
    const handleMutation = async (mutationList: MutationRecord[]) => {
      // Set a timeout for the first function
      const timerId = setTimeout(async () => {
        // Perform token handling and authentication check
        await handleToken();
        checkAuthStatus();
      }, 3000); // 3-second delay

      // Cleanup timeout on component unmount
      return () => clearTimeout(timerId);
    };

    // Function to set up and start the observer
    const initializeObserver = () => {
      const shadowHost = pageRef.current?.querySelector(
        ".ihf-container"
      ) as HTMLElement;

      if (shadowHost && shadowHost.shadowRoot) {
        const shadowRoot = shadowHost.shadowRoot;

        // If observer exists from a previous call, disconnect it before creating a new one
        if (observer) observer.disconnect();

        // Create a new MutationObserver and start observing
        observer = new MutationObserver(handleMutation);
        observer.observe(shadowRoot, {
          childList: true,
          subtree: true,
        });

        setIsObserving(true);

        // Trigger initial authentication check
        handleMutation(observer.takeRecords());
      } else {
        // Retry if shadowHost or shadowRoot is not found, in case it’s still loading
        setTimeout(initializeObserver, 3000);
      }
    };

    // Initialize observer when the document is ready
    if (document.readyState === "complete") {
      initializeObserver();
    } else {
      window.addEventListener("load", initializeObserver);
    }

    // Clean up on component unmount
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("load", initializeObserver);
      setIsObserving(false);
      // clearInterval(monitorComponentPresence); // Stop checking for component presence
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
        <div style={{ padding: "20px" }}>
          {/* Placeholder for the IDX Property Organizer widget */}
          <div ref={pageRef} />
        </div>

        {currentAuthStatus && <UserTestimonialForm></UserTestimonialForm>}
      </main>
      <Footer />
    </>
  );
};

export default PropertyOrganizerPage;
