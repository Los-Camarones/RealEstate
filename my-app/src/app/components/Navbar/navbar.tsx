import React from 'react';
import Link from 'next/link';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">
    <Link href="http://localhost:3000/">
        <button className={buttonStyle}>
        Home
      </button>
    </Link>

      <Link href="/Listings/page">
      <button className={buttonStyle}>
        Listings
      </button>
      </Link>

      <Link href="/Aboutme/page">
        <button className={buttonStyle}>
          About Me
        </button>
      </Link>
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
      <button className={buttonStyle}>
        Communities
      </button>
      </Link>

      <Link href="/Properties/page">      
      <button className={buttonStyle}>
        Properties
      </button>
      </Link>

      <Link href="/WhatMyHomeWorth/page">
      <button className={buttonStyle}>
        What's My Home Worth?
      </button>
      </Link>

      <Link href="/Sign-in/page">
        <button className={buttonStyle}>
          Sign-in
        </button>
      </Link>
    </div>
  );
}

export default NavBar;