"use client";
import React, { useState } from "react";
import { sendResetPasswordRequest } from "../../actions/AuthActions";
import { useRouter} from 'next/navigation';


const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>('');
  const router = useRouter();


  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();

    //send a request to user's email
    const responseEmailRequest = await sendResetPasswordRequest(email);

    if(responseEmailRequest.success)
    {
      router.push('/forgotpassword/success');
    }


    console.log(email);
  };
  return (
    <form onSubmit={handlePasswordReset}>
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ForgotPassword;
