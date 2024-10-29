"use client";
import React, { useState } from "react";
import "../../globals.css";
import AdminReviews from "@/components/Testimonials/AdminTestimonials/AdminReviews";
import NavBar from "@/components/Navbar/navbar";
import { ITestimonial } from "@/types/database_interface";

const page = () => {


  return (
    <div className="flex-grow">
      <NavBar />
        <AdminReviews></AdminReviews>
      </div>
  );
};

export default page;
