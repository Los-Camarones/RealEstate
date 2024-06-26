import NavBar from "../../src/app/components/Navbar/navbar";
import React from "react";
import "../../src/app/globals.css";


const Aboutme = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex h-screen w-screen bg-gray-100">
        <div >
          <h1 className="text-8xl text-light-blue font-bold mb-29">
            Hello, I'm Lourdes Mendoza

          </h1>
          <p className="text-transparent text-7xl font-bold pt-50">Local Sacramento Realtor</p>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <img
            className="object-cover h-full w-full opacity-20"
            src="https://www.stickpng.com/"
            alt="Transparent background image"
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutme;

