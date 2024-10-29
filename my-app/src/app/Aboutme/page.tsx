import NavBar from "../../components/Navbar/navbar";
import React from "react";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import './about.css'; // Link the new CSS file
import Reviews from "../../components/staticReviews/reviews";
import Footer from "../../components/Footer/footer";
import RecentlySoldHouses from "../../components/RecentlySoldHouses/RecentlySoldHouses";
import IHomeFinderContactWidget from "../../components/iHomeFinderContactWidget/iHomeFinderContactWidget";

const Aboutme: React.FC = () => {
  return (
    <main className="about-page">
      <header>
        <NavBar />
      </header>
      
      <section className="about-header flex flex-col md:flex-row md:items-center md:justify-center">
        <div className="about-title md:mr-20 md:mt-40">
          <h1>Lourdes Mendoza</h1>
          <h3>Local Sacramento Realtor</h3>
          <p>Turning your dreams into an Address</p>

          {/* Social Media Icons*/}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      <div className="social-icons flex space-x-4 mt-4">
        <a href="https://www.instagram.com/lourdesmendoza1/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram text-xl"></i>
      </a>
      <a href="https://www.facebook.com/Lolucasellsrealestate/?checkpoint_src=any" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook-square text-xl"></i>
      </a>

{/*}
      <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin-square text-xl"></i>
      </a>
      */}

      <a href="https://www.youtube.com/@LourdesMendozaTV" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube-square text-xl"></i>
      </a>
     
      <a href="https://x.com/i/flow/login?redirect_after_login=%2Flourdesmendoza" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter-square text-xl"></i>
      </a>
    </div>

    {/* Contact Info with Icons */}
    <div className="contact-info mt-4">
      <div className="flex items-center mb-2">
        <img src="telephone-icon.webp" alt="Phone" className="w-4 h-4 mr-2" />
        <span> +1 (916) 516-0007</span>
      </div>
      <div className="flex items-center mb-2">
        <img src="email-icon.webp" alt="Email" className="w-4 h-4 mr-2" />
        <span>lourdesmendoza1@yahoo.com</span>
      </div>
      <div className="flex items-center">
        <img src="address-icon.png" alt="Location" className="w-4 h-4 mr-2" />
        <span>550 Howe Avenue, Suite 200 Sacramento, CA 95825</span>
      </div>
    </div>
  </div>
        <img
          className="about-image object-contain w-full md:max-w-xs md:m-5"
          src="/lourdes-removebg-preview.png"
          alt="Lourdes Mendoza"
        />
      </section>

      <section className="about-section flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2>Serving The City of Trees</h2>
          <p>
            I consider myself extremely fortunate to be doing exactly what I want to do in life. In my case, this means working with my family, friends, and other personal referrals to buy and sell real estate in the Greater Sacramento area, as well as in Sutter, Yolo, and Yuba Counties. I lived in Marysville until graduating from Lindhurst H.S. After high school, I attended CSU, Sacramento, where I earned a B.S. in Communication Studies with an emphasis on Organizational Communication.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/sacTrees.jpg" alt="Sacramento Trees" className="about-image" />
        </div>
      </section>

      <section className="about-section flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <img src="/sacBridge.jpg" alt="Sacramento Bridge" className="about-image" />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2>From Migrant Roots to Global Pursuits</h2>
          <p>
            Coming from an agricultural, migrant background, my parents did not have the means to pay for my college education, so I put myself through school by working in the fields during summer breaks and later as a student assistant. While in college, I experienced my first major success in life: studying abroad in Sweden for a year. Living abroad taught me that anything is possible. I was proud to adapt to a new culture, and the highlight of my year was traveling to St. Petersburg, Russia, Berlin, Germany, London, England, and Helsinki, Finland.
          </p>
        </div>
      </section>

      <section className="about-section flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2>Dedicated to Your Success in Real Estate</h2>
          <p>
            I love working closely with individuals to help them achieve their dreams of homeownership. I am passionate about staying current in the ever-changing real estate market. While I would never expect business based on relationships alone, I would be honored to earn your trust and assist with your residential real estate needs. Thank you for taking the time to learn a little about me. It is truly appreciated.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/midtownSac.jpg" alt="Midtown Sacramento" className="about-image" />
        </div>
      </section>

      <div>
        <RecentlySoldHouses /> 
      </div>

      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Aboutme;
