'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'; 
import "../../globals.css";
import NavBar from '../../../components/Navbar/navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import ReactPaginate from 'react-paginate';

const ListingReportSignupRequestsPage: React.FC = () => {
  const auth = useAuth(); // Check if the user is authenticated

  interface SignupRequest {
    id: string;
    subscriberId: string;
    listingReportId: string;
    createdOn: string;
    subscriber: {
      links: { href: string }[];
    };
    listingReport: {
      links: { href: string }[];
    };
    links: { href: string }[];
  }

  interface Subscriber {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone: string;
    score: number;
    createdOn: string;
  }

  const [signupRequests, setSignupRequests] = useState<SignupRequest[]>([]);
  const [displayedSignupRequests, setDisplayedSignupRequests] = useState<SignupRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(null);
  const [subscriberDetails, setSubscriberDetails] = useState<Subscriber | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 10; // Number of items per page
  const [totalPages, setTotalPages] = useState(0);

  // Fetch signup requests on component mount
  useEffect(() => {
    if (auth) fetchSignupRequests(offset);
  }, [auth, offset]);

  /**
   * Fetches signup requests with server-side pagination
   * @param {number} offset - The offset to fetch signup requests from
   */
  const fetchSignupRequests = async (offset: number) => {
    try {
      setError(null);
      setLoading(true);

      // Fetch data dynamically based on the offset and limit for pagination
      const response = await axios.get(`/api/listingReportSignupRequests?limit=${itemsPerPage}&offset=${offset}`, {
        withCredentials: true, // Ensure authentication credentials are sent with the request
      });

      const requests = response.data.results;
      const totalItems = response.data.total; // Assuming the total count of items is in response.data.total

      // Set signup requests for the current page
      setSignupRequests(requests);

      // Set the total number of pages for pagination
      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      // Set displayed requests based on current page's offset
      setDisplayedSignupRequests(requests);

      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching signup requests:', error);
      setError('Failed to fetch signup requests.');
      setLoading(false);
    }
  };

  // Fetch details for a specific signup request using the new API route
  const fetchRequestDetails = async (id: string) => {
    try {
      setDetailsLoading(true);
      const response = await axios.get(`/api/listingReportSignupRequests/${id}`);
      setSelectedRequest(response.data);
      setDetailsLoading(false);
    } catch (error: any) {
      console.error('Error fetching request details:', error);
      setError('Failed to fetch request details.');
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

  // Handle pagination page click
  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * itemsPerPage;
    setOffset(newOffset);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Listing Report Signup Requests</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Listing signup requests */}
          <div>
            {displayedSignupRequests.map((request) => (
              <div key={request.links[0].href} className="mb-4 p-4 border rounded">
                <p>Signup Request ID: {request.links[0].href.split('/').pop()?.split('.')[0]}</p>
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
              <p>Listing Report ID: {selectedRequest.listingReportId}</p>
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

              <h3 className="text-lg font-bold mt-4">Listing Report</h3>
              {selectedRequest.listingReport?.links?.[0]?.href && (
                <p>
                  <a href={selectedRequest.listingReport.links[0].href}>
                    View Listing Report Details
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
              <p>Score: {subscriberDetails.score}</p>
              <p>Created On: {new Date(subscriberDetails.createdOn).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingReportSignupRequestsPage;

