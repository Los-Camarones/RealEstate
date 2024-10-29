'use client';
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';  
import ReactPaginate from "react-paginate";



interface Property {
    id: string;
    boardId: number;
    listingNumber: string;
  address: {
    internalDisplay: string,
    externalDisplay: string,
    houseNumber: string,
    streetName: string,
    unitNumber: string,
    city: string,
    state: string,
    postalCode: string
  };
  bedrooms: number;
  fullBathrooms: number;
  partialBathrooms: number;
  squareFeet: number;
  description: string;
  listingAgent: string;
  listPrice: number;
  board:{links: { href: string} [];};
 virtualTour: {links: { href: string} [];};
 propertyType: {links: { href: string} [];};
status: string;
photos: {links: { href: string} [];};
links: { href: string}[];
}

interface PropertyType {
    value: string;
    label: string;
}


const PropertyListingsPage: React.FC = () => {
    const auth = useAuth();  // Check if the user is authenticated
    const [properties, setProperties] = useState<Property[]>([]);
    const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for form visibility and new property input
    const [showForm, setShowForm] = useState(false);
    const [newProperty, setNewProperty] = useState<Property[]>([]);


    // Pagination state
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10; // Number of items to display per page
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Property | null>(null);
    const [propertyTypeDetails, setPropertyTypeDetails] = useState<PropertyType| null>(null);

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

            const response = await axios.get('/api/listings', {
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/listings', newProperty, {
                withCredentials: true
            });
            setProperties([response.data, ...properties]); // Add new property to state
            setShowForm(false); // Hide the form after submission
            setNewProperty({ id: '', address: '', price: '', bedrooms: 0, bathrooms: 0, squareFeet: 0 });
        } catch (error: any) {
            console.error('Error adding property', error.response?.data || error.message);
            setError('Failed to add property.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProperty({
            ...newProperty,
            [name]: value
        });
    };

    const fetchRequestDetails = async (id: string) => {
        try{
          setDetailsLoading(true);
          const response = await axios.get(`/api/listings/${id}`);
          setSelectedRequest(response.data);
          setDetailsLoading(false);
        } catch (error:any){
          console.error('error fetching request details:', error.response?.data || error.message );
          setError('failed to fetch request details');
          setDetailsLoading(false);
        }
      };

       // Fetch subscriber details using the new API route
 const fetchPropertyTypeDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/listings/${id}`, {
        withCredentials: true, // Ensure authentication credentials are sent with the request
      });
      setPropertyTypeDetails(response.data); // Store the subscriber data
    } catch (error: any) {
      console.error('Error fetching property type details:', error);
      setError('Failed to fetch property type details.');
    }
  };

    // If the user isn't authenticated, prevent rendering the listings
    if (!auth) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading property listings, please wait...</div>;
    }

    return (
            <div className="flex-grow">
                <NavBar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Property Listings</h1>

                    {error && <div className="text-red-500 mb-4">{error}</div>}


     
     {/* Display subscriber details if available */}
     {propertyTypeDetails && (
        <div className="mt-8 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Property Type Details</h2>
            <p>Value: {propertyTypeDetails.value}</p>
            <p>Label: {propertyTypeDetails.label}</p>
        </div>
        )}


                    {/* Table of Property Listings */}
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                            <th className="px-4 py-2">Listing Number</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Bedrooms</th>
                                <th className="px-4 py-2">Full Bathrooms</th>
                                <th className="px-4 py-2">Partial Bathrooms</th>
                                <th className="px-4 py-2">Square Feet</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">List Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {displayedProperties.map((property, index) => (
                                <tr key={`${property.id}-${index}`} className="border-t">
                                    <td className="px-4 py-2">{property.listingNumber}</td>
                                    <td className="px-4 py-2">
                                        {`${property.address.houseNumber} ${property.address.streetName} ${
                    property.address.unitNumber ? `#${property.address.unitNumber}` : ""}, ${property.address.city}, ${property.address.state} ${property.address.postalCode}`} </td>
                                    <td className="px-4 py-2">{property.bedrooms}</td>
                                    <td className="px-4 py-2">{property.fullBathrooms}</td>
                                    <td className="px-4 py-2">{property.partialBathrooms}</td>
                                    <td className="px-4 py-2">{property.squareFeet}</td>
                                    <td className="px-4 py-2">{property.description}</td>
                                    <td className="px-4 py-2">{property.listPrice}</td>
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
    );
};

export default PropertyListingsPage;
