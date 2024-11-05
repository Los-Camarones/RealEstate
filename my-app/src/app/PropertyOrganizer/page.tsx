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

      //Check if any span contains "sign in"
      spans.forEach((span) => {
        console.log(span.textContent);
        if (span.textContent) {
          const text = span.textContent.trim().toLowerCase();

          if (text.includes("sign in")) {
            console.log("not logged in");
            return false;
          }
        }
      });
    } else {
      //shadow dom not present. return false just incase
      console.log("false not logged in");

      return false;
    }

    //sign in is not present. therefore is logged in
    console.log("logged in");
    return true;
  }

  async function handleToken() {
    if (isLoggedIn()) {
      //set token
      try {
        const response = await axios.post("./api/user/setCookie");
        console.log(response);
      } catch (error) {
        console.log("error occured");
      }
    } else {
      //delete token
      try {
        const response = await axios.post("./api/user/deleteCookie");
        console.log(response);
      } catch (error) {
        console.log("error occured");
      }
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleToken();
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
