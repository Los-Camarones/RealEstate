"use client";

import React from "react";
import useAuth from "../../hooks/useAuth";
import "../../globals.css";
import NavBar from "@/components/Navbar/navbar";

// Define the structure of your sections (e.g., Home, About Me, Get Prequalified, Communities)
const Page = () => {
  const auth = useAuth(); // Authentication hook

  if (!auth) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="p-6">
        <h1 className="text-5xl font-bold mb-5">Image Management</h1>

        {/* Home Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Home</h2>
          {/* Home section content goes here */}
        </section>

        {/* About Me Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          {/* About Me section content goes here */}
        </section>

        {/* Get Prequalified Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get Prequalified</h2>
          {/* Get Prequalified section content goes here */}
        </section>

        {/* Communities Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Communities</h2>
          {/* Communities section content goes here */}
        </section>
      </div>
    </div>
  );
};

export default Page;
