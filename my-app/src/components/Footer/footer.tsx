"use client"; // Ensures client-side rendering

import React, { useState } from 'react';
import './Footer.css'; // Import CSS file
import ContactMe from "../../components/ContactMe/ContactMe";
import FooterLinks from "@/components/FooterLinks/FooterLinks";

const categories = [
  {
    title: '',
    links: [
      { label: 'Privacy Policy', href: '/idx?path=/property-organizer/&section=policy' },
    ],
  },
];

const Footer = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const toggleContactForm = () => {
    setIsContactFormOpen(!isContactFormOpen);
  };

  return (
    <div id="footer" className="footer-container">
      {/* Contact Me section with dropdown functionality */}
      <div className="contact-form-container">
        <ContactMe />
      </div>

      {/* Footer content */}
      <div className="footer-content">
        <p className="footer-text-left">©Copyright 2024. Real Estate®</p>

        {/* MetroList Logo */}
        <a href="https://www.metrolist.com/">
          <img src="/metrolist-logo.png" alt="Footer Image" className="footer-image" />
        </a>

        {/* Privacy Policy Link */}
        <div className="footer-privacy">
          <FooterLinks categories={categories} />
        </div>

        {/* Right Footer Caption */}
        <p className="footer-text-right">Powered by Los Camarones.</p>
      </div>
    </div>
  );
};

export default Footer;
