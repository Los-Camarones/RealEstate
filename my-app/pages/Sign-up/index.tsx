/**
 * SignUp Component
 * 
 * This is a user interface for the sign-up page designed for user registration. It collects
 * basic user information including first name, last name, email, and phone number.
 * The phone number is intended to be used as a password or part of the authentication process.
 * 
 * This component is currently unconnected to any backend services. The form submission
 * is handled by a function that currently logs the input data to the console. This is a placeholder
 * function meant to be replaced by the database team with actual sign-up logic.
 * 
 * Once submission, the handleSubmit function captures the form data and prevents
 * the default form submission behavior. This is where the sign-up logic will be implemented
 * to create new user accounts, typically involving sending a POST request to the server.
 * 
 * The component structure includes links to 'Log In' and 'Forgot Password' pages for
 * navigational purposes.
 * 
 * All inputs are controlled components, with state being managed locally via useState hooks.
 * 
 * Note: The use of the phone number field should be carefully considered for security
 * and privacy reasons. It is currently a placeholder and should be replaced with a proper
 * password field as per the final implementation plan.
 * 
 * Usage:
 * <SignUp />
 * 
 * This component is just the front-end part and requires backend integration for full
 * functionality.
 */

import NavBar from "../../src/app/components/Navbar/navbar";
import "../../src/app/globals.css";
import React, { useState } from 'react';
// Local state to store form field values
const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // Placeholder form submission handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement sign-up logic here
    console.log('Sign up with: ', { firstName, lastName, email, phone });
  };
// Sign-up form UI
  return (
            <>
        
        <NavBar />
          <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
    <div className="sign-up-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Your Account now</h2>
        <p>Signed Up? <a href="/Sign-in/page">Log In.</a></p>

        <label htmlFor="firstName">*FIRST NAME</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">*LAST NAME</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email">*EMAIL</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phone">*PHONE (will be used as password)</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">CONTINUE VIEWING</button>

        <a href="/forgot-password">Forgot Password?</a>
      </form>

      <div className="benefits">
        <h3>Access all MLS listings and stay current with daily updates.</h3>
        <h4>Better Searching</h4>
        <ul>
          <li>Save searches</li>
          <li>New property alerts</li>
          <li>View property detailed information</li>
          <li>Save & organize properties you like</li>
        </ul>
      </div>
    </div>
  </div>
    </>
  );
};

export default SignUp;
