import NavBar from "../../components/Navbar/navbar";
import "../globals.css";
const Sellers = () => {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>List for nearby houses in the same region of the location.</h1>
        <p> ask the user for their address. </p>
        <p> give an estimate house price for user's house , if the user enter they houes address . </p>
       

      </div>
      </div>
    );
}

export default Sellers;