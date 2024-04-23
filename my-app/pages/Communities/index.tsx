import React from "react";
import NavBar from "../../src/app/components/Navbar/navbar";
import "../../src/app/globals.css";


const Communities  = () => {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
      <h1>Communities </h1>
      <p> listing for different houses in differnt area.  </p>
    </div>
    </div>
  );
}

export default Communities;