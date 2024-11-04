'use client';

import React, { useEffect } from 'react';
import PropertyOrganizerLogin from '../../components/PropertyOrganizerLogin/PropertyOrganizerLogin';
import NavBar from '../../components/Navbar/navbar';
import Head from 'next/head';
import '../globals.css'; 


const PropertyOrganizerPage: React.FC = () => {

  function isLoggedIn() {

    //select the ihomefinder div 
    const ihomefinderDiv = document.getElementsByClassName('ihf-container')[0];

    console.log(ihomefinderDiv);

    //get all buttons within the ihomefinder div
    const buttonsList = ihomefinderDiv.querySelectorAll('button');
    // const buttons = document.querySelectorAll("button");

    const spansList = document.getElementsByClassName('ui-button-label');
    console.log(spansList);
    console.log(buttonsList);


    let signInButton;

//     //printing all buttons 
//     console.log(buttonsList);
//     buttonsList.forEach(button => {
//       console.log(button);
//     const span = button.querySelector("span");
//     if (span && span.textContent === "Sign In") {
//         signInButton = button;
//         console.log("not logged in");
//         return false;
//     }
//   }
// );
// console.log("logged in ");
// return true;
}

useEffect(() =>{
  const timeoutId = setTimeout(() => {

    isLoggedIn();

  }, 3000); // Adjust the delay time in milliseconds (3000ms = 3 seconds)

  return () => clearTimeout(timeoutId);
}, [])
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
        <div style={{ paddingLeft: '200px', paddingRight:'200px' }}>
          <PropertyOrganizerLogin />
        </div>
      </main>
    </>
  );
};

export default PropertyOrganizerPage;
