"use client";
import React, { useEffect, useState } from "react";
import { signOut, updatePassword } from "../../actions/AuthActions";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabase/supabaseClient"; // Use supabase instance directly

const PasswordUpdate = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function init() {
      // Get the PKCE code from the URL
      const tokenHash = new URLSearchParams(window.location.search).get("token_hash");

      if (!tokenHash) {
        setError("Missing token hash parameter");
        return;
      }

      if (tokenHash.startsWith("pkce_")) {
        // Remove the "pkce_" prefix from the token
        const code = tokenHash.substring(5);

        console.log("CODE", code);

        // Exchange code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log(data);

        if (error) {
          console.log("Error with session");
          setError(error.message);
          return;
        }

        // Check validity of session
        if (data.session) {
          console.log("Session acquired", data.session);
        } else {
          setError("Invalid session");
        }
      }
    }

    init();
  }, []);

  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (passwordMatch(password, confirmPassword)) {
      // Call response to update password
      const response = await updatePassword(password);

      // If successful, log out the user so they sign in again
      if (response.success) {
        console.log("Password updated successfully.");
        router.push("/");
      } else {
        console.log(response.error);
        setError(response.error || "An unknown error has occurred");
      }
    } else {
      console.log("Passwords don't match");
      setError("Passwords don't match");
    }
  };

  const passwordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
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

        <label htmlFor="confirm-password" className="sr-only">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
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
