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
import { FaInstagram, FaFacebookSquare, FaYoutubeSquare, FaTwitterSquare } from "react-icons/fa";

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
        .select("id, section_text, heading_text, paragraph_text")
        .order("id");

      if (error) {
        console.error("Error fetching sections:", error.message);
      } else if (data) {
        const filteredSections = data.filter(
          (section) => section.heading_text !== "About Lourdes Mendoza"
        );
        setSections(filteredSections as AboutSection[]);
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

      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
        <div className={styles["hero-text"]}>
      <Link href="/">
        <motion.img
          className={styles["hero-logo"]}
          src="/logo_.png"
          alt="Lourdes Mendoza logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </Link>


            <motion.h1
              className={styles["hero-title"]}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Lourdes Mendoza Real Estate
            </motion.h1>

            <motion.p
              className={styles["hero-subtitle"]}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Your trusted partner in finding the perfect home.
            </motion.p>

            {/* Merchandise Button */}
            <motion.div
              className={styles["hero-button"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <a href="/Merchandise">
                <button className={styles.merchandiseButton}>
                  Check out my Merchandise
                </button>
              </a>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              className={styles["social-icons"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <a
                href="https://www.instagram.com/lourdesmendoza1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/Lolucasellsrealestate/?checkpoint_src=any"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.youtube.com/@LourdesMendozaTV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutubeSquare />
              </a>
              <a
                href="https://twitter.com/lourdesmendoza"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitterSquare />
              </a>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className={styles["contact-info"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div>
                <a href={`tel:${contactInfo?.phone}`} className={styles["contact-link"]}>
                  <img src="telephone-icon.webp" alt="Phone" />
                  <span>{contactInfo?.phone}</span>
                </a>
              </div>
              <div>
                <a href={`mailto:${contactInfo?.email}`} className={styles["contact-link"]}>
                  <img src="email-icon.webp" alt="Email" />
                  <span>{contactInfo?.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={`https://www.google.com/maps/place/${encodeURIComponent(contactInfo?.address || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["contact-link"]}
                >
                  <img src="address-icon.png" alt="Location" />
                  <span>{contactInfo?.address}</span>
                </a>
              </div>
              <hr className={styles["contact-divider"]} />
            </motion.div>
          </div>
          

          <div className={styles["hero-image-container"]}>
          <motion.img
              className={styles["hero-image"]}
              src="/lourdes.jpg"
              alt="Lourdes Mendoza"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{ scale: 1.05 }} // Scale up by 5% on hover
        />

          </div>
        </div>
      </section>

      {/* Render Supabase Content Dynamically with Local Images */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`${styles["about-section"]} ${index % 2 === 0 ? styles["section-even"] : styles["section-odd"]}`}
        >
          <div className={styles["section-content"]}>
            <motion.div
              className={styles["section-text"]}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles["section-heading"]}>{section.heading_text}</h2>
              <p className={styles["section-paragraph"]}>{section.paragraph_text}</p>
            </motion.div>
            <motion.div
              className={styles["section-image-container"]}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={
                  index === 0
                    ? "/sacTrees.jpg"
                    : index === 1
                    ? "/sacBridge.jpg"
                    : "/midtownSac.jpg"
                }
                alt={section.heading_text}
                className={styles["section-image"]}
              />
            </motion.div>
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
