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

import { revalidatePath } from "next/cache";
import { redirect, useRouter } from 'next/navigation'
import NavBar from '../../components/Navbar/navbar';
import SignUp from "../../components/SignUp/SignUp";
import "../globals.css";
import supabase from '../../utils/supabase/supabaseClient';
import React, { useState } from 'react';
// Local state to store form field values
const SignUpPage: React.FC = () => {

  return(
    <main>
      <header>
        <NavBar></NavBar>
      </header>

      <SignUp></SignUp>


    </main>
  );
};

export default SignUpPage;
