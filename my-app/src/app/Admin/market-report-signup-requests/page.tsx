
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "../../globals.css";
import NavBar from '../../../components/Navbar/navbar';
import ReactPaginate from 'react-paginate';

const MarketReportRequestPage: React.FC = () => {
  const auth = useAuth();

  interface MarketReportRequest {
    id: string;
    subscriberId: string;
    marketReportId: string;
    createdOn: string;
    subscriber: {
      firstName?: string;
      lastName?: string;
      emailAddress?: string;
      phone?: string;
      links: { href: string }[];
    };
  }

  interface Subscriber {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone: string;
    createdOn: string;
  }

  const [requests, setRequests] = useState<MarketReportRequest[]>([]);
  const [displayedRequests, setDisplayedRequests] = useState<MarketReportRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MarketReportRequest | null>(null);
  const [subscriberDetails, setSubscriberDetails] = useState<Subscriber | null>(null);

  const [offset, setOffset] = useState(0);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (auth) {
      fetchRequests(offset);
    }
  }, [auth, offset]);

  const fetchRequests = async (currentOffset: number) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.get(`/api/marketReportSignupRequests?limit=${itemsPerPage}&offset=${currentOffset}`, {
        withCredentials: true,
      });

      const requests = response.data.results;
      const totalItems = response.data.total;

      setRequests(requests);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      setDisplayedRequests(requests);

      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching market report requests:', error);
      setError('Failed to fetch market report requests');
      setLoading(false);
    }
  };

  const fetchRequestDetails = async (id: string) => {
    try {
      setDetailsLoading(true);
      const response = await axios.get(`/api/marketReportSignupRequests/${id}`, {
        withCredentials: true,
      });
      setSelectedRequest(response.data);
      setDetailsLoading(false);
    } catch (error: any) {
      console.error('Error fetching request details:', error.response?.data || error.message);
      setError('Failed to fetch request details');
      setDetailsLoading(false);
    }
  };

  const fetchSubscriberDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/leads/${id}`, {
        withCredentials: true,
      });
      setSubscriberDetails(response.data);
    } catch (error: any) {
      console.error('Error fetching subscriber details:', error);
      setError('Failed to fetch subscriber details.');
    }
  };

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * itemsPerPage;
    setOffset(newOffset);
  };

  if (loading) {
    return <div>Loading Market Report requests, please wait...</div>;
  }

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Market Report Signup Requests</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Display list of market report requests */}
        <div>
          {displayedRequests.map((request) => (
            <div key={request.id} className="mb-4 p-4 border rounded">
              <p>Request ID: {request.id}</p>
              <p>Market Report ID: {request.marketReportId}</p>
              <p>Created On: {new Date(request.createdOn).toLocaleString()}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => fetchRequestDetails(request.id)}
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
            <p>Market Report ID: {selectedRequest.marketReportId}</p>
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
  );
};

export default MarketReportRequestPage;
