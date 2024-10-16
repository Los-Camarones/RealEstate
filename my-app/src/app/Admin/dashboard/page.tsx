'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/Admin');
  }, [router]);


  return null;  // No need to render anything, just redirect
};

export default DashboardRedirect;












// "use client";
// import "../../globals.css";
// import NavBar from "../../../components/Navbar/navbar";
// import Sidebar from "../../../components/Admin/Sidebar";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth"; // Ensure user is authenticated
// import ReactPaginate from "react-paginate";

// const RequestListPage: React.FC = () => {
//   const auth = useAuth(); // Check if the user is authenticated

//   interface Request {
//     id: string;
//     firstName: string;
//     lastName: string;
//     emailAddress: string;
//     phone?: string;
//     pipelineStage?: string;
//   }

//   // Complete array of requests pulled from iHomeFinder
//   const [requests, setRequests] = useState<Request[]>([]);

//   // Array of filtered requests
//   const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);

//   // Array of requests that are displayed for current page
//   const [displayedRequests, setDisplayedRequests] = useState<Request[]>([]);

//   // isFiltered boolean flag to indicate if filtering has occurred
//   const [isFiltered, setIsFiltered] = useState<boolean>(false);

//   // Loading boolean flag to indicate loading the fetch of data
//   const [loading, setLoading] = useState(true);

//   // String showing errors
//   const [error, setError] = useState<string | null>(null);

//   // Boolean flag to show forms
//   const [showForm, setShowForm] = useState(false);

//   // Object to represent a new request
//   const [newRequest, setNewRequest] = useState({
//     firstName: "",
//     lastName: "",
//     emailAddress: "",
//   });

//   // String to filter a request by its name
//   const [name, setName] = useState<string>("");

//   // Offset is an integer that represents the current index of an array of requests
//   const [offset, setCurrentOffset] = useState(0);

//   // Number to represent the amount of pages to DISPLAY of requests. dynamic
//   const [displayPages, setDisplayPages] = useState(0);

//   // Number to represent the total pages we need for all the requests
//   const [totalPages, setTotalPages] = useState(0);

//   // Number of items to display per page
//   const itemsPerPage = 10;

//   // Fetch the list of subscribers on component mount if authenticated
//   useEffect(() => {
//     if (auth) {
//       fetchRequests();
//     }
//   }, [auth]);

//   /**
//    * Fetches requests for authorized users
//    * Sets the requests
//    * Sets the amount of total requests
//    * Sets which requests will be displayed for current page
//    * Sets the total amount of pages based on requests length
//    */
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Hardcoded limit at 500. If limit exceeds, better to implement pagination of subscriber requests, though filtering will be not exist anymore
//       const response = await axios.get(`/api/requests?&limit=500`, {
//         withCredentials: true, // This ensures the cookie is sent with the request
//       });

//       // Set the requests
//       setRequests(response.data.results || []); // Assuming the response contains requests in 'results'

//       // Set requests to display on current page
//       setDisplayedRequests(
//         response.data.results.slice(offset, offset + itemsPerPage)
//       );

//       // Set the total amount of pages based on total number of requests
//       setTotalPages(Math.ceil(response.data.total / 10));

//       // Set the display pages
//       setDisplayPages(Math.ceil(response.data.total / 10));

//       setLoading(false);
//     } catch (error: any) {
//       console.error(
//         "Error fetching requests",
//         error.response?.data || error.message
//       );
//       setError("Failed to fetch requests.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Update displayed requests when requests, filteredRequests, offset, or isFiltered is changed
//     const end = offset + itemsPerPage;
//     if (isFiltered) {
//       setDisplayedRequests(filteredRequests.slice(offset, end));
//     } else {
//       setDisplayedRequests(requests.slice(offset, end));
//     }
//   }, [requests, offset, isFiltered]);

//   const handleAddNewRequest = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setError(null);
//       const response = await axios.post("/api/requests", newRequest, {
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         fetchRequests(); // Refresh requests after adding
//         setShowForm(false);
//       }
//     } catch (error: any) {
//       console.error(
//         "Error creating request",
//         error.response?.data || error.message
//       );
//       setError("Failed to create a new request.");
//     }
//   };

//   const handleDeleteRequest = async (id: string) => {
//     try {
//       setError(null);
//       console.log("before calling api");
//       await axios.delete(`/api/requests/${id}`, {
//         // Pass the ID in the URL path, not as a query parameter
//         withCredentials: true,
//       });
//       console.log("after calling api");
//       fetchRequests(); // Refresh requests after deletion
//     } catch (error: any) {
//       console.error(
//         "Error deleting request",
//         error.response?.data || error.message
//       );
//       setError("Failed to delete the request.");
//     }
//   };

//   /**
//    * Filtering will only be by name of the subscriber based on first or last name
//    * Filters requests by name
//    * updates the displayed requests
//    * sets the total filtered requests by the length
//    * sets our array of filtered requests
//    * @param name
//    */
//   const handleFilteringRequests = async (name: string) => {
//     try {
//       if (name) {
//         // Filter our data points such that the parameter is in first or last name
//         const filteredRequests = requests.filter(
//           (record: Request) =>
//             record.firstName.toLowerCase().includes(name.toLowerCase()) ||
//             record.lastName.toLowerCase().includes(name.toLowerCase())
//         );

