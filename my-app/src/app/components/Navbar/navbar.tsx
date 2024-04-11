import React from 'react';
import Link from 'next/link';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">
<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js


      <Link href="/"> 
      <button className={buttonStyle}>
        Home
      </button>
      </Link>



      <Link href="/Listings">
=======
    <Link href="http://localhost:3000/">
        <button className={buttonStyle}>
        Home
      </button>
    </Link>

      <Link href="/Listings/page">
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
      <button className={buttonStyle}>
        Listings
      </button>
      </Link>

<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js


      <Link href="/Aboutme">
=======
      <Link href="/Aboutme/page">
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
        <button className={buttonStyle}>
          About Me
        </button>
      </Link>
<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js

    

      <Link href="/Sellers">
      <button className={buttonStyle}>
        Sellers
      </button>
      </Link>




      <Link href="/Buyers">
      <button className={buttonStyle}>
        Buyers
      </button>
      </Link>




      <Link href="/Communities">
=======
    <Link href="/Sellers/page">
      <button className={buttonStyle}>
        Sellers
      </button>
    </Link>

      <Link href="/Buyers/page">
        <button className={buttonStyle}>
          Buyers
        </button>
      </Link>

      <Link href="/Communities/page">
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
      <button className={buttonStyle}>
        Communities
      </button>
      </Link>

<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js



      <Link href="/Properties">
=======
      <Link href="/Properties/page">      
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
      <button className={buttonStyle}>
        Properties
      </button>
      </Link>

<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js



      <Link  href="/Homeworth">
=======
      <Link href="/WhatMyHomeWorth/page">
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
      <button className={buttonStyle}>
        What's My Home Worth?
      </button>
      </Link>

<<<<<<< HEAD:my-app/src/app/components/Navbar/navbar.js



      <Link href="/Login">
        <button className={buttonStyle}>
          Login
=======
      <Link href="/Sign-in/page">
        <button className={buttonStyle}>
          Sign-in
>>>>>>> 80a5d3b7e2e8e8fc4d0e0ffe0d8522e514056973:my-app/src/app/components/Navbar/navbar.tsx
        </button>
      </Link>



    </div>
  );
}

export default NavBar;