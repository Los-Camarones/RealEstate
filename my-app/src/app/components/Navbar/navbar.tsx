import React, { useState } from 'react';
import Link from 'next/link';
import './navbar.css';

//This style is the style of the buttons on the navbar
//TODO: We need a better way to manage all styles so they are easily reusable in other pages without having to retype them
const buttonStyle = "ml-2 bg-transparent hover:bg-gray-200 text-black font-bold py-1 px-2 rounded";


function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  
    {/*Return a 'menu' icon for the navabar that collapses all our buttons. This is only for mobile users*/}
    return (
    <div className="bg-transparent z-50">
      <div className="flex justify-between items-center px-4 py-2 md:px-6">
        <div className="md:hidden">
          <button className={buttonStyle} onClick={toggleDropdown}>Menu</button>
        </div>
      </div>


    {/*If a user is a mobiler user, it will automatically dispaly a hamburger menu. If on pc it will keep hidden */}
    <div className={`md:flex md:justify-end ${isDropdownOpen ? 'block' : 'hidden'} bg-transparent md:px-4 md:py-2`}>
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


      {/*<Link href="/Sign-in"*/}
      {/*create dropdown menu*/}
      <div className= "dropdown button" >
        <button className={buttonStyle} onClick={toggleDropdown}>
          Login 
        </button>
        {/*dropdown menu*/}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-gray-200 rounded-md shadow-lg" >
            <Link href="/Sign-in" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Sign In<a/>
            </Link>
            <Link href="/Sign-up" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Create account<a/>
            </Link>
            </div>
            
        )}
      </div>

    </div>
  </div>
  );
}
export default NavBar;
