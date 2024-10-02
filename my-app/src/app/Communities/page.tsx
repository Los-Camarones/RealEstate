import React from "react";
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import Footer from "../../components/Footer/footer";



const Communities  = () => {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
      <h1>Communities </h1>
      <p> listing for different houses in differnt area.  </p>
    </div>
    <ContactMe></ContactMe>
    <Footer></Footer>
    </div>
    
  );
}

export default Communities;