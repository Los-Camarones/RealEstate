import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
const Listing= () => {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>Home Listing</h1>
        <p>more detail with metrolist API. </p>
        <p>and google API ( maybe :v ) </p>

      </div>
      </div>
    );
  }
  
  export default Listing;