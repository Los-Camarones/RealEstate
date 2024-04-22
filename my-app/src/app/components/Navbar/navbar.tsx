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
        <>
          <div className="bg-transparent z-50">
            <div className="flex justify-between items-center px-4 py-2 md:px-6">
              <div className="md:hidden">
                <button className={buttonStyle} onClick={toggleDropdown}>Menu</button>
              </div>
            </div>


            {/*If a user is a mobiler user, it will automatically dispaly a hamburger menu. If on pc it will keep hidden */}
            <div
                className={`md:flex md:justify-end ${isDropdownOpen ? 'block' : 'hidden'} bg-transparent md:px-4 md:py-2`}>
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


              <Link href="/WhatMyHomeWorth">
                <button className={buttonStyle}>
                  What's My Home Worth?
                </button>
              </Link>


              {/*<Link href="/Sign-in"*/}
              {/*create dropdown menu*/}
              <div className="dropdown button">
                <button className={buttonStyle} onClick={toggleDropdown}>
                  Login
                </button>
                {/*dropdown menu*/}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-gray-200 rounded-md shadow-lg">
                      <Link href="/Sign-in" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Sign In<a/>
                      </Link>
                      <Link href="/Sign-up" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Create
                        account<a/>
                      </Link>
                    </div>

                )}
              </div>

            </div>
          </div>
          <div
              className="FindYouAHome w-max h-max px-64 py-28 bg-black flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="Frame22 flex-col justify-center items-center gap-10 flex">
              <div className="DivCompLu20cstt5 pr-48 pt-6 pb-2 justify-start items-center inline-flex">
                <div
                    className="LetSFindAHometext-neutral-800 text-3xl font-bold font-['Inter'] leading-10">Let's
                  find a home that's perfect for you
                </div>
              </div>
              <div className="SpanWixuiRichTextText flex-col justify-center items-start gap-0.5 flex">
                <div
                    className=" w-96 text-neutral-800 text-base font-normal font-['Inter'] leading-7">I
                  consider myself extremely fortunate to be doing exactly what I want to do in life. In my
                  case this
                  means working with my family and friends, friends of my friends, and other personal
                  referrals to buy
                  and sell real
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">estate
                  in the greater Sacramento area, as well as in Sutter, Yolo and Yuba Counties. I lived in
                  Marysville
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">until
                  I graduated from Lindhurst H.S. After H.S., I was off to CSU Sacramento where I obtained a
                  B.S. in
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">Communication
                  Studies. Coming from an agricultural, migrant background, my parents did not have the
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">means
                  to pay for my college education so I put myself through school by working in the fields
                  during
                </div>
                <div
                    className="SummerBreakAndThenByWorkingAsAStudentAssistantWhileInCollegeIExperiencedMyFirstMajor text-neutral-800 text-base font-normal font-['Inter'] leading-7">summer
                  break and then by working as a student assistant. While in college, I experienced my first
                  major
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">success
                  in life. I was able to travel abroad and live in Sweden as an international student for one
                  year.
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">One
                  of the most rewarding experiences! I knew then that anything was possible. I felt very proud
                  to live
                  in
                </div>
                <div
                    className=" text-neutral-800 text-base font-normal font-['Inter'] leading-7">a
                  different culture and to be able to adapt so well. The highlight of my year abroad was
                  traveling to
                  St.
                </div>
                <div
                    className="PetersburgRussiaIEnjoyBeingARealtorBecauseILoveWorkingCloselyWithIndividualsAndLearning text-neutral-800 text-base font-normal font-['Inter'] leading-7">Petersburg,
                  Russia. I enjoy being a Realtor because I love working closely with individuals and learning
                </div>
                <div
                    className="AboutTheirGoalsAndDreamsOfHomeOwnershipIAmExcitedToAssistIndividualsInAttainingTheirGoal text-neutral-800 text-base font-normal font-['Inter'] leading-7">about
                  their goals and dreams of home ownership. I am excited to assist individuals in attaining
                  their goal
                </div>
                <div
                    className="OfHomeownershipTheMostImportantThingToKnowIsIAmProfessionalAndISeekEducationInOrder text-neutral-800 text-base font-normal font-['Inter'] leading-7">of
                  homeownership. The most important thing to know is, I am professional and I seek education
                  in order
                </div>
                <div
                    className="ToStayCurrentOnAnEverChangingRealEstateMarketIWouldOfNeverExpectToBeGivenYourBusiness text-neutral-800 text-base font-normal font-['Inter'] leading-7">to
                  stay current on an ever changing Real Estate market. I would of never expect to be given
                  your
                  business
                </div>
                <div
                    className="BecauseOfOurRelationshipOrHowWeMayKnowEachOtherHoweverIfYouEverHaveAResidentialReal text-neutral-800 text-base font-normal font-['Inter'] leading-7">because
                  of our relationship, or how we may know each other. However, if you ever have a residential
                  real
                </div>
                <div
                    className="EstateNeedIWouldBeExtremelyHonoredIfYouWouldGiveMeAnOpportunityToWorkHardForYouTo text-neutral-800 text-base font-normal font-['Inter'] leading-7">estate
                  need, I would be extremely honored if you would give me an opportunity to work hard for you
                  to
                </div>
                <div
                    className="EarnYourBusinessThankYouSoMuchForTakingTheTimeReadALittleAboutMeItIsAppreciated text-neutral-800 text-base font-normal font-['Inter'] leading-7">earn
                  your business. Thank you so much for taking the time read a little about me. It is
                  appreciated.
                </div>
              </div>
            </div>
          </div>
        </>
)
  ;
}

export default NavBar;
