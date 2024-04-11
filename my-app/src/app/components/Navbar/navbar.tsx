import React from 'react';
import Link from 'next/link';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">


      <Link href="/"> 
      <button className={buttonStyle}>
        Home
      </button>
      </Link>



      <Link href="/Listings">
      <button className={buttonStyle}>
        Listings
      </button>
      </Link>



      <Link href="/Aboutme">
        <button className={buttonStyle}>
          About Me
        </button>
      </Link>

    

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
      <button className={buttonStyle}>
        Communities
      </button>
      </Link>




      <Link href="/Properties">
      <button className={buttonStyle}>
        Properties
      </button>
      </Link>




      <Link  href="/WhatMyHomeWorth">
      <button className={buttonStyle}>
        What's My Home Worth?
      </button>
      </Link>




      <Link href="/Sign-in">
        <button className={buttonStyle}>
          Login
        </button>
      </Link>



    </div>
  );
}

export default NavBar;