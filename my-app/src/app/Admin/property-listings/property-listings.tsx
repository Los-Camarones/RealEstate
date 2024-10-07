'use client';  
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';  

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //fetch list of properties on component mount if authenticated
    useEffect(() => {
        if(auth){
            fetchProperties();
        }
    }, [auth]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/client/listing/{listingId}.json', {
                withCredentials: true //ensure cookie is sent with request
            });

            setProperties(response.data.results || []);//assuming response contains in 'results'
            setLoading(false);
        } catch (error: any){
            console.error('Error fetching properties', error.response?.data || error.message);
            setError('Failed to fetch property listings.');
            setLoading(false);
        }
    };

        ///if user isn't authenticated, prevent rendering the listinigs
        if (!auth){
            return <div>Loading...</div>;
        }
        
        if(loading){
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

                {/*Property List Table*/}
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
                        {properties.map((property)=> (
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

        </div>
    </div>
    </div>
);
};

export default PropertyListingsPage;