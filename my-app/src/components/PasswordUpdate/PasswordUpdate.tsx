"use client";
import React, { useEffect, useState } from "react";
import { signOut, updatePassword } from "../../actions/AuthActions";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/supabaseClient";

const PasswordUpdate = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();


  useEffect(() => {
    async function init() {

      const supabase = createClient();


      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
          console.error("Missing code");
          return;
        }

        const { data: newSession, error: newSessionError } =
          await supabase.auth.exchangeCodeForSession(code);

        console.log("NEW SESSION DATA:", newSession.session);

        if (newSessionError) {
          console.log(newSessionError);
        }
      }
    }

    init();
  }, []);
  
  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (passwordMatch(password, confirmPassword)) {
      //call response to update password
      const response = await updatePassword(password);

      //if successfull, still log out the user so they sign in again
      if (response.success) {
        console.log("password updated successfully. ");
        //signOut
        router.push("/");
      } else {
        console.log(response.error);
        setError(response.error || "Unknown Error has occured");
      }
    } else {
      console.log("Passwords don't match");
      setError("Passwords don't match");
    }
  };

  const passwordMatch = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordUpdate}>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="pwd"
          name="pwd"
          type="password"
          autoComplete="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="password" className="sr-only">
          Confirm Password
        </label>
        <input
          id="pwd"
          name="pwd"
          type="password"
          autoComplete="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
