"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const buttonStyle = "ml-2 bg-transparent hover:bg-gray-200 text-black font-bold py-1 px-2 rounded";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <nav className="navbar-container">
      <div className=" mx-auto flex items-center">
        {/* Logo */}
        <Link href="/" passHref>
          <Image src="/logo_.png" alt="logo" width={150} height={150} priority />
        </Link>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Hamburger Icon for Mobile */}
        <div className="text-black block lg:hidden">
          <button
            onClick={toggleDropdown}
            className="text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={isDropdownOpen ? 'hidden' : 'block'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
              <path
                className={isDropdownOpen ? 'block' : 'hidden'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 6.293a1 1 0 011.414 0l6.293 6.293 6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414 1 1 0 010 0z"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <Link href="/">
            <button className={buttonStyle}>
              Home
            </button>
          </Link>

          <Link href="/property-search">
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

          <Link href="/markets">
            <button className={buttonStyle}>
              Communities
            </button>
          </Link>

          <Link href="/valuation">
            <button className={buttonStyle}>
              What's My Home Worth?
            </button>
          </Link>

          <Link href="/contact">
            <button className={buttonStyle}>
              Contact
            </button>
          </Link>

          <Link href="/property-organizer">
            <button className={buttonStyle}>
              Sign in
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isDropdownOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3">
          <Link href="/">
            <button className={buttonStyle}>
              Home
            </button>
          </Link>

          <Link href="/property-search">
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

          <Link href="/markets">
            <button className={buttonStyle}>
              Communities
            </button>
          </Link>

          <Link href="/Properties">
            <button className={buttonStyle}>
              Properties
            </button>
          </Link>

          <Link href="/valuation">
            <button className={buttonStyle}>
              What's My Home Worth?
            </button>
          </Link>
          
          <Link href="/property-organizer">
            <button className={buttonStyle}>
              Sign in
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
