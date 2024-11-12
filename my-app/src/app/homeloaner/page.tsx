'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';
import PropertyOrganizerLogin from '../../components/PropertyOrganizerLogin/PropertyOrganizerLogin';
import Modal from '../../components/PropertyOrganizerLogin/Modal';

const LandingPage = () => {
    const router = useRouter();

    // State for user choices and form fields
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const buttonStyle = "ml-2 bg-transparent border border-black text-black font-bold py-1 px-2 rounded mt-2";
    const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
    const [isWidgetDisplayed, setIsWidgetDisplayed] = useState(false);

    const toggleSignInPopup = () => {
        setIsSignInPopupOpen(!isSignInPopupOpen);
    };

    const closeSignInPopupAndShowWidget = () => {
        setIsSignInPopupOpen(false);
        setIsWidgetDisplayed(true);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailBody = `Hi lourdes! I'm sending an email in hopes that you could help me find a home loaner based on my needs.
        Name: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nSelected Option: ${selectedOption}`;
        const mailtolink = `mailto:lourdesmendoza1@yahoo.com?subject=New%20User%20Submission&body=${encodeURIComponent(emailBody)}`;
        
        window.location.href = mailtolink;
    };

    return (
        <div
            style={{
                backgroundImage: "url('/bckg.jpg')", // Replace with the path to your image
                backgroundSize: 'cover', // Ensures the image covers the entire page
                backgroundPosition: 'center', // Centers the image
                backgroundRepeat: 'no-repeat', // Prevents the image from repeating
                minHeight: '100vh' // Full height for the page
            }}
        >
            <NavBar />

            <div className="bg-gradient-to-r from-white-600 to-blue-300 min-h-screen flex items-center justify-center">
                <div className="bg-white bg-opacity-45 p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col items-center">
                    
                    {/* Logo */}
                    <div className="mb-4">
                        <img src="/loanerlogo.png" alt="Ben Bhangu" className="h-20 mx-auto" />
                    </div>

                    {/* Heading and Subheading */}
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                        Only a few steps away from a home loan
                    </h1>

                    {/* Question and Options */}
                    {!selectedOption ? (
                        <div className="text-center">
                            <p className="text-lg font-semibold mb-4 text-center">What best describes your current situation?</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => handleOptionSelect("Buying a new home")}
                                    className={buttonStyle}
                                >
                                    I'm thinking about buying
                                </button>
                                <button 
                                    onClick={() => handleOptionSelect("Refinancing an existing home")}
                                    className={buttonStyle}
                                >
                                    Touring open houses
                                </button>
                                <button 
                                    onClick={() => handleOptionSelect("Looking to invest")}
                                    className={buttonStyle}
                                >
                                    Making offers on a property
                                </button>
                                <button 
                                    onClick={() => handleOptionSelect("Exploring options")}
                                    className={buttonStyle}
                                >
                                    I've signed a purchase contract 
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Form for additional details
                        <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
                            <p className="text-lg font-semibold text-center mb-4">Please enter your details</p>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Name"
                                    className="w-full p-3 border rounded-md font-bold"
                                />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    placeholder="Address"
                                    className="w-full p-3 border rounded-md font-bold"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    placeholder="Phone"
                                    className="w-full p-3 border rounded-md font-bold"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-md font-bold"
                                />
                            </div>
                            <button type="submit" className={"w-full bg-transparent border border-black font-bold text-black py-3 rounded-md mt-8 "}>
                            
                                Submit
                            </button>
                        </form>
                    )}

                    <button
                        className={buttonStyle}
                        onClick={toggleSignInPopup}
                    >
                        Sign In 
                    </button>

                    <Modal isOpen={isSignInPopupOpen} onClose={toggleSignInPopup}>
                        <PropertyOrganizerLogin />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

