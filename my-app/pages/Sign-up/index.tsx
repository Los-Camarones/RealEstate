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
    <main>
      <header>
          <NavBar />
      </header>
      <div className= "min-h-screen flex flex-col items-center justify-center bg-white"> 
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Create an account
          </h2>
          <h4 className="text-center text-gray-600 mb-2">
            Create an account to schedule meetings immediately with Lourdes. <br className='br-style'></br>
            Access all MLS listings and stay current with daily updates.<br className='br-style'></br>
            Save and organize your favorite listings
          </h4>
        </div>
        <div className="rounded-md border-2 border- w-1/2 p-4">
          <form className= "flex flex-col items-center " onSubmit={handleSubmit}>

            <h1 className="text-left w-3/4 p-1 font-bold text-gray-600">Personal Infomation</h1>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />

            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />
            <h1 className="text-left w-3/4 p-1 font-bold text-gray-600 mt-4">Account Information</h1>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />

            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Password*"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />
            <p className="w-3/4">
              *Create a password with 8 to 25 characters that includes at least one uppercase, one lowercase, and one number
            </p>

              <button type="submit" className="mt-4 px-4 py-2 bg-[#299FDD] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Create Account
              </button>

              <a href="/Sign-in" className="mt-2 block text-[#299FDD] hover:underline">
              Already have an account?
              </a>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
