'use client';
import '../../globals.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import useAuth from '../../hooks/useAuth';  

interface ContactRequest {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
}

const AdminContactRequests: React.FC = () => {
    const auth = useAuth();
    const [contactRequest, setContactRequests] = useState<ContactRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if(auth){
            fetchContactRequests();
        }
    }, [auth]);

    const fetchContactRequests = async () => {
        try {
            setLoading(true);
            setError(null);

            //fetch contact requests from API 
            const response = await axios.get('/client/contactRequests.json', {
                withCredentials: true
            
            });

            setContactRequests(response.data.results || []);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching contact requests:', err.response?.data || err.message);
            setError('Failed to fetch contact requests. ');
            setLoading(false);
        }
    };

    if (!auth || loading) {
        return <div>Loading contact requests...</div>
    }

    

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-grow'>
                <NavBar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Contact Requests</h1>

                    {contactRequest.length === 0 ? (
                        <div>No contact requests found.</div>
                    ) : (
                        <table className='min-w-full table-auto mt-4'>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Message</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactRequest.map((request) => (
                                    <tr key={request.id} className="border-t">
                                        <td className='px-4 py-2'>{request.name}</td>
                                        <td className='px-4 py-2'>{request.email}</td>
                                        <td className='px-4 py-2'>{request.message}</td>
                                        <td className='px-4 py-2'>{new Date(request.date).toLocaleDateString()}</td>
                                    </tr>
                               ) )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminContactRequests;








