"use client";

import NavBar from "../../components/Navbar/navbar";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import './about.css';
import Reviews from "../../components/staticReviews/reviews";
import Footer from "../../components/Footer/footer";
import RecentlySoldHouses from "../../components/RecentlySoldHouses/RecentlySoldHouses";
import IHomeFinderContactWidget from "../../components/iHomeFinderContactWidget/iHomeFinderContactWidget";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AboutSection {
  id: number;
  section_text: string;
  heading_text: string;
  paragraph_text: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const Aboutme: React.FC = () => {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutSections = async () => {
      const { data, error } = await supabase
        .from("text_content")
        .select("section_text, heading_text, paragraph_text")
        .order("id");

      if (error) {
        console.error("Error fetching sections:", error.message);
      } else if (data) {
        setSections(data as AboutSection[]);
      }
    };

    const fetchContactInfo = async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("phone, email, address")
        .single(); // Assuming there's only one row for contact info

      if (error) {
        console.error("Error fetching contact info:", error.message);
      } else if (data) {
        setContactInfo(data as ContactInfo);
      }

      setLoading(false);
    };

    fetchAboutSections();
    fetchContactInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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

          {/* Social Media Icons */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
          <div className="social-icons flex space-x-4 mt-4">
            <a href="https://www.instagram.com/lourdesmendoza1/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://www.facebook.com/Lolucasellsrealestate/?checkpoint_src=any" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square text-xl"></i>
            </a>
            <a href="https://www.youtube.com/@LourdesMendozaTV" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube-square text-xl"></i>
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Flourdesmendoza" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter-square text-xl"></i>
            </a>
          </div>
            <div className="mt-4">
            <a
              href="/Merchandise"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Check out my Merchandise
            </a>
            </div>
          {/* Contact Info with Icons */}
          <div className="contact-info mt-4">
            <div className="flex items-center mb-2">
              <img src="telephone-icon.webp" alt="Phone" className="w-4 h-4 mr-2" />
              <span>{contactInfo?.phone}</span>
            </div>
            <div className="flex items-center mb-2">
              <img src="email-icon.webp" alt="Email" className="w-4 h-4 mr-2" />
              <span>{contactInfo?.email}</span>
            </div>
            <div className="flex items-center">
              <img src="address-icon.png" alt="Location" className="w-4 h-4 mr-2" />
              <span>{contactInfo?.address}</span>
            </div>
          </div>
        </div>
        <img
          className="about-image object-contain w-full md:max-w-xs md:m-5"
          src="/lourdes-removebg-preview.png"
          alt="Lourdes Mendoza"
        />
      </section>
      <hr></hr>
      {/* Render Supabase Content Dynamically with Local Images */}
      <section className="about-section flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2>{sections[0]?.heading_text || "Serving The City of Trees"}</h2>
          <p>{sections[0]?.paragraph_text || "Description for Serving The City of Trees..."}</p>
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
          <h2>{sections[1]?.heading_text || "From Migrant Roots to Global Pursuits"}</h2>
          <p>{sections[1]?.paragraph_text || "Description for From Migrant Roots to Global Pursuits..."}</p>
        </div>
      </section>

      <section className="about-section flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <h2>{sections[2]?.heading_text || "Dedicated to Your Success in Real Estate"}</h2>
          <p>{sections[2]?.paragraph_text || "Description for Dedicated to Your Success in Real Estate..."}</p>
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
