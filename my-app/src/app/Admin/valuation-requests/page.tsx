"use client";
import "../../globals.css";
import NavBar from "../../../components/Navbar/navbar";
import Sidebar from "../../../components/Admin/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Ensure user is authenticated
import ReactPaginate from "react-paginate";

const ValuationRequestsPage: React.FC = () => {
  const auth = useAuth(); // Check if the user is authenticated

  interface ValuationRequest {
    id: string;
    name: string;
    email: string;
    phone?: string;
    propertyDetails: string;
    date: string;
  }

  // State for valuation requests
  const [valuationRequests, setValuationRequests] = useState<ValuationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ValuationRequest[]>([]);
  const [displayedRequests, setDisplayedRequests] = useState<ValuationRequest[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Fetch the valuation requests if authenticated
  useEffect(() => {
    if (auth) {
      fetchValuationRequests();
    }
  }, [auth]);

  const fetchValuationRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/valuation-requests?limit=500`, {
        withCredentials: true, // Send authentication cookie
      });

      setValuationRequests(response.data.results || []);
      setDisplayedRequests(response.data.results.slice(offset, offset + itemsPerPage));
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching valuation requests:", error.response?.data || error.message);
      setError("Failed to fetch valuation requests.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const end = offset + itemsPerPage;
    if (isFiltered) {
      setDisplayedRequests(filteredRequests.slice(offset, end));
    } else {
      setDisplayedRequests(valuationRequests.slice(offset, end));
    }
  }, [valuationRequests, offset, isFiltered]);

  const handleFilterChange = (name: string) => {
    if (name.trim() === "") {
      setIsFiltered(false);
      setOffset(0);
      setDisplayedRequests(valuationRequests.slice(0, itemsPerPage));
    } else {
      setIsFiltered(true);
      setOffset(0);
      handleFilteringRequests(name);
    }
  };

  const handleFilteringRequests = (name: string) => {
    const filtered = valuationRequests.filter(
      (request) => request.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredRequests(filtered);
    setDisplayedRequests(filtered.slice(0, itemsPerPage));
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * itemsPerPage;
    setOffset(newOffset);
  };

  if (!auth) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading valuation requests, please wait...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Valuation Requests</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          {/* Filtering search bar */}
          <form className="flex items-center space-x-2 p-4 bg-white max-w-sm ml-auto mr-4 mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleFilterChange(e.target.value);
              }}
              placeholder="Search by name"
              className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </form>

          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Property Details</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.map((request) => (
                <tr key={request.id} className="border-t">
                  <td className="px-4 py-2">{request.name}</td>
                  <td className="px-4 py-2">{request.email}</td>
                  <td className="px-4 py-2">{request.phone || "N/A"}</td>
                  <td className="px-4 py-2">{request.propertyDetails}</td>
                  <td className="px-4 py-2">{new Date(request.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName="flex space-x-2"
              pageClassName="rounded-full bg-gray-200 px-3 py-1"
              activeClassName="bg-blue-500 text-white"
              pageLinkClassName="text-gray-700 hover:text-blue-600"
              previousClassName="bg-blue-500 text-white px-3 py-1"
              nextClassName="bg-blue-500 text-white px-3 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationRequestsPage;
