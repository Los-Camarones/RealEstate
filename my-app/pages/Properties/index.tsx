import NavBar from "../../src/app/components/Navbar/navbar";
import "../../src/app/globals.css";

const Properties = () => {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>View More Properties</h1>
        <p> list of properties thats corruntly under mangament of Lourdez. </p>
      </div>
      </div>
    );
  }
  
  export default Properties;