
import React from 'react';
import NavBar from '../../components/Navbar/navbar';
import "../globals.css";
import ConactMe from "../../components/ContactMe/ContactMe";
import Footer from '../../components/Footer/footer';

function WhatMyHomeWorth() {
    return (
        <div>
            <NavBar />
            <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
            <h1>What's My Home Worth</h1>
            <p>
                List for nearby houses in the same region of the location.
                ask the user for their address.
                give an estimate house price for user's house, if the user enters their house address.
            </p>
        </div>
        <div>
            <ConactMe></ConactMe>
        </div>
        <div>
            <Footer></Footer>
        </div>
        </div>
    );
}

export default WhatMyHomeWorth;
