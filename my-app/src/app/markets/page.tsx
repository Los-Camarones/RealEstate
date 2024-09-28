'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const MarketsPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to add the IDX Markets widget script
        const addScript = () => {
            if (pageRef.current && !pageRef.current.querySelector('script')) {
                const script = document.createElement('script');
                script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
                pageRef.current.appendChild(script);
            }
        };

        // Add the script as soon as the component is mounted
        addScript();

        // Cleanup function to remove the script on component unmount
        return () => {
            if (pageRef.current) {
                pageRef.current.innerHTML = ''; // Clear all children including the script
            }
        };
    }, []);

    return (
        <>
            <Head>
                {/* SEO Meta Tags */}
                <title>Explore Communities</title>
                <meta
                    name="description"
                    content="Explore detailed real estate market information and trends. Get insights on various communities, including property values, market conditions, and more."
                />
            </Head>
            <NavBar />
            {/* IDX Markets Widget filling the entire page */}
            <div ref={pageRef} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <h1 className="text-4xl font-bold mb-8">Discover Communities</h1>
                <p className="text-lg mb-4">
                    Explore various real estate communities and find your perfect neighborhood. Get comprehensive information on community amenities, housing options, and local market trends to make informed decisions. Whether you're looking for a family-friendly area, a vibrant downtown, or a quiet suburban community, our tool helps you discover the best places to live.
                </p>
                <p className="text-lg mb-4">
                    Use the widget below to search for properties and learn more about different communities based on your preferences.
                </p>
                <footer className="mt-16 text-center text-sm relative z-10 text-white">
                    <p>© 2024 Lourdes Mendoza. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default MarketsPage;

