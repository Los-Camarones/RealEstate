import NavBar from "../../src/app/components/Navbar/navbar";
import React from "react";
import "../../src/app/globals.css";

const Aboutme = () => {
  return (
    <main className="container mx-auto px-4">
      <header>
        <NavBar />
      </header>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center bg-gray-50">{/* flex flex col for mobile devices to stack columns. md for medium screens to place stuff by row */}
        <div className="md:mr-20 md:mt-40">
          <h1 className="text-4xl text-[#299FDD] font-bold">
            Lourdes Mendoza
          </h1>
          <p className="text-2xl">
            Local Sacramento Realtor
          </p>
        </div>
        <img
          className="object-contain w-full md:max-w-md md:mt-20"
          src="/lourdes-removebg-preview.png"
          alt="Transparent background image"
        />
      </div>
    </main>
  );
};

export default Aboutme;
