'use client';

import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'; 
import ReactPaginate from "react-paginate";

interface Listing {
  id: number;
  title: string;
  price: string;
  address: string;
  description: string;
}

const PropertyDetails: React.FC = () => {
    const auth = useAuth();  // Check if the user is authenticated
    const [properties, setProperties] = useState<Listing[]>([]);  // Renamed from 'listings' to 'properties'
    const [displayedProperties, setDisplayedProperties] = useState<Listing[]>([]);  // Properties to be displayed on current page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10; // Number of items to display per page

    // Fetch list of properties on component mount if authenticated
    useEffect(() => {
        if (auth) {
            fetchProperties();
        }
    }, [auth]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/client/listing/{listingId}.json', {
                withCredentials: true // ensure cookie is sent with request
            });

            const fetchedProperties = response.data.results || []; // Assuming response contains properties in 'results'
            setProperties(fetchedProperties);

            // Set the total pages based on the number of properties
            setTotalPages(Math.ceil(fetchedProperties.length / itemsPerPage));

            // Set properties to display for the current page
            setDisplayedProperties(fetchedProperties.slice(offset, offset + itemsPerPage));
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching properties', error.response?.data || error.message);
            setError('Failed to fetch property listings.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Update displayed properties when offset or properties are changed
        setDisplayedProperties(properties.slice(offset, offset + itemsPerPage));
    }, [offset, properties]);

    const handlePageClick = (data: { selected: number }) => {
        const newOffset = data.selected * itemsPerPage;
        setOffset(newOffset);
    };

    // If the user isn't authenticated, prevent rendering the listings
    if (!auth) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading property listings, please wait...</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <NavBar/>
                <h1>Property Details</h1>
                <div className="listings-container">
                    {displayedProperties.length === 0 ? (  // Use 'displayedProperties' instead of 'listings'
                        <p>No listings available.</p>
                    ) : (
                        displayedProperties.map((listing) => (  // Use 'displayedProperties' here
                            <div key={listing.id} className="listing-item">
                                <h2>{listing.title}</h2>
                                <p>Price: {listing.price}</p>
                                <p>Address: {listing.address}</p>
                                <p>{listing.description}</p>
                            </div>
                        ))
                    )}

                    {/* Pagination component */}
                    <div className="flex justify-center mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName="flex space-x-2"
                            pageClassName="rounded-full bg-gray-200 px-3 py-1"
                            pageLinkClassName="text-gray-700 hover:text-blue-600"
                            previousClassName="rounded-full bg-blue-500 text-white px-3 py-1"
                            nextClassName="rounded-full bg-blue-500 text-white px-3 py-1"
                            breakClassName="text-gray-500 px-3 py-1"
                            activeClassName="bg-blue-500 text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;

