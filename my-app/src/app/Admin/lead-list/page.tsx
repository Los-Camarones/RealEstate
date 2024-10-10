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
    const[displayedLeads, setDisplayedLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newLead, setNewLead] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
    });
    const [name, setName] = useState<string>('');
    const [offset, setCurrentOffset] = useState(0);
    const [totalLeads, setTotalLeads] = useState(0);
    const itemsPerPage = 10;



    // Fetch the list of subscribers on component mount if authenticated
    useEffect(() => {
        if (auth) {
            fetchLeads();
        }
    }, [auth]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            setError(null);

            //harcoded limit at 500. If limit exceeds, better to implement pagination of subscriber leads, though, filtering will be not exist anymore
            const response = await axios.get(`/api/leads?&limit=500`, {
                withCredentials: true  // This ensures the cookie is sent with the request
            });

            setLeads(response.data.results || []);  // Assuming the response contains leads in 'results'
            setTotalLeads(response.data.total || 0);
            setDisplayedLeads(response.data.results.slice(offset, offset + itemsPerPage)); // Set displayed leads
            setLoading(false);

        } catch (error: any) {
            console.error('Error fetching leads', error.response?.data || error.message);
            setError('Failed to fetch leads.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Update displayed leads when leads or offset changes
        const end = offset + itemsPerPage;
        setDisplayedLeads(leads.slice(offset, end));
    }, [leads, offset]);


    const handleAddNewLead = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);
            const response = await axios.post('/api/leads', newLead, {
                withCredentials: true
            });

            if (response.status === 201) {
                fetchLeads();  // Refresh leads after adding
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
            console.log('before calling api');
            await axios.delete(`/api/leads/${id}`, {  // Pass the ID in the URL path, not as a query parameter
                withCredentials: true
            });
            console.log('after calling api');
            fetchLeads();  // Refresh leads after deletion
        } catch (error: any) {
            console.error('Error deleting lead', error.response?.data || error.message);
            setError('Failed to delete the lead.');
        }
    };

    /**
     * Filtering will only be by name of the subscriber
     * @param name 
     */
    const handleFilteringLeads = async (name: string) => {
        try {
            if (name) {

                // Filter records that match either firstName or lastName
                const filteredLeads = leads.filter((record: Lead) => 
                record.firstName.toLowerCase().includes(name.toLowerCase()) ||
                record.lastName.toLowerCase().includes(name.toLowerCase())
              );

                // Update the leads state with the filtered results
                setDisplayedLeads(filteredLeads);
                //setTotalLeads(filteredLeads.length);
                }
            

        } catch (error: any) {
            console.error('Error filtering leads', error.response?.data || error.message);
            setError('Failed to filter leads');
        }

    }

    // If the user isn't authenticated, prevent rendering the leads
    if (!auth) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading leads, please wait...</div>;
    }
    const totalPages = Math.ceil(totalLeads / 10); 


    const handlePageClick = (data: {selected: number}) => {
        
        const newOffset = (data.selected)*10;
        setCurrentOffset(newOffset);
    }

    const handleFilterClick = (event: React.FormEvent) => {
        event.preventDefault();
        if(name === '') {
            fetchLeads();
        } else {
            handleFilteringLeads(name);

        }
      };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };


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

                    <form onSubmit={handleFilterClick}>
                            <input
                              type="text"
                              value={name}
                              onChange={handleNameChange}
                              placeholder="Enter first or last name"
                            />
                            <button type="submit">Filter Leads</button>
                          </form>
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
                            {displayedLeads.map((lead) => (
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
    forcePage={offset / 10}
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
