"use client";

import { revalidatePath } from "next/cache";
import { redirect, useRouter } from 'next/navigation'
import NavBar from '../../components/Navbar/navbar';
//import "../globals.css";
import React, { useState } from 'react';
import { insertNewUser, signUp } from "../../actions/AuthActions";


// Local state to store form field values
const SignUp: React.FC = () => {

  //user information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  //error variable incase user gets error signing up
  const [error, setError] = useState<string>('');

  const router = useRouter();


  /**
   * Handles login for user. Calls server action to supabase to validate credentials
   * @param event 
   */
  const handleSignUp = async (event: React.FormEvent) => {

    event.preventDefault();

    //call server action to supabase
    const response = await signUp(email, password);


    //if bad credentials, return error
    if (!response.success){
      console.log(response)
      setError(response.errorMessage  || "Unknown Error has occured")
    }
    
    //call server action to insert user to schema
    //TODO: fix this section. cannot insert into our schema if user has not confirmed email (bc no session state)
    //So user cannot access /Account page
    //Solution: maybe reroute user to new page, wait till confirmation, then can add to schema 
    const responseInsert = await insertNewUser(email, firstName, lastName, phone);
    
    if(!responseInsert.success)
    {
      console.log(responseInsert.errorMessage)
      setError(responseInsert.errorMessage  || "Error inserting user to database")
    }
    //redirect to Account page
    else
    {
      router.push('/Account'); //'Account/${userID}

    }
  }


// Sign-up form UI
  return (
    <main>
      <div className= "min-h-screen flex flex-col items-center justify-center bg-white"> 
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Create an account
          </h2>
          <h4 className="text-center text-gray-600 mb-4">
            Create an account to schedule meetings immediately with Lourdes. <br className='br-style'></br>
            Access all MLS listings and stay current with daily updates.<br className='br-style'></br>
            Save and organize your favorite listings
          </h4>
        </div>
        <div className="rounded-md border-2 border- md:w-1/2 p-4">
          {/*error div only appears if there was an error creating account */}
          {error && (
                  <div className="bg-red-100 border border-red-400 text-black px-2 py-3 rounded relative mt-4 mb-2">
                    <h1 className=" text-1xl font-bold">
                      Account creation unsuccessful.
                    </h1>
                    {error}
                  </div>)
          }
          <form className= "flex flex-col items-center " onSubmit={handleSignUp}>

            <h1 className="text-left w-3/4 p-1 font-bold text-gray-600">
            Personal Infomation
            </h1>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />

            <input
              type="text"
              id="lastName"
              name="lastName"
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />

            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
              placeholder="Phone Number"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password*"
              className="w-3/4 rounded-md border-2 border-gray-300 px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"

            />
            <p className="w-3/4">
              *Create a password with 8 to 25 characters that includes at least one uppercase, one lowercase, and one number
            </p>

              <button type="submit" className="w-3/4 mt-4 px-4 py-2 bg-[#299FDD] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
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
