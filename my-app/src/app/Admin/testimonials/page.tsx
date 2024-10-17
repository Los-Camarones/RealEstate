"use client";
import React, { useState } from "react";
import "../../globals.css";
import Reviews from "@/components/Testimonials/AdminTestimonials/AdminReviews";
import NavBar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Admin/Sidebar";
import { ITestimonial } from "@/types/database_interface";

const page = () => {


  return (
    <div className="flex-grow">
      <NavBar />
      <div className="flex">
        <Sidebar></Sidebar>
        <Reviews></Reviews>
      </div>
    </div>
  );
};

export default page;
