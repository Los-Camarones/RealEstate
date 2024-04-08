import React from 'react';
import Link from 'next/link';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">
      <button className={buttonStyle}>
        Home
      </button>

      <button className={buttonStyle}>
        Listings
      </button>

      <Link href="/about">
        <button className={buttonStyle}>
          About Me
        </button>
      </Link>

      <button className={buttonStyle}>
        Sellers
      </button>

      <button className={buttonStyle}>
        Buyers
      </button>

      <button className={buttonStyle}>
        Communities
      </button>

      <button className={buttonStyle}>
        Properties
      </button>

      <button className={buttonStyle}>
        What's My Home Worth?
      </button>

      <Link href="/sign-in">
        <button className={buttonStyle}>
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default NavBar;