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

import NavBar from "../../src/app/components/Navbar/navbar";
import React from "react";
// pages/login.tsx in your Next.js project
import Image from 'next/image';
import { signIn } from 'next-auth/react';
//import "./style.css";
//import "./globals.css";

const LoginPage: React.FC = () => {
            
    
      
  // Placeholder function for form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your login logic here, possibly using NextAuth's signIn function
    await signIn('credentials', { redirect: false, email: '', password: '' });
  };

  // Placeholder function for Google Sign-In
  const handleGoogleSignIn = async () => {
    await signIn('google', { redirect: false });
  };
 // Login form UI
  return (
        <>
        
        <NavBar />
    
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
            <div className="text-sm">
              <a href="/Sign-up/page" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign up
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or login with</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {/* This should be replaced with the actual image source */}
           
              <Image src="/google-sign-up-button.jpg" alt="Sign in with Google" width={20} height={20} />
              <span className="ml-2">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
