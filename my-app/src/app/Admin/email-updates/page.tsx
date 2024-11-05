'use client';
import '../../globals.css';
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ReactPaginate from 'react-paginate';

interface EmailSignupRequest {
    id?: string;
    subscriberId: string;
    createdOn: string;
    subscriber: {
        links: { href: string} [];
  
      };
    emailSignupRequest: {
        links: { href: string}[];
    };
    links: { href: string}[];
}

interface Subscriber {
    id: string;
    firstName: string;
    lastName: string 
    emailAddress: string;
    phone: string;
    score: number;
    createdOn: string;
  }


const EmailSignupRequestsPage: React.FC = () => {
    const auth = useAuth();  // Check if the user is authenticated
    const [requests, setRequests] = useState<EmailSignupRequest[]>([]);
    const [displayedRequests, setDisplayedRequests] = useState<EmailSignupRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [subscriberDetails, setSubscriberDetails] = useState<Subscriber | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<EmailSignupRequest | null>(null);

    // Pagination state
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10; // Number of items to display per page

    // Fetch list of email sign-up requests on component mount if authenticated
    useEffect(() => {
        if (auth) {
            fetchEmailSignupRequests(offset);
        }
    }, [auth]);

    const fetchEmailSignupRequests = async (offset: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/api/email', {
                withCredentials: true // Ensure the cookie is sent with the request
            });

            const fetchedRequests = response.data.results || []; // Assuming response contains requests in 'results'
            setRequests(fetchedRequests);

            // Set the total pages based on the number of requests
            setTotalPages(Math.ceil(fetchedRequests.length / itemsPerPage));

            // Set requests to display for the current page
            setDisplayedRequests(fetchedRequests.slice(offset, offset + itemsPerPage));
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching email signup requests', error.response?.data || error.message);
            setError('Failed to fetch email update signup requests.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Update displayed requests when offset or requests are changed
        setDisplayedRequests(requests.slice(offset, offset + itemsPerPage));
    }, [offset, requests]);

    const handlePageClick = (data: { selected: number }) => {
        const newOffset = data.selected * itemsPerPage;
        setOffset(newOffset);
    };

   // Open the modal when "Add New" is clicked
   const handleAddNew = () => {
    setIsModalOpen(true);
};

// Handle modal close
const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewEmail('');
};

{/*
// Handle form submission
const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const newRequest = { id: newId
            dateCreated: new Date().toISOString() };
        // You would typically send a request to the server here
        await axios.post('/api/email', newRequest, { withCredentials: true });

        // Add the new request locally for immediate feedback
        setRequests([newRequest, ...requests]);
        handleCloseModal(); // Close the modal after submissionType '{ email: string; firstName: string; lastName: string; phone: string; dateCreated: string; }' is missing the following properties from type 'EmailSignupRequest': id, subscriberId, 
    } catch (error: any) {
        console.error("Error adding new email sign-up request:", error);
        setError("Failed to add email sign-up request.");
    }
}; */}

const fetchRequestDetails = async (id: string) => {
    try{
      setDetailsLoading(true);
      const response = await axios.get(`/api/email/${id}`);
      setSelectedRequest(response.data);
      setDetailsLoading(false);
    } catch (error:any){
      console.error('error fetching request details:', error.response?.data || error.message );
      setError('failed to fetch request details');
      setDetailsLoading(false);
    }
  };

     // Fetch subscriber details using the new API route
 const fetchSubscriberDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/leads/${id}`, {
        withCredentials: true, // Ensure authentication credentials are sent with the request
      });
      setSubscriberDetails(response.data); // Store the subscriber data
    } catch (error: any) {
      console.error('Error fetching subscriber details:', error);
      setError('Failed to fetch subscriber details.');
    }
  };

    // If the user isn't authenticated, prevent rendering the listings
    if (!auth) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading email update sign-up requests, please wait...</div>;
    }

    return (
        <div className="flex">

            <div className="flex-grow">
                <NavBar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Email Update Sign-up Requests</h1>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                     {/* valuation requests */}
        <div>
          {displayedRequests.map((request) => (
            <div key={request.links[0].href} className="mb-4 p-4 border rounded">
              <p>Email Sign-up Request ID: {request.links[0].href.split('/').pop()?.split('.')[0]}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => fetchRequestDetails(request.links[0].href.split('/').pop()?.split('.')[0] || '')}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

                 
                     {/* Details for selected request */}
                     {detailsLoading && <div>Loading details...</div>}

{selectedRequest && !detailsLoading && (
 <div className="mt-8 p-4 border rounded bg-gray-100">
 <h2 className="text-xl font-bold mb-4">Email Update Sign-up Request Details</h2>
 <p>Request ID: {selectedRequest.id}</p>
 <p>Subscriber ID: {selectedRequest.subscriberId}</p>
<p>Created On: {new Date(selectedRequest.createdOn).toLocaleString()}</p>

<h3 className="text-lg font-bold mt-4">Subscriber</h3>
{selectedRequest.subscriberId && (
<button
className="text-blue-500 underline"
onClick={() => fetchSubscriberDetails(selectedRequest.subscriberId)}
>
View Subscriber Details
</button>
)}

<h3 className="text-lg font-bold mt-4">Email Update Sign-up Request Report</h3>
{selectedRequest.emailSignupRequest?.links?.[0]?.href && (
<p>
<a href={selectedRequest.emailSignupRequest.links[0].href}>
View Email Update Sign-up Request Details
</a>
</p>
)}
     {/* Display subscriber details if available */}
     {subscriberDetails && (
        <div className="mt-8 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Subscriber Details</h2>
            <p>Subscriber ID: {subscriberDetails.id}</p>
            <p>First Name: {subscriberDetails.firstName}</p>
            <p>Last Name: {subscriberDetails.lastName}</p>
            <p>Email Address: {subscriberDetails.emailAddress}</p>
            <p>Phone: {subscriberDetails.phone}</p>
            <p>Score: {subscriberDetails.score}</p>
            <p>Created On: {new Date(subscriberDetails.createdOn).toLocaleString()}</p>
        </div>
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
)}
 
                </div>
            </div>
        </div>
    );
};

export default EmailSignupRequestsPage;

