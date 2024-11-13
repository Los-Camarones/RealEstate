"use client";

import NavBar from "../../components/Navbar/navbar";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "../globals.css";
import Link from 'next/link';
import styles from "./about.module.css";
import Footer from "../../components/Footer/footer";
import RecentlySoldHouses from "../../components/RecentlySoldHouses/RecentlySoldHouses";
import { motion } from "framer-motion";

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
        .single();

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
    <main className={styles["about-page"]}>
      <header>
        <NavBar />
      </header>
      
      <section className="about-header flex flex-col items-center md:flex-row md:items-center md:justify-center">
        <div className="about-title md:mr-20 md:mt-40">
          <Link href="/">
            <img
              className="about-image object-contain"
              src="/logo_.png"
              alt="Lourdes Mendoza logo"
            />
          </Link>
          {/* Social Media Icons */}
          <div className="social-icons flex space-x-4 mt-4">
            <a
              href="https://www.instagram.com/lourdesmendoza1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://www.facebook.com/Lolucasellsrealestate/?checkpoint_src=any"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-square text-xl"></i>
            </a>
            <a
              href="https://www.youtube.com/@LourdesMendozaTV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube-square text-xl"></i>
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2Flourdesmendoza"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter-square text-xl"></i>
            </a>
          </div>
          <div className="mt-4">
            <a href="/Merchandise">
              <button className={styles.merchandiseButton}>
                Check out my Merchandise
              </button>
            </a>
          </div>
          {/* Contact Info with Icons */}
          <div className={styles.h2}>
            <div className="flex items-center mb-2 pb-2 hover:border-b hover:border-gray-300 hover:w-full transition-all duration-300">
              <a href={`tel:${contactInfo?.phone}`} className="flex items-center">
                <img src="telephone-icon.webp" alt="Phone" className="w-4 h-4 mr-2" />
                <span>{contactInfo?.phone}</span>
              </a>
            </div>
            <div className="flex items-center mb-2 pb-2 hover:border-b hover:border-gray-300 hover:w-full transition-all duration-300">
              <a href={`mailto:${contactInfo?.email}`} className="flex items-center">
                <img src="email-icon.webp" alt="Email" className="w-4 h-4 mr-2" />
                <span>{contactInfo?.email}</span>
              </a>
            </div>
            <div className="flex items-center mb-2 pb-2 hover:border-b hover:border-gray-300 hover:w-full transition-all duration-300">
              <a
                href={`https://www.google.com/maps/place/550+Howe+Ave+%23200,+Sacramento,+CA+95825`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img src="address-icon.png" alt="Location" className="w-4 h-4 mr-2" />
                <span>{contactInfo?.address}</span>
              </a>
            </div>
          </div>
        </div>

        <img
          className="about-image object-contain w-full md:max-w-xs md:m-5"
          src="/lourdes-removebg-preview.png"
          alt="Lourdes Mendoza"
        />
      </section>
      
      <hr />
      
      {/* Render Supabase Content Dynamically with Local Images */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`${styles["about-section"]}`}
        >
          <div>
            <motion.h2
              className={styles.h1}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {section.heading_text}
            </motion.h2>
            <motion.p
              className={styles.body}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {section.paragraph_text}
            </motion.p>
          </div>
          <div>
            <motion.img
              src={
                index === 0
                  ? "/sacTrees.jpg"
                  : index === 1
                  ? "/sacBridge.jpg"
                  : "/midtownSac.jpg"
              }
              alt={section.heading_text}
              className="about-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </section>
      ))}

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