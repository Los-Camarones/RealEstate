
'use client';


import link from 'next/link';
import React, {useState} from 'react';
import Popup from '../../components/Popup/Popup';


const LandingPage = () => {

    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);

    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
    
            
        

        <div className="bg-gradient-to-r from-blue-600 to-blue-300 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start">
                {/*Main Content*/}
                <div className="w-full md:w-2/3">
                {/*logo*/}
                <div className="mb-4">
                    <img src="/loanerlogo.png" alt="Ben Bhangu" className= "h-20 mx-auto md:mx-0"/>
                 </div>

                 {/*Heading and sub*/}
                 <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-2">
                    Only a few steps away from a home loan
                 </h1>
                 <p className="text-lg text-gray-500 text-center md:text-left mb-4">
                    The home loan guru is here to help
                 </p>

                 {/*customer info capture*/}
                 <div className="flex items-center justify-center md:justify-start">
                    <input 
                        type="email"
                        placeholder='Please enter your email'
                        className="border border-gray-300 rounded-1-md p-3 w-64"
                        />
                    <button className="bg-black text-white px-4 py-3 rounded-r-md">
                        Continue 
                    </button>
                 </div>

                 {/*Sign up link*/}
                 <div className="mt-4 text-center md:text-left">
                    <p className="text-gray-500">
                     Already have an account?{" "}
                        <a href="#" className="text-blue-600 font-semibold">
                            Sign in 
                        </a>
                    </p>
                 </div>
                </div>

                {/*Loan officer info*/}

                <div className="w-full md:w-1/3 mt-8 md:mt-0 flex flex-col items-center md:items-start md:ml-8">
                {/*profile name*/}
                <div className="w-28 h-28 mg-4 mt-10">
                    <img 
                        src="/benBhangu.jpg"
                        alt="Loan Officer"
                        className="rounded-full border-4 border-white shadow-md"
                        />
                </div>

                {/*Name and Info*/}
                <div className="text-center md:text-left mt-12">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Ben Bhangu
                    </h3>
                    <p className='text-gray-500'>
                        NMLS 746773 | {" "}
                        <div className="landing-page">
                            <button 
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleOpenPopup}
                                >
                                    More Info
                                </button>
                                <Popup show={ showPopup } onClose={handleClosePopup} />
                        </div>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;