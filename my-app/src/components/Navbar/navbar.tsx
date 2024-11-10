"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PropertyOrganizerLogin from "../PropertyOrganizerLogin/PropertyOrganizerLogin";
import adminAuth from "@/app/hooks/admin/adminAuth";
import { useAuth } from "@/app/context/AuthContext";

const buttonStyle =
  "ml-2 bg-transparent hover:bg-gray-200 text-black font-bold py-1 px-2 rounded";
const dropdownItemStyle = "block px-4 py-2 text-black hover:bg-gray-200";

const NavBar: React.FC = () => {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isWidgetDisplayed, setIsWidgetDisplayed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const [isDropdownOpenSignIn, setIsDropdownOpenSignIn] = useState(false); // Track dropdown state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextRoute, setNextRoute] = useState("/property-organizer");
  const adminLoggedIn = adminAuth(); // Check if the admin is authenticated
  const { isUserAuthenticated } = useAuth();
  const [forceRender, setForceRender] = useState(false);


  // Toggle the Sign In popup
  const toggleSignInPopup = () => {
    setIsSignInPopupOpen(true);
    setIsWidgetDisplayed(true);
  };

  // Close Sign In popup and show widget
  const closeSignInPopupAndShowWidget = () => {
    setIsSignInPopupOpen(false);
    setIsWidgetDisplayed(false);
  };

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle dropdown hover
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  //handle mouse enter for sign in button
  const handleMouseEnterSignIn = () => {
    setIsDropdownOpenSignIn(true);
  };

  const handleMouseLeaveSignIn = () => {
    setIsDropdownOpenSignIn(false);
  };

  //function to check if either user or admin is logged in
  async function checkLogin() {
    // console.log('running user auth in navbar' ,isUserAuthenticated);

    if (adminLoggedIn) {
      setIsLoggedIn(true);
      setNextRoute("/Admin");
      console.log("admin logged in");
    } else if (isUserAuthenticated) {
      setIsLoggedIn(true);
      setNextRoute("/property-organizer");
      console.log("user logged in");
    } else {
      setIsLoggedIn(false);
      console.log("no one logged in");
    }
  }

  useEffect(() => {
    setIsDropdownOpenSignIn(false); //force render for some reason to allow dropdown on first render
    checkLogin();
    setForceRender(!forceRender);
  }, [adminLoggedIn,isUserAuthenticated]);

  return (
    <>
      <nav className="navbar-container bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg py-4 relative z-50">
        <div className="mx-auto flex items-center px-4 lg:px-8">
          <Link href="/" passHref>
            <Image
              src="/logo_.png"
              alt="logo"
              width={120}
              height={120}
              className="cursor-pointer"
              priority
            />
          </Link>

          <div className="flex-grow"></div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Open Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

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

            {/* Buyers Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/Buyers">
                <button className={`buyers-button ${buttonStyle}`}>
                  Buyers
                </button>
              </Link>

              {isDropdownOpen && (
                <div className="absolute bg-white shadow-lg mt-0 rounded-md z-10">
                  <Link href="/property-search" className={dropdownItemStyle}>
                    Search Property
                  </Link>
                  <Link
                    href="/property-organizer"
                    className={dropdownItemStyle}
                  >
                    Get Listing Updates
                  </Link>
                  <Link href="/contact" className={dropdownItemStyle}>
                    Ask me
                  </Link>
                </div>
              )}
            </div>

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

              {/* No one is logged in */}
            {!isLoggedIn && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnterSignIn}
                onMouseLeave={handleMouseLeaveSignIn}
              >
                <button className={buttonStyle}>Sign in </button>

                {/* When the user hovers, show drop down options */}
                {isDropdownOpenSignIn && (
                  <div className="absolute bg-white shadow-lg mt-0 rounded-md z-10">
                    {/* <button className={dropdownItemStyle} onClick={toggleSignInPopup}>
                  User Login
                </button> */}

                    <Link
                      href="/property-organizer"
                      className={dropdownItemStyle}
                    >
                      User 
                    </Link>
                    <Link href="/Sign-in" className={dropdownItemStyle}>
                      Admin 
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/*admin is logged in */}
            {isLoggedIn && (
              <button className={buttonStyle}>
                <Link href={nextRoute}>Profile</Link>
              </button>
            )}

            {/* User is logged in. plug in ihomefinder plug in
            {isLoggedIn && isUserAuthenticated && (
            <PropertyOrganizerLogin />

            )} */}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-300 w-full py-4 px-2 absolute left-0 top-full z-40">
            <Link href="/">
              <button className={buttonStyle + " block w-full text-left py-2"}>
                Home
              </button>
            </Link>
            <Link href="/property-search">
              <button className={buttonStyle + " block w-full text-left py-2"}>
                Listings
              </button>
            </Link>
            <Link href="/Aboutme">
              <button className={buttonStyle + " block w-full text-left py-2"}>
                About Me
              </button>
            </Link>
            {/* Buyers Dropdown for Mobile */}
            <Link href="/Buyers">
              <button className={buttonStyle + " block w-full text-left py-2"}>
                Buyers
              </button>
            </Link>
            <Link
              href="/Buyers/Residential"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              Residential Buyers
            </Link>
            <Link
              href="/property-search"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              Search Property
            </Link>
            <Link
              href="/Buyers/Commercial"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              Commercial Buyers
            </Link>
            <Link
              href="/Sign-up"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              Get Listing Updates
            </Link>
            <Link
              href="/Buyers/FirstTime"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              First-Time Buyers
            </Link>
            <Link
              href="/contact"
              className={buttonStyle + " block w-full text-left py-2"}
            >
              Ask me
            </Link>
            {/* Additional Mobile Links */}
            {/* ... other mobile links */}
            <button
              className={buttonStyle + " block w-full text-left py-2"}
              onClick={toggleSignInPopup}
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Sign In Popup Modal */}
      {isSignInPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto max-h-full overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={closeSignInPopupAndShowWidget}
            >
              &times;
            </button>
            <PropertyOrganizerLogin />
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full"
              onClick={closeSignInPopupAndShowWidget}
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
