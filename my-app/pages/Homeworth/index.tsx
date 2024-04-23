import NavBar from "../../src/app/components/Navbar/navbar";
import "../../src/app/globals.css";

const Homeworth = () => {
    return (
        <div>
            <NavBar />
            <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
           <h1>
            user will be able to input home address and get an estimate value.
           </h1>

            <p> - check matrislist api for house estamation . </p>
            <p> - input box for address , and a loading page for proccessing the item . </p> 
            <p> - more ..  </p>
           
        </div>
        </div>
    );
}
 
export default Homeworth;
