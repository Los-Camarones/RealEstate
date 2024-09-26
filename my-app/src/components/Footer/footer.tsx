import React from 'react';
import './Footer.css'; //Import css file
import ContactMe from "../../components/ContactMe/ContactMe";
import NavBar from '../../components/Navbar/navbar';


const Footer = () => {
  return (
    <div className="footer-container">
    {/* Contact Me form above the footer text */}
    <div className="contact-form-container">
      <ContactMe />
    </div>

    <div className="navbar">
      <NavBar/>
    </div>

    <div className="footer-content">
      <p className="footer-text-left">©Copyright 2024. Real Estate.</p>
      <a href ="https://www.metrolist.com/">
      <img src="/metrolist-logo.png" alt="Footer Image" className="footer-image" />
      </a>
      <p className="footer-text-right">Powered by Los Camarones.</p>
    </div>
  </div>
  );
};

export default Footer;

