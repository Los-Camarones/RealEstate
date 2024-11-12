import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
import ContactMe from "../../components/ContactMe/ContactMe";
import Footer from "../../components/Footer/footer";
const Listing= () => {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>Home Listing</h1>
        <p>more detail with metrolist API. </p>
        <p>and google API ( maybe :v ) </p>

      </div>

      <div>
        <ContactMe></ContactMe>
      </div>
      <div>
        <Footer></Footer>
      </div>
      </div>
      
       

    );
  }
  
  export default Listing;