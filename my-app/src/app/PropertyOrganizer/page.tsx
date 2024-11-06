"use client";

import React, { useEffect } from "react";
import PropertyOrganizerLogin from "../../components/PropertyOrganizerLogin/PropertyOrganizerLogin";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";
import { addToken, removeToken } from "@/actions/UserIhomfinder/StateActions";
import axios from "axios";

const PropertyOrganizerPage: React.FC = () => {
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
              return false;  // Exit the function immediately if "sign in" is found
            }
          }
        }
      } else {
        // Shadow DOM not present. Return false just in case
        console.log("false not logged in");
        return false;
      }

      // "sign in" is not present. Therefore, the user is logged in
      console.log("logged in");
      return true;
    }
  }


  async function handleToken() {
    if (isLoggedIn()) {
      //set token
      try {
        console.log('adding token');
        const response = await axios.post("./api/user/setCookie");
      } catch (error) {
        console.log("error occured");
      }
    } else {
      //delete token
      try {
        console.log('delete token');
        const response = await axios.post("./api/user/deleteCookie");
        console.log(response);
      } catch (error) {
        console.log("error occured");
      }
    }
  }

  useEffect(() => {

    //define function to run on each mutation 
    const handleMutation = (mutationList: Array<any>) => {
      console.log('shadow dom changed');
      handleToken();
    }

    //set up mutationObserver
    const observer = new MutationObserver(handleMutation);

    const initializeObserver = () => {

      //select the shadow root
      const shadowHost = document.querySelector(".ihf-container") as HTMLElement;
      if (shadowHost && shadowHost.shadowRoot) {

        //select root
        const shadowRoot = shadowHost.shadowRoot;

        handleMutation([{ type: 'initial' }]);

        observer.observe(shadowRoot, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        });
      }
    };

    if (document.readyState === 'complete') {
      initializeObserver();
      console.log('document ready');
    } else {
      window.addEventListener('load', initializeObserver);
      console.log('document loading');
    }

    //clean up observer on component unmount 
    return () => {
      observer.disconnect();
      window.removeEventListener('load', initializeObserver);
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
