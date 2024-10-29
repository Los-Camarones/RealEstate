"use client";
import "../../globals.css";
import NavBar from "../../../components/Navbar/navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Ensure user is authenticated
import ReactPaginate from "react-paginate";



const LeadListPage: React.FC = () => {
  const auth = useAuth(); // Check if the user is authenticated

  interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone?: string;
    pipelineStage?: string;
  }

  //complete array of leads pulled from ihomefinder
  const [leads, setLeads] = useState<Lead[]>([]);

  //array of filtered leads
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  //array of leads that are displayed for current page
  const [displayedLeads, setDisplayedLeads] = useState<Lead[]>([]);

  //isFiltered boolean flag to indicate if filtering has occured
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  //loading boolean flag to indicate loading the fetch of data
  const [loading, setLoading] = useState(true);

  //string showing errors 
  const [error, setError] = useState<string | null>(null);

  //boolean flag to show forms
  const [showForm, setShowForm] = useState(false);

  //obkect to represent a new lead
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  //string to filter a lead by its name
  const [name, setName] = useState<string>("");

  //offset is a integer that represents the current index of an array of leads
  const [offset, setCurrentOffset] = useState(0);

  //number to represent the amount of pages to DISPLAY of leads. dynamic
  const [displayPages, setDisplayPages] = useState(0);

  //number to represent the total pages we need for all the leads
  const [totalPages, setTotalPages] = useState(0);

  //number of items to display per page
  const itemsPerPage = 10;

  // Fetch the list of subscribers on component mount if authenticated
  useEffect(() => {
    if (auth) {
      fetchLeads();
    }
  }, [auth]);

  /**
   * Fetches leads for authorized users
   * sets the leads
   * sets the amount of total leads
   * sets which leads will be displayed for current page
   * sets the total amount of pages based on leads length
   */
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      //harcoded limit at 500. If limit exceeds, better to implement pagination of subscriber leads, though, filtering will be not exist anymore
      const response = await axios.get(`/api/leads?&limit=500`, {
        withCredentials: true, // This ensures the cookie is sent with the request
      });

      //set the leads
      setLeads(response.data.results || []); // Assuming the response contains leads in 'results'


      //set leads to display on current page
      setDisplayedLeads(
        response.data.results.slice(offset, offset + itemsPerPage)
      );

      //set the total amount of pages based on total number of leads
      setTotalPages(Math.ceil(response.data.total / 10));

      //set the display pages
      setDisplayPages(Math.ceil(response.data.total / 10));

      setLoading(false);
    } catch (error: any) {
      console.error(
        "Error fetching leads",
        error.response?.data || error.message
      );
      setError("Failed to fetch leads.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update displayed leads when leads, filteredLeads, offset, or isFiltered is changed
    const end = offset + itemsPerPage;
    if (isFiltered) {
      setDisplayedLeads(filteredLeads.slice(offset, end));
    } else {
      setDisplayedLeads(leads.slice(offset, end));
    }
  }, [leads, offset, isFiltered]);

  const handleAddNewLead = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      const response = await axios.post("/api/leads", newLead, {
        withCredentials: true,
      });

      if (response.status === 201) {
        fetchLeads(); // Refresh leads after adding
        setShowForm(false);
      }
    } catch (error: any) {
      console.error(
        "Error creating lead",
        error.response?.data || error.message
      );
      setError("Failed to create a new lead.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      setError(null);
      console.log("before calling api");
      await axios.delete(`/api/leads/${id}`, {
        // Pass the ID in the URL path, not as a query parameter
        withCredentials: true,
      });
      console.log("after calling api");
      fetchLeads(); // Refresh leads after deletion
    } catch (error: any) {
      console.error(
        "Error deleting lead",
        error.response?.data || error.message
      );
      setError("Failed to delete the lead.");
    }
  };

  /**
   * Filtering will only be by name of the subscriber based on first or last name
   * Filters leads by name
   * updates the displayed leads
   * sets the total filtered leads by the length
   * sets our array of filtered leads
   * @param name
   */
  const handleFilteringLeads = async (name: string) => {
    try {
      if (name) {
        // Filter our data points such that the parameter is in first or last name
        const filteredLeads = leads.filter(
          (record: Lead) =>
            record.firstName.toLowerCase().includes(name.toLowerCase()) ||
            record.lastName.toLowerCase().includes(name.toLowerCase())
        );

        // Update what is displayed based on parameter
        setDisplayedLeads(filteredLeads.slice(offset, offset + itemsPerPage)); // Set displayed leads

        //update our array of filtered leads
        setFilteredLeads(filteredLeads);

        //update the pages we have to display
        setDisplayPages(Math.ceil(filteredLeads.length / 10));
      }
    } catch (error: any) {
      console.error(
        "Error filtering leads",
        error.response?.data || error.message
      );
      setError("Failed to filter leads");
    }
  };

  // If the user isn't authenticated, prevent rendering the leads
  if (!auth) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading leads, please wait...</div>;
  }

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * 10;
    setCurrentOffset(newOffset);
  };

  /**
   * Handles logic when the filter input is changed
   * Sets the isFiltered to appropriate value
   * resets currentOffset to 0
   * updates the displayed leads 
   * 
   * @param name 
   */
  const handleFilterChange = (name: string) => {
    if (name.trim() === "") {
      
    //filtering is false because no input is given
      setIsFiltered(false);

      //set index to zero
      setCurrentOffset(0);

      //update our display leads based on our original FETCH data
      setDisplayedLeads(leads.slice(offset, offset + itemsPerPage)); 

      //resets the amount of pages
      setDisplayPages(totalPages);
    } else {
      //set is filtered to true
      setIsFiltered(true);

      //set index to zero
      setCurrentOffset(0);

      //if user enters a name to filter, we have to update which leads are shown
      handleFilteringLeads(name);
    }
  };

  return (

      <div className="flex-grow">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Lead List</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Add New Lead Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(!showForm)}
            disabled={loading} // Disable while loading
          >
            Add New
          </button>

          {/* Add New Lead Form */}
          {showForm && (
            <form
              onSubmit={handleAddNewLead}
              className="mt-4 bg-gray-200 p-4 rounded"
            >
              <div className="mb-2">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  value={newLead.firstName}
                  onChange={(e) =>
                    setNewLead({ ...newLead, firstName: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  value={newLead.lastName}
                  onChange={(e) =>
                    setNewLead({ ...newLead, lastName: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700">Email Address:</label>
                <input
                  type="email"
                  value={newLead.emailAddress}
                  onChange={(e) =>
                    setNewLead({ ...newLead, emailAddress: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          )}

          {/* Filtering search bar*/}
          <form className="flex items-center space-x-2 p-4 bg-white max-w-sm ml-auto mr-4 mt-4">
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                handleFilterChange(event.target.value); // Call filter on each keystroke
              }}
              placeholder="Enter first or last name"
              className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
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
                  <td className="px-4 py-2">{lead.phone || "N/A"}</td>
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

          {/* Pagination component */}
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={displayPages}
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
  );
};

export default LeadListPage;