//         // Update what is displayed based on parameter
//         setDisplayedRequests(filteredRequests.slice(offset, offset + itemsPerPage)); // Set displayed requests

//         // Update our array of filtered requests
//         setFilteredRequests(filteredRequests);

//         // Update the pages we have to display
//         setDisplayPages(Math.ceil(filteredRequests.length / 10));
//       }
//     } catch (error: any) {
//       console.error(
//         "Error filtering requests",
//         error.response?.data || error.message
//       );
//       setError("Failed to filter requests");
//     }
//   };

//   // If the user isn't authenticated, prevent rendering the requests
//   if (!auth) {
//     return <div>Loading...</div>;
//   }

//   if (loading) {
//     return <div>Loading requests, please wait...</div>;
//   }

//   const handlePageClick = (data: { selected: number }) => {
//     const newOffset = data.selected * 10;
//     setCurrentOffset(newOffset);
//   };

//   /**
//    * Handles logic when the filter input is changed
//    * Sets the isFiltered to appropriate value
//    * Resets currentOffset to 0
//    * Updates the displayed requests 
//    * 
//    * @param name 
//    */
//   const handleFilterChange = (name: string) => {
//     if (name.trim() === "") {
//       // Filtering is false because no input is given
//       setIsFiltered(false);

//       // Set index to zero
//       setCurrentOffset(0);

//       // Update our displayed requests based on our original FETCH data
//       setDisplayedRequests(requests.slice(offset, offset + itemsPerPage)); 

//       // Resets the amount of pages
//       setDisplayPages(totalPages);
//     } else {
//       // Set isFiltered to true
//       setIsFiltered(true);

//       // Set index to zero
//       setCurrentOffset(0);

//       // If user enters a name to filter, we have to update which requests are shown
//       handleFilteringRequests(name);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-grow">
//         <NavBar />
//         <div className="p-4">
//           <h1 className="text-2xl font-bold mb-4">Request List</h1>

//           {error && <div className="text-red-500 mb-4">{error}</div>}

//           {/* Add New Request Button */}
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => setShowForm(!showForm)}
//             disabled={loading} // Disable while loading
//           >
//             Add New
//           </button>

//           {/* Add New Request Form */}
//           {showForm && (
//             <form
//               onSubmit={handleAddNewRequest}
//               className="mt-4 bg-gray-200 p-4 rounded"
//             >
//               <div className="mb-2">
//                 <label className="block text-gray-700">First Name:</label>
//                 <input
//                   type="text"
//                   value={newRequest.firstName}
//                   onChange={(e) =>
//                     setNewRequest({ ...newRequest, firstName: e.target.value })
//                   }
//                   className="w-full px-2 py-1 border rounded"
//                   required
//                   />
//                </div>



//                <div className="mb-2">
//                 <label className="block text-gray-700">Last Name:</label>
//                 <input
//                   type="text"
//                   value={newRequest.lastName}
//                   onChange={(e) =>
//                     setNewRequest({ ...newRequest, lastName: e.target.value })
//                   }
//                   className="w-full px-2 py-1 border rounded"
//                   required
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="block text-gray-700">Email Address:</label>
//                 <input
//                   type="email"
//                   value={newRequest.emailAddress}
//                   onChange={(e) =>
//                     setNewRequest({ ...newRequest, emailAddress: e.target.value })
//                   }
//                   className="w-full px-2 py-1 border rounded"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             </form>
//           )}

//           {/* Filtering search bar*/}
//           <form className="flex items-center space-x-2 p-4 bg-white max-w-sm ml-auto mr-4 mt-4">
//             <input
//               type="text"
//               value={name}
//               onChange={(event) => {
//                 setName(event.target.value);
//                 handleFilterChange(event.target.value); // Call filter on each keystroke
//               }}
//               placeholder="Enter first or last name"
//               className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
//             />
//           </form>

//           <table className="min-w-full table-auto mt-4">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Phone</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedRequests.map((lead) => (
//                 <tr key={lead.id} className="border-t">
//                   <td className="px-4 py-2">{`${lead.firstName} ${lead.lastName}`}</td>
//                   <td className="px-4 py-2">{lead.emailAddress}</td>
//                   <td className="px-4 py-2">{lead.phone || "N/A"}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleDeleteRequest(lead.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination component */}
//           <div className="flex justify-center mt-4">
//             <ReactPaginate
//               previousLabel={"Previous"}
//               nextLabel={"Next"}
//               breakLabel={"..."}
//               pageCount={displayPages}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={3}
//               onPageChange={handlePageClick}
//               forcePage={offset / 10}
//               containerClassName="flex space-x-2"
//               pageClassName="rounded-full bg-gray-200 px-3 py-1"
//               pageLinkClassName="text-gray-700 hover:text-blue-600"
//               previousClassName="rounded-full bg-blue-500 text-white px-3 py-1"
//               nextClassName="rounded-full bg-blue-500 text-white px-3 py-1"
//               breakClassName="text-gray-500 px-3 py-1"
//               activeClassName="bg-blue-500 text-white"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

