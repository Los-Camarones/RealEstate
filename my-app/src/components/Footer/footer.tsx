import React, { useState } from 'react';

import './Footer.css'; //Import css file
import ContactMe from "../../components/ContactMe/ContactMe";

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:lourdesmendoza1@yahoo.com?subject=Message from ${formData.firstName} ${formData.lastName}&body=Hello, my name is ${formData.firstName} ${formData.lastName}. Here is my message: ${formData.message}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div id="footer" className="footer-container">
      {/* Contact Me form above the footer text */}
      <div className="contact-form-container">
        <ContactMe />
        <h2>Submit a message to Lourdes</h2>
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message"
            className="form-textarea"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      <div className="footer-content">
        <p className="footer-text-left">©Copyright 2024. Real Estate.</p>
        <a href="https://www.metrolist.com/">
          <img src="/metrolist-logo.png" alt="Footer Image" className="footer-image" />
        </a>
        <p className="footer-text-right">Powered by Los Camarones.</p>
      </div>
    </div>
  );
};

export default Footer;

