"use client";

import React, { useEffect, useState } from "react";
import "../globals.css";
import "./page.css"; // Importing the new CSS file for specific styling
import Link from 'next/link';
import NavBar from "../../components/Navbar/navbar";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ContactInfo {
    phone: string;
    email: string;
}

// Profile card component
interface ProfileCardProps {
    name: string;
    role: string;
    nmlsNumber: string;
    branch: string;
    phone: string;
    email: string;
    language: string;
    location: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    role,
    nmlsNumber,
    branch,
    phone,
    email,
    language,
    location,
}) => {
    return (
        <div className="flex items-start justify-between p-8 bg-blue shadow-md rounded-md">
            {/* Profile image */}
            <div className="w-1/4">
                <img
                    src="/lourdes.jpg"
                    alt={name}
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col p-8 bg-white shadow-md rounded-md">
                <h2 className="text-4xl font-bold font-serif text-blue-600 leading-tight">{name}</h2>
                <p className="text-lg font-medium text-gray-500 mt-0">{role} | DRE#{nmlsNumber}</p>

                {/* Divider Line */}
                <div className="border-t border-gray-300 my-4"></div>

                {/* Information section */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                    <div>
                        <p className="font-semibold text-lg text-black">Branch:</p>
                        <p className="text-md text-black">{branch}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-lg text-black">Phone:</p>
                        <p className="text-md text-black">{phone}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-lg text-black">Language:</p>
                        <p className="text-md text-black">{language}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-lg text-black">Email:</p>
                        <p className="text-md text-black">{email}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-lg text-black">Location:</p>
                        <p className="text-md text-black">{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Call-to-action button
const CTAButton = () => {
    return (
        <div className="mt-4">
            <Link href="/homeloaner">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full">
                    Apply Now
                </button>
            </Link>
        </div>
    );
};

// Main landing page component
const LandingPage = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactInfo = async () => {
            const { data, error } = await supabase
                .from("contact_info")
                .select("phone, email")
                .single();

            if (error) {
                console.error("Error fetching contact info:", error.message);
            } else {
                setContactInfo(data as ContactInfo);
            }

            setLoading(false);
        };

        fetchContactInfo();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div 
            style={{ backgroundImage: "url(/getprequalified_2.jpg)", backgroundSize: 'cover', minHeight: '100vh' }}
            className="flex flex-col items-center">
            {/* NavBar at the top, centered */}
            <header className="w-full flex justify-center py-5">
                <NavBar />
            </header>

            {/* Main content centered with padding and reduced height */}
            <div className="flex-grow flex items-center justify-center p-10 bg-white bg-opacity-50 rounded-lg max-h-[60vh] mt-20">
                <div className="text-center">
                    <div className="flex justify-center font-serif text-base mt-10">
                        <ProfileCard 
                            name="Lourdes Mendoza"
                            role="Realtor"
                            nmlsNumber="01527343"
                            branch="Sacramento"
                            phone={contactInfo?.phone || "Loading..."}
                            email={contactInfo?.email || "Loading..."}
                            language="English and Spanish"
                            location="California"
                        />
                    </div>
                    <div className="flex justify-center mt-0">
                        <CTAButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
