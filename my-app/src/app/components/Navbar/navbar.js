import React from 'react';
import Link from 'next/link';
//import Sellers from './Sellers';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded";

function NavBar() {
  return (

    <div className="flex items-center bg-gray-500">

    <Link href= "/home">
      <button className={buttonStyle}>
        Home
      </button>
     </Link>



      <Link href="/listing">
      <button className={buttonStyle}>
        Listings
      </button>
      </Link>


      <Link href="/about">
        <button className={buttonStyle}>
          About Me
        </button>
      </Link>


      
    <Link href="/sellers">
      <button className={buttonStyle}>
        Sellers
      </button>
      </Link>


      <Link href = "/buyers">
      <button className={buttonStyle}>
        Buyers
      </button>
      </Link>
      


    <Link href="/communities">
      <button className={buttonStyle}>
        Communities
      </button>
      </Link> 



    <Link href="/properties">
      <button className={buttonStyle}>
        Properties
      </button>
      </Link>



      <Link href= "/homeworth"> 
      <button className={buttonStyle}>
        What's My Home Worth?
      </button>
      </Link>



      <Link href="/signin">
        <button className={buttonStyle}>
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default NavBar;