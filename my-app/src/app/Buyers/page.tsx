import React from "react"
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import Footer from "../../components/Footer/footer";
import GetPreApproved from "../../components/getPreApproved/GetPreApproved";
const Buyers = () => {
    return (
     
      <div>
        <NavBar /> 
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>Show houses that are trending on market.</h1>
        
        <p> detail from metralist plzzz give me the API detailllllllahhhhhh
        </p>
      </div>
      
        <GetPreApproved></GetPreApproved>
      
      <div>
        <ContactMe></ContactMe>
      </div>
      <div>
        <Footer></Footer>
      </div>

      </div>
      
    );
  }
  
  export default Buyers;