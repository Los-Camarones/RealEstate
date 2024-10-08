'use client';  
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';  // Ensure user is authenticated
import ReactPaginate from 'react-paginate';

const LeadListPage: React.FC = () => {
    const auth = useAuth();  // Check if the user is authenticated

    interface Lead {
        id: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        phone?: string;
        pipelineStage?: string;
    }

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newLead, setNewLead] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setCurrentOffset] = useState(0);
    const [totalLeads, setTotalLeads] = useState(0);


    // Fetch the list of subscribers on component mount if authenticated
    useEffect(() => {
        if (auth) {
            fetchLeads(offset);
        }
    }, [auth, offset]);

    const fetchLeads = async (offset: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`/api/leads?offset=${offset}`, {
                withCredentials: true  // This ensures the cookie is sent with the request
            });

            setLeads(response.data.results || []);  // Assuming the response contains leads in 'results'
            setTotalLeads(response.data.total || 0);
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching leads', error.response?.data || error.message);
            setError('Failed to fetch leads.');
            setLoading(false);
        }
    };


    const handleAddNewLead = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);
            const response = await axios.post('/api/leads', newLead, {
                withCredentials: true
            });

            if (response.status === 201) {
                fetchLeads(offset);  // Refresh leads after adding
                setShowForm(false);
            }
        } catch (error: any) {
            console.error('Error creating lead', error.response?.data || error.message);
            setError('Failed to create a new lead.');
        }
    };

    const handleDeleteLead = async (id: string) => {
        try {
            setError(null);
            await axios.delete(`/api/leads/${id}`, {  // Pass the ID in the URL path, not as a query parameter
                withCredentials: true
            });
            fetchLeads(offset);  // Refresh leads after deletion
        } catch (error: any) {
            console.error('Error deleting lead', error.response?.data || error.message);
            setError('Failed to delete the lead.');
        }
    };

    // If the user isn't authenticated, prevent rendering the leads
    if (!auth) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading leads, please wait...</div>;
    }
    const totalPages = Math.ceil(totalLeads / 10); 


    const handlePageClick = (data: {selected: number}) => {
        const selectedPage = data.selected + 1; //zero index so add one
        console.log('current page', selectedPage);
        setCurrentPage(selectedPage);
        const currentOffset = (selectedPage-1)*10;
        console.log('current offset', currentOffset);
        setCurrentOffset(currentOffset);
        fetchLeads(currentOffset);
    }



    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <NavBar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Lead List</h1>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    {/* Add New Lead Button */}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowForm(!showForm)}
                        disabled={loading}  // Disable while loading
                    >
                        Add New
                    </button>

                    {/* Add New Lead Form */}
                    {showForm && (
                        <form onSubmit={handleAddNewLead} className="mt-4 bg-gray-200 p-4 rounded">
                            <div className="mb-2">
                                <label className="block text-gray-700">First Name:</label>
                                <input
                                    type="text"
                                    value={newLead.firstName}
                                    onChange={(e) => setNewLead({ ...newLead, firstName: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700">Last Name:</label>
                                <input
                                    type="text"
                                    value={newLead.lastName}
                                    onChange={(e) => setNewLead({ ...newLead, lastName: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700">Email Address:</label>
                                <input
                                    type="email"
                                    value={newLead.emailAddress}
                                    onChange={(e) => setNewLead({ ...newLead, emailAddress: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                    required
                                />
                            </div>

                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                        </form>
                    )}

                    {/* Lead List Table */}
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} className="border-t">
                                    <td className="px-4 py-2">{`${lead.firstName} ${lead.lastName}`}</td>
                                    <td className="px-4 py-2">{lead.emailAddress}</td>
                                    <td className="px-4 py-2">{lead.phone || 'N/A'}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDeleteLead(lead.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
  <ReactPaginate
    previousLabel={'Previous'}
    nextLabel={'Next'}
    breakLabel={'...'}
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

export default LeadListPage;
