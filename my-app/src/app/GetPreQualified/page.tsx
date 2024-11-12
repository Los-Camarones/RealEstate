"use client";

import React, { useEffect, useState } from "react";
import "../globals.css";
import "./page.css";
import Link from 'next/link';
import NavBar from "../../components/Navbar/navbar";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ContactInfo {
    phone: string;
    email: string;
}

const ProfileCard: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-8 bg-white  rounded-md">
            {/* Logo at the top */}
            <div className="w-full flex justify-center mb-10">
                <img
                    src="/logo_.png" 
                    alt="Lourdes Mendoza Real Estate Services"
                    className="w-auto h-24" // Adjust the height as needed to make the logo large
                />
            </div>

            {/* Phrase at the bottom */}
            <div className="mt-auto text-center">
                <h2 className="text-2xl font-bold font-serif text-blue-900 leading-tight">
                    I'm ready to talk to a lender...
                </h2>
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
            style={{ backgroundImage: "url(/getPreQualified.jpg)", backgroundSize: 'cover', minHeight: '100vh' }}
            className="flex flex-col items-center">
            <header className="w-full flex justify-center py-5">
                <NavBar />
            </header>

            <div className="flex-grow flex items-center justify-center p-10 bg-white rounded-lg max-h-[60vh] mt-20">
                <div className="text-center">
                    <div className="flex justify-center font-serif text-base mt-10">
                        <ProfileCard />
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
