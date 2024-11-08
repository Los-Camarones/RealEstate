"use client";
import "../../globals.css";
import NavBar from "../../../components/Navbar/navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; 
import ReactPaginate from "react-paginate";

//marketReportSignupRequest
//listing-report-signup-requests
////scheduleShowingRequests

interface MarketReportRequest {
    id: string; // Add other relevant types (e.g., number)
    subscriberId: number;
    marketReportId: number;
    createdOn: string; // Consider using Date if you want to parse it later
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone?: string;
    region?: string; // Replace as needed with any Market Report-specific field
  }

  const MarketReportRequestPage: React.FC = () => {
    const auth = useAuth(); 
   
    const [requests, setRequests] = useState<MarketReportRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<MarketReportRequest[]>([]);
    const [displayedRequests, setDisplayedRequests] = useState<MarketReportRequest[]>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newRequest, setNewRequest] = useState({
      firstName: "",
      lastName: "",
      emailAddress: "",
    });
    const [name, setName] = useState<string>("");
    const [offset, setCurrentOffset] = useState(0);
    const [displayPages, setDisplayPages] = useState(0);
    const itemsPerPage = 10;
   
    useEffect(() => {
       if (auth) {
         fetchRequests();
       }
     }, [auth]);
   


     const fetchRequests = async () => {
       setLoading(true);
       try {
         const response = await axios.get(`/api/marketReportRequestSignupRequests?limit=500`, {
           withCredentials: true,
         });
         const results = response.data.results || [];
         setRequests(results);
         setDisplayPages(Math.ceil(response.data.total / itemsPerPage));
         updateDisplayedRequests(results, offset);
       } catch (error: any) {
         console.error("Error fetching Market Report requests", error);
         setError("Failed to fetch Market Report requests.");
       } finally {
         setLoading(false);
       }
     };
   
     useEffect(() => {
       updateDisplayedRequests(requests, offset);
     }, [requests, offset, isFiltered]);
   
     const updateDisplayedRequests = (data: MarketReportRequest[], offset: number) => {
       const end = offset + itemsPerPage;
       setDisplayedRequests(isFiltered ? filteredRequests.slice(offset, end) : data.slice(offset, end));
     };
   

    const handleAddNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
        setError(null);
        const response = await axios.post("/api/marketReportSignupRequests", newRequest, {
          withCredentials: true,
        });///Users/xuanxuanmiao/Documents/GitHub/RealEstate/my-app/src/app/api/marketReportSignupRequests
   
         if (response.status === 201) {
           fetchRequests();
           setShowForm(false);
         }
       } catch (error: any) {
         console.error("Error creating Market Report request", error);
         setError("Failed to create a new request.");
       }
     };
   
     const handleDeleteRequest = async (id: string) => {
       try {
         await axios.delete(`/api/marketReportRequests/${id}`, { withCredentials: true });
         fetchRequests();
       } catch (error: any) {
         console.error("Error deleting request", error);
         setError("Failed to delete the request.");
       }
     };
   
     const handleFilteringRequests = (name: string) => {
       const filtered = requests.filter(request =>
         request.firstName.toLowerCase().includes(name.toLowerCase()) ||
         request.lastName.toLowerCase().includes(name.toLowerCase())
       );
   
       setFilteredRequests(filtered);
       setIsFiltered(true);
       updateDisplayedRequests(filtered, offset);
       setDisplayPages(Math.ceil(filtered.length / itemsPerPage));
     };
   
     const handlePageClick = (data: { selected: number }) => {
       const newOffset = data.selected * itemsPerPage;
       setCurrentOffset(newOffset);
     };
   
     const handleFilterChange = (name: string) => {
       setName(name);
       if (name.trim() === "") {
         setIsFiltered(false);
         updateDisplayedRequests(requests, 0);
       } else {
         handleFilteringRequests(name);
       }
     };

     ///U/DmarketReportSignupRequest
   
     if (!auth) {
       return <div>Loading...</div>;
     }
   
     if (loading) {
       return <div>Loading Market Report requests, please wait...</div>;
     }
   
     return (
       <div className="flex-grow">
         <NavBar />
         <div className="p-4">
           <h1 className="text-2xl font-bold mb-4">Market Report Signup Requests</h1>
           {error && <div className="text-red-500 mb-4">{error}</div>}
           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(!showForm)} disabled={loading}>
             Add New
           </button>
   
           {showForm && (
             <form onSubmit={handleAddNewRequest} className="mt-4 bg-gray-200 p-4 rounded">
               <div className="mb-2">
                 <label className="block text-gray-700">First Name:</label>
                 <input type="text" value={newRequest.firstName} onChange={(e) => setNewRequest({ ...newRequest, firstName: e.target.value })} className="w-full px-2 py-1 border rounded" required />
               </div>
               <div className="mb-2">
                 <label className="block text-gray-700">Last Name:</label>
                 <input type="text" value={newRequest.lastName} onChange={(e) => setNewRequest({ ...newRequest, lastName: e.target.value })} className="w-full px-2 py-1 border rounded" required />
               </div>
               <div className="mb-2">
                 <label className="block text-gray-700">Email Address:</label>
                 <input type="email" value={newRequest.emailAddress} onChange={(e) => setNewRequest({ ...newRequest, emailAddress: e.target.value })} className="w-full px-2 py-1 border rounded" required />
               </div>
               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
             </form>
           )}
   
           <form className="flex items-center space-x-2 p-4 bg-white max-w-sm ml-auto mr-4 mt-4">
             <input type="text" value={name} onChange={(event) => handleFilterChange(event.target.value)} placeholder="Enter first or last name" className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400" />
           </form>
   
           <table className="min-w-full table-auto mt-4">
             <thead>
               <tr>
                 <th className="border px-4 py-2">First Name</th>
                 <th className="border px-4 py-2">Last Name</th>
                 <th className="border px-4 py-2">Email Address</th>
                 <th className="border px-4 py-2">Phone</th>
                 <th className="border px-4 py-2">Region</th>
                 <th className="border px-4 py-2">Actions</th>
               </tr>
             </thead>
             <tbody>
               {displayedRequests.map((request) => (
                 <tr key={request.id}>
                   <td className="border px-4 py-2">{request.firstName}</td>
                   <td className="border px-4 py-2">{request.lastName}</td>
                   <td className="border px-4 py-2">{request.emailAddress}</td>
                   <td className="border px-4 py-2">{request.phone}</td>
                   <td className="border px-4 py-2">{request.region}</td>
                   <td className="border px-4 py-2">
                     <button onClick={() => handleDeleteRequest(request.id)} className="text-red-500 hover:underline">Delete</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
   
           {displayPages > 1 && (
             <ReactPaginate
               previousLabel={"← Previous"}
               nextLabel={"Next →"}
               breakLabel={"..."}
               pageCount={displayPages}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={handlePageClick}
               containerClassName={"flex justify-center mt-4"}
               pageClassName={"mx-1"}
               pageLinkClassName={"px-3 py-1 border rounded"}
               previousClassName={"mx-1"}
               nextClassName={"mx-1"}
               activeClassName={"bg-blue-500 text-white"}
             />
           )}
         </div>
       </div>
     );
   };
   
   export default MarketReportRequestPage;