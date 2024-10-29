'use client';

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "../../globals.css";
import NavBar from '../../../components/Navbar/navbar';
import ReactPaginate from 'react-paginate';
import Sidebar from '../../../components/Admin/Sidebar';


const MoreInfoRequestsPage: React.FC = () => {
  const auth = useAuth();


  interface MoreInfoRequest {
    id: string;
    subscriberId: string;
    listingId: string;
    createdOn: string;
    message: string;
    subscriber: {
      links: { href: string} [];


    };
    moreInfoRequest: {
      links: { href: string}[];
    };
    links: {href: string}[];
  }


  interface Subscriber {
    id: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    phone: string;
    createdOn: string;
  }


  interface Property {
    id: string;
    address: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
}


 


  const [moreInfoRequests, setMoreInfoRequests] = useState<MoreInfoRequest[]>([]);
  const [displayedMoreInfoRequests, setDisplayedMoreInfoRequests] = useState<MoreInfoRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<MoreInfoRequest | null>(null);
  const [subscriberDetails, setSubscriberDetails] = useState<Subscriber | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);


// Pagination state
const [offset, setOffset] = useState(0);
const itemsPerPage = 10; // Number of items per page
const [totalPages, setTotalPages] = useState(0);


//fetch valuation requests


useEffect(() => {
  if(auth) fetchMoreInfoRequests(offset);


}, [auth, offset]);


/**
 * Fetch valuation requests from the server
 * @param {number} offset
 */


const fetchMoreInfoRequests = async (offset: number) => {
  try {
    setError(null);
    setLoading(true);


    //fetch data dynamically
    const response = await axios.get(`/api/moreInfoRequests?limit=${itemsPerPage}&offset=${offset}`, {
      withCredentials: true,
    });


    const requests = response.data.results;
    const totalItems = response.data.total;
   
    setMoreInfoRequests(requests);
    setTotalPages(Math.ceil(totalItems / itemsPerPage));


    setDisplayedMoreInfoRequests(requests);


    setLoading(false);
  } catch (error: any) {
    console.error('error fetching more information requests:', error);
    setError('failed to fetch more information requests');
    setLoading(false);


  }
};
   


const fetchRequestDetails = async (id: string) => {
  try{
    setDetailsLoading(true);
    const response = await axios.get(`/api/moreInfoRequests/${id}`);
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


//FETCH LISTING DETAILS
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




// Handle pagination page click
const handlePageClick = (data: { selected: number }) => {
  const newOffset = data.selected * itemsPerPage;
  setOffset(newOffset);
};


if (loading) {
  return <div>loading...</div>;
}


//UI

return (
  <div className="flex">
    <Sidebar />
    <div className="flex-grow">
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">More info Report Requests</h1>


        {error && <div className="text-red-500 mb-4">{error}</div>}


        {/* more info requests */}
        <div>
          {displayedMoreInfoRequests.map((request) => (
            <div key={request.links[0].href} className="mb-4 p-4 border rounded">
              <p>More info Request ID: {request.links[0].href.split('/').pop()?.split('.')[0]}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => fetchRequestDetails(request.links[0].href.split('/').pop()?.split('.')[0] || '')}
              >
                View Details
              </button>
            </div>
          ))}
        </div>


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
            forcePage={offset / itemsPerPage}
            containerClassName="flex space-x-2"
            pageClassName="rounded-full bg-gray-200 px-3 py-1"
            pageLinkClassName="text-gray-700 hover:text-blue-600"
            previousClassName="rounded-full bg-blue-500 text-white px-3 py-1"
            nextClassName="rounded-full bg-blue-500 text-white px-3 py-1"
            breakClassName="text-gray-500 px-3 py-1"
            activeClassName="bg-blue-500 text-white"
          />
        </div>


        {/* Details for selected request */}
        {detailsLoading && <div>Loading details...</div>}


        {selectedRequest && !detailsLoading && (
          <div className="mt-8 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Request Details</h2>
            <p>Request ID: {selectedRequest.id}</p>
            <p>Subscriber ID: {selectedRequest.subscriberId}</p>
            <p>Listing ID: {selectedRequest.listingId}</p>
            <p>Message: {selectedRequest.message}</p>
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


            <h3 className="text-lg font-bold mt-4">More Info Report</h3>
            {selectedRequest.moreInfoRequest?.links?.[0]?.href && (
              <p>
                <a href={selectedRequest.moreInfoRequest.links[0].href}>
                  View More Info Report Details
                </a>
              </p>
            )}
          </div>
        )}


        {/* Display subscriber details if available */}
        {subscriberDetails && (
          <div className="mt-8 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Subscriber Details</h2>
            <p>Subscriber ID: {subscriberDetails.id}</p>
            <p>Name: {subscriberDetails.firstName} {subscriberDetails.lastName}</p>
            <p>Email: {subscriberDetails.emailAddress}</p>
            <p>Phone: {subscriberDetails.phone}</p>
            <p>Created On: {new Date(subscriberDetails.createdOn).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);




};


export default MoreInfoRequestsPage;



