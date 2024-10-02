import NavBar from "../../components/Navbar/navbar";
import React from "react";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import Reviews from "../../components/staticReviews/reviews";
import Footer from "../../components/Footer/footer";


const Aboutme: React.FC = () => {
  return (
    <main>
      <header>
        <NavBar />
      </header>
      
      <section className="flex flex-col md:flex-row md:items-center md:justify-center bg-gray-50 mx-4">
        <div className="md:mr-20 md:mt-40">
          <h1 className="text-4xl text-[#299FDD] font-bold">Lourdes Mendoza</h1>
          <p className="text-2xl">Local Sacramento Realtor</p>
        </div>
        <img
          className="object-contain w-full md:max-w-md md:m-5"
          src="/lourdes-removebg-preview.png"
          alt="Lourdes Mendoza"
        />
      </section>

      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">Serving The City of Trees</h2>
          <p className="text-2xl mb-4">
            I consider myself extremely fortunate to be doing exactly what I want to do in life. In my case, this means working with my family, friends, and other personal referrals to buy and sell real estate in the Greater Sacramento area, as well as in Sutter, Yolo, and Yuba Counties. I lived in Marysville until graduating from Lindhurst H.S. After high school, I attended CSU, Sacramento, where I earned a B.S. in Communication Studies with an emphasis on Organizational Communication.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/sacTrees.jpg" alt="Sacramento Trees" className="w-full h-auto" />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <img src="/sacBridge.jpg" alt="Sacramento Bridge" className="w-full h-auto" />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">From Migrant Roots to Global Pursuits</h2>
          <p className="text-2xl mb-4">
            Coming from an agricultural, migrant background, my parents did not have the means to pay for my college education, so I put myself through school by working in the fields during summer breaks and later as a student assistant. While in college, I experienced my first major success in life: studying abroad in Sweden for a year. Living abroad taught me that anything is possible. I was proud to adapt to a new culture, and the highlight of my year was traveling to St. Petersburg, Russia, Berlin, Germany, London, England, and Helsinki, Finland.
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">Dedicated to Your Success in Real Estate</h2>
          <p className="text-2xl mb-4">
            I love working closely with individuals to help them achieve their dreams of homeownership. I am passionate about staying current in the ever-changing real estate market. While I would never expect business based on relationships alone, I would be honored to earn your trust and assist with your residential real estate needs. Thank you for taking the time to learn a little about me. It is truly appreciated.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/midtownSac.jpg" alt="Midtown Sacramento" className="w-full h-auto" />
        </div>
      
      <div>
        <ContactMe></ContactMe>
      </div>
      </div>

      <div>
        <footer></footer>
      </div>
    </main>
  );
};

export default Aboutme;

