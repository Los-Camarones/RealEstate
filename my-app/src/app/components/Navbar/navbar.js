import React from 'react';
import Link from 'next/link';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them

styles.buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">
      <button className={buttonStyleTEST}>
        Home
      </button>

      <button className={styles.buttonStyle}>
        Listings
      </button>

      <Link href = "/about">
      <button className={styles.buttonStyle}>
       About Me
      </button>
      </Link>

      <button className={styles.buttonStyle}>
        Sellers
      </button>

      <button className={styles.buttonStyle}>
        Buyers
      </button>

      <button className={styles.buttonStyle}>
            Communities
        </button>

        <button className={styles.buttonStyle}>
            Properties
        </button>

        <button className={styles.buttonStyle}>
            What's My Home Worth?
        </button>

        <link href = "/sign-in">
        <button  className={styles.buttonStyle}>
            Sign Up
        </button>
        </link>

        

        
    </div>
  );
}

export default NavBar;