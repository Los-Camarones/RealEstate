"use client";

import React, { useEffect } from "react";
import PropertyOrganizerLogin from "../../components/PropertyOrganizerLogin/PropertyOrganizerLogin";
import NavBar from "../../components/Navbar/navbar";
import Head from "next/head";
import "../globals.css";

const PropertyOrganizerPage: React.FC = () => {
  function isLoggedIn() {

    //select the ihomefinder div, which is our shadown host
    const shadowHost = document.querySelector(".ihf-container") as HTMLElement;

    if (shadowHost && shadowHost.shadowRoot) {
      //Access the shadow root (open shadow DOM)
      const shadowRoot = shadowHost.shadowRoot;

      //query all our spans
      const spans = shadowRoot.querySelectorAll("span");

      //Check if any span contains "sign in"
      spans.forEach((span) => {
        console.log(span.textContent);
        if (span.textContent) {
          const text = span.textContent.toLowerCase();

          if (text.includes("sign in")) {
            console.log("not logged in");
            return false;
          }
        }
      });
    } else {
      //shadow dom not present. return false just incase
      return false;
    }

    //sign in is not present. therefore is logged in
    console.log("logged in");
    return true;
  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   // This function will run once the entire DOM is fully loaded
  //   console.log("DOM fully loaded and parsed");
  
  //   // Call your function here
  //   isLoggedIn();
  // });


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isLoggedIn();
    }, 3000); // Adjust the delay time in milliseconds (3000ms = 3 seconds)

    return () => clearTimeout(timeoutId);
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
