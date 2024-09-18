import NavBar from "../../components/Navbar/navbar";
import React from "react";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";

const Aboutme = () => {
  return (
    <main>
      <header>
        <NavBar />
      </header>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center bg-gray-50 mx-4">{/* flex flex col for mobile devices to stack columns. md for medium screens to place stuff by row */}
        <div className="md:mr-20 md:mt-40">
          <h1 className="text-4xl text-[#299FDD] font-bold">
            Lourdes Mendoza
          </h1>
          <p className="text-2xl">
            Local Sacramento Realtor
          </p>
        </div>
        <img
          className="object-contain w-full md:max-w-md md:m-5"
          src="/lourdes-removebg-preview.png"
          alt="Transparent background image"
        />
      </div>

      {/*div 1 with text on left and image on right */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">Serving The City of Trees</h2>
          <p className="text-2xl mb-4">
              I consider myself extremely fortunate to be doing exactly what I want to do in life. In my case this means working with my family and friends, friends of my friends, and other personal referrals to buy and sell Real Estate in the Greater Sacramento area, as well as in Sutter, Yolo and Yuba Counties.
              I lived in Marysville until I graduated from Lindhurst H.S. After H.S., I was off to college at CSU, Sacramento where I obtained a B.S. with a double major in Communication Studies with an emphasis in Organizational Communication. </p>
        </div>

        <div className="lg:w-1/2 p-4">
        <img src="/sacTrees.jpg" alt="Image of Sacramento Trees" className="w-auto h-auto" />
        </div>
      </div>


      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
        <img src="/sacBridge.jpg" alt="Image of Sacramento Bridge" />
        </div>

        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">From Migrant Roots to Global Pursuits</h2>
          <p className="text-2xl">
          Coming from an agricultural, migrant background, my parents did not have the means to pay for my college education so I put myself through school by working in the fields during summer break and then by working as a student assistant.
           While in college, I experienced my first major success in life when I was able to travel and live abroad in Sweden as an international student for one year.  
           This turned out to be one of the most rewarding experiences!  Living abroad taught me that anything is possible. I felt very proud to live in a different culture and to be able to adapt so well. 
           The highlight of my year was traveling to St. Petersburg, Russia, Berlin, Germany, London, England and Helsinki, Finland.

          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">
            Dedicated to Your Success in Real Estate
          </h2>
          <p className="text-2xl mb-4">
              I enjoy being a Realtor because I love working closely with individuals and learning about their goals and dreams of homeownership. I am excited to assist individuals in attaining their goal of homeownership. 
              The most important thing to know is, I am professional and I seek education in order to stay current on an ever-changing  Real Estate market. I would never expect to be given your business because of our relationship, or how we may know each other. 
              However, if you ever have a residential Real Estate need, I would be extremely honored if you would give me an opportunity to work hard for you to earn your business. Thank you so much for taking the time to read a little about me. It is appreciated.
          </p>
        </div>

        <div className="lg:w-1/2 p-4">
        <img src="/midtownSac.jpg" alt="Image of Midtown Sacramento" />
        </div>
      </div>
      <div>
        <ContactMe></ContactMe>
      </div>

  </main>
  );
};

export default Aboutme;
