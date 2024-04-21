import React from 'react';
import NavBar from '../../src/app/components/Navbar/navbar';
function WhatMyHomeWorth() {
    return (
        <div>
            <NavBar />
            <h1>What's My Home Worth</h1>
            <p>
                List for nearby houses in the same region of the location.
                ask the user for their address.
                give an estimate house price for user's house, if the user enters their house address.
            </p>
        </div>
    );
}

export default WhatMyHomeWorth;
