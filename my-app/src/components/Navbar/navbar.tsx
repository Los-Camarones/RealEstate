'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyOrganizerLogin from '../PropertyOrganizerLogin/PropertyOrganizerLogin'; // Import your login component

const buttonStyle = "ml-2 bg-transparent hover:bg-gray-200 text-black font-bold py-1 px-2 rounded";

const NavBar: React.FC = () => {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isWidgetDisplayed, setIsWidgetDisplayed] = useState(false); // Track when the widget is displayed instead of Sign In button
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu open state

  // Function to toggle the Sign In popup
  const toggleSignInPopup = () => {
    setIsSignInPopupOpen(!isSignInPopupOpen);
  };

  // Function to close the Sign In popup and replace the Sign In button with the widget content
  const closeSignInPopupAndShowWidget = () => {
    setIsSignInPopupOpen(false);
    setIsWidgetDisplayed(true); // Mark the widget to display in place of the button
  };

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar-container bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg py-4 relative z-50">
        <div className="mx-auto flex items-center px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" passHref>
            <Image src="/logo_.png" alt="logo" width={120} height={120} className="cursor-pointer" priority />
          </Link>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Open Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <Link href="/">
              <button className={buttonStyle}>Home</button>
            </Link>

            <Link href="/property-search">
              <button className={buttonStyle}>Listings</button>
            </Link>

            <Link href="/Aboutme">
              <button className={buttonStyle}>About Me</button>
            </Link>

            <Link href="/Sellers">
              <button className={buttonStyle}>Sellers</button>
            </Link>

            <Link href="/GetPreQualified">
              <button className={buttonStyle}>Get PreQualified</button>
            </Link>

            <Link href="/markets">
              <button className={buttonStyle}>Communities</button>
            </Link>

            <Link href="/valuation">
              <button className={buttonStyle}>What's My Home Worth?</button>
            </Link>

            <Link href="/contact">
              <button className={buttonStyle}>Contact</button>
            </Link>

            {/* Display the Sign In button OR the plugin content */}
            {isWidgetDisplayed ? (
              <div className="login-widget relative z-50">
                <PropertyOrganizerLogin /> {/* Render the plugin in place of the button */}
              </div>
            ) : (
              <button className={buttonStyle} onClick={toggleSignInPopup}>
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-300 w-full py-4 px-2 absolute left-0 top-full z-40">
            <Link href="/">
              <button className={buttonStyle + " block w-full text-left py-2"}>Home</button>
            </Link>
            <Link href="/property-search">
              <button className={buttonStyle + " block w-full text-left py-2"}>Listings</button>
            </Link>
            <Link href="/Aboutme">
              <button className={buttonStyle + " block w-full text-left py-2"}>About Me</button>
            </Link>
            <Link href="/Sellers">
              <button className={buttonStyle + " block w-full text-left py-2"}>Sellers</button>
            </Link>
            <Link href="/GetPreQualified">
              <button className={buttonStyle + " block w-full text-left py-2"}>Get PreQualified</button>
            </Link>
            <Link href="/markets">
              <button className={buttonStyle + " block w-full text-left py-2"}>Communities</button>
            </Link>
            <Link href="/valuation">
              <button className={buttonStyle + " block w-full text-left py-2"}>What's My Home Worth?</button>
            </Link>
            <Link href="/contact">
              <button className={buttonStyle + " block w-full text-left py-2"}>Contact</button>
            </Link>

            {/* Mobile Sign In Button */}
            {isWidgetDisplayed ? (
              <div className="login-widget relative z-50">
                <PropertyOrganizerLogin /> {/* Render the plugin in place of the button */}
              </div>
            ) : (
              <button className={buttonStyle + " block w-full text-left py-2"} onClick={toggleSignInPopup}>
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Sign In Popup Modal */}
      {isSignInPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto max-h-full overflow-y-auto">
            {/* Close Button (X) */}
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={closeSignInPopupAndShowWidget} // Clicking X triggers widget replacement
            >
              &times;
            </button>

            {/* Property Organizer Login */}
            <PropertyOrganizerLogin />

            {/* Cancel Button */}
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full"
              onClick={closeSignInPopupAndShowWidget} // Triggers widget replacement as well
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

