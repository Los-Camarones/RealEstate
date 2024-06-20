import NavBar from "../../src/app/components/Navbar/navbar";
import React from "react";
import "../../src/app/globals.css";

const Aboutme = () => {
  return (
    <div>
      <NavBar />
      <div > {/* Inline style for testing purposes */}
        <p className="text-blue-600">hello world</p>
      </div>
    </div>
  );
};

export default Aboutme;
