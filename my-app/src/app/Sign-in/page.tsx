/**
 * LoginPage Component
 *
 * This component serves as the user interface for the login page. It's designed to authenticate
 * users by collecting their email addresses and passwords. Additionally, it provides an option
 * to sign in via Google using OAuth.
 *
 * The interface consists of two main parts:
 * 1. A form for users to input their credentials and submit them for login.
 * 2. A button that triggers the Google Sign-In process.
 *
 * The `handleLogin` function is a placeholder that currently prevents the default form submission
 * and should contain the logic for authenticating the user against the backend. The actual
 * authentication logic will be implemented by the authentication team and should replace the
 * placeholder.
 *
 * Similarly, the `handleGoogleSignIn` function is set up to demonstrate the intended functionality
 * and will need to be connected to Google's authentication services by the authentication team.
 *
 * Usage:
 * <LoginPage />
 *
 * The component is currently standalone and does not interface with any backend services or
 * databases. The intended behavior, once integrated, is for successful authentication to redirect
 * the user to their dashboard or home page and handle any login failures appropriately.
 */
//'use client'

import NavBar from '../../components/Navbar/navbar';
import React, { useState } from "react";
import SignIn from '../../components/SignIn/SignIn';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import "../globals.css";
//import supabase from "../../utils/supabase/supabaseClient";
import router from "next/router";

const LoginPage: React.FC = () => {
return(
  <main>
      <header>
        <NavBar />
      </header>
    <div>
      <SignIn></SignIn>
    </div>
  </main>
)
}

export default LoginPage;
