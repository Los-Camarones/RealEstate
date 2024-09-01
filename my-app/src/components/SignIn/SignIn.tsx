"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { signIn } from '../../actions/AuthActions';


const SignIn = () => {

  //email and password credentials variables
  const [email, setEmail] = useState<string>('');
  const[password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  //router 
  const router = useRouter();

/**
 * Handles login for user. Calls server action to supabase to validate credentials
 * @param event 
 */
const handleLogin = async (event: React.FormEvent) => {

  event.preventDefault();

  //call server action to supabase
  const response = await signIn(email, password);

  
  //if bad credentials, return error
  if (!response.success){
    console.log(response)
    setError(response.errorMessage  || "Unknown Error has occured")
  }
  //redirect to Account page
  else
  {
    const userID = response.userID;
    router.push('/Account'); //'Account/${userID}

  }
}

  // TODO: implement google sign in feature. may need to setup google cloud platform project .
  //See here for instructions to implement: https://egghead.io/lessons/supabase-create-an-oauth-app-with-github
  const handleGoogleSignIn = async () => {
    //await SignIn('google', { redirect: false });
  };
  
  return (
    <main>
      <div className= "flex flex-col items-center justify-center bg-white"> 
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Sign in to your account
          </h2>
          <h4 className="text-center text-gray-600 mb-2">
            Access your account to schedule meetings with Lourdes. <br className='br-style'></br>
            Access all MLS listings and stay current with daily updates.<br className='br-style'></br>
            Save and organize your favorite listings.
          </h4>
        </div>
      </div>
      <div> {/* Inline style for testing purposes */}
        <div className="flex items-center justify-center bg-white">
          <div className="max-w-lg w-full space-y-8">
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-black px-2 py-3 rounded relative mt-4 mb-2">
                    <h1 className=" text-1xl font-bold">
                      Sign in unsuccessful.
                    </h1>
                    {error}
                  </div>)
                }
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
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
                <div className="text-sm">
                  <a href="/Sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {/* This should be replaced with the actual image source */}
              
                  <Image src="/google-sign-up-button.jpg" alt="Sign in with Google" width={20} height={20} />
                  <span className="ml-2">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
);
};



export default SignIn