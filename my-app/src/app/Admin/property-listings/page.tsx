'use client';
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';  
import ReactPaginate from "react-paginate";

interface Property {
    id: string;
    address: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
}

const PropertyListingsPage: React.FC = () => {
    const auth = useAuth();  // Check if the user is authenticated
    const [properties, setProperties] = useState<Property[]>([]);
    const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
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

            const response = await axios.get('/api/client/listings.json', {
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
                <NavBar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Property Listings</h1>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    {/* Table of Property Listings */}
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Bedrooms</th>
                                <th className="px-4 py-2">Bathrooms</th>
                                <th className="px-4 py-2">Square Feet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProperties.map((property) => (
                                <tr key={property.id} className="border-t">
                                    <td className="px-4 py-2">{property.address}</td>
                                    <td className="px-4 py-2">{property.price}</td>
                                    <td className="px-4 py-2">{property.bedrooms}</td>
                                    <td className="px-4 py-2">{property.bathrooms}</td>
                                    <td className="px-4 py-2">{property.squareFeet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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

export default PropertyListingsPage;
