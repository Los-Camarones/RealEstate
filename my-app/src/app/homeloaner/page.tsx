'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';

const LandingPage = () => {
    const router = useRouter();

    // State for user choices and form fields
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Handle selection of option
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for form submission or further actions
        console.log({ name, address, phone, email, selectedOption });
        // Redirect or perform other actions as needed
    };

    return (
        <div>
            <NavBar />
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-300 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col items-center">
                
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
                        <p className="text-lg font-semibold mb-4">What best describes your current situation?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => handleOptionSelect("Buying a new home")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                            >
                                I'm thinking about buying
                            </button>
                            <button 
                                onClick={() => handleOptionSelect("Refinancing an existing home")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                            >
                                Touring open houses
                            </button>
                            <button 
                                onClick={() => handleOptionSelect("Looking to invest")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                            >
                                Making offers on a property
                            </button>
                            <button 
                                onClick={() => handleOptionSelect("Exploring options")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
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
                                className="w-full p-3 border rounded-md"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Address"
                                className="w-full p-3 border rounded-md"
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="Phone"
                                className="w-full p-3 border rounded-md"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md mt-6">
                            Submit
                        </button>
                    </form>
                )}

                {/* Sign in Button */}
                <div className="mt-4">
                    <button
                        onClick={() => router.push('/SignIn')}
                        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md mt-4"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LandingPage;
