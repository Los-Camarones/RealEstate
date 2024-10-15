'use client';

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import '.../../globals.css';
import useAuth from '../../hooks/useAuth'; 


interface ValuationRequest {
    id: string;
    propertyAddress: string;
    requestedBy: string;
    valuationAmount: string;
    requestDate: string;
}

const ValuationRequestsPage: React.FC = () => {
    const auth = useAuth();
    const [valuationRequests, setValuationRequests] = useState<ValuationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        if(auth){
            fetchValuationRequests();
        }
    }, [auth]);

    const fetchValuationRequests = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('https://www.idxhome.com/api/v1/client/valuationRequests.json', {
                withCredentials: true
                
            });

            setValuationRequests(response.data.results || []);
            setLoading(false);


        } catch (err:any) {
            console.error('Error fetching valuation requests:', err.response?.data || err.message);
            setError('Failed to fetch valuation requests');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading valuation requests...</div>
    }

    if(error){
        return <div>Error: {error}</div>
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <NavBar />
                <div className="p-4">
                    <h1 className='text-2xl font-bold mb-4'>Valuation Requests</h1>

                    {valuationRequests.length === 0 ? (
                        <div>No valuation requests found.</div>
                    ) : (
                        <table className='min-w-full table-auto mt-4'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='px-4 py-2'>Property address</th>
                                    <th className='px-4 py-2'>Requested by</th>
                                    <th className='px-4 py-2'>Valuation Amount</th>
                                    <th className='px=4 py-2'>Request Date</th>
                                        
                                </tr>
                            </thead>
                            <tbody>
                                {valuationRequests.map((request) => (
                                    <tr key={request.id} className='border-t'>

                                    
                                    <td className='px-4 py-2'>{request.propertyAddress}</td>
                                    <td className='px-4 py-2'>{request.requestedBy}</td>
                                    <td className='px-4 py-2'>{request.valuationAmount}</td>
                                    <td className='px-4 py-2'>{new Date(request.requestDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                    )}
                </div>
            </div>
        </div>
    );

 };

 export default ValuationRequestsPage;


