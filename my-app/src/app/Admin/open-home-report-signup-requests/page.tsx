"use client";
import "../../globals.css";
import NavBar from "../../../components/Navbar/navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Ensure user is authenticated
import ReactPaginate from "react-paginate";

const OpenHomeReportSignupPage: React.FC = () => {
  const auth = useAuth(); // Check if the user is authenticated

  interface SignupRequest {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phone?: string;
    subscriber: {
        links: { href: string} [];
                };
  }

  const [signups, setSignups] = useState<SignupRequest[]>([]);
  const [filteredSignups, setFilteredSignups] = useState<SignupRequest[]>([]);
  const [displayedSignups, setDisplayedSignups] = useState<SignupRequest[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [newSignup, setNewSignup] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
  });

  const [name, setName] = useState<string>("");
  const [offset, setCurrentOffset] = useState(0);
  const [displayPages, setDisplayPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (auth) {
      fetchSignups();
    }
  }, [auth]);

  const fetchSignups = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/openHomeReportSignupRequests?limit=500`, {
        withCredentials: true,
      });

      setSignups(response.data.results || []);
      setDisplayedSignups(response.data.results.slice(offset, offset + itemsPerPage));
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setDisplayPages(Math.ceil(response.data.total / itemsPerPage));

      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching signups", error.response?.data || error.message);
      setError("Failed to fetch signups.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const end = offset + itemsPerPage;
    if (isFiltered) {
      setDisplayedSignups(filteredSignups.slice(offset, end));
    } else {
      setDisplayedSignups(signups.slice(offset, end));
    }
  }, [signups, offset, isFiltered]);

  const handleAddNewSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post("/api/openHomeReportSignupRequests", newSignup, {
        withCredentials: true,
      });

      if (response.status === 201) {
        fetchSignups(); // Refresh signups after adding
        setShowForm(false);
      }
    } catch (error: any) {
      console.error("Error creating signup", error.response?.data || error.message);
      setError("Failed to create a new signup.");
    }
  };

  const handleDeleteSignup = async (id: string) => {
    try {
      setError(null);
      await axios.delete(`/api/openHomeReportSignupRequests/${id}`, {
        withCredentials: true,
      });
      fetchSignups(); // Refresh signups after deletion
    } catch (error: any) {
      console.error("Error deleting signup", error.response?.data || error.message);
      setError("Failed to delete the signup.");
    }
  };

  const handleFilteringSignups = async (name: string) => {
    if (name) {
      const filteredSignups = signups.filter(
        (record: SignupRequest) =>
          record.firstName.toLowerCase().includes(name.toLowerCase()) ||
          record.lastName.toLowerCase().includes(name.toLowerCase())
      );

      setDisplayedSignups(filteredSignups.slice(offset, offset + itemsPerPage));
      setFilteredSignups(filteredSignups);
      setDisplayPages(Math.ceil(filteredSignups.length / itemsPerPage));
    }
  };

  if (!auth) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading signups, please wait...</div>;
  }

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * itemsPerPage;
    setCurrentOffset(newOffset);
  };

  const handleFilterChange = (name: string) => {
    if (name.trim() === "") {
      setIsFiltered(false);
      setCurrentOffset(0);
      setDisplayedSignups(signups.slice(0, itemsPerPage));
      setDisplayPages(totalPages);
    } else {
      setIsFiltered(true);
      setCurrentOffset(0);
      handleFilteringSignups(name);
    }
  };

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Open Home Report Signups</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(!showForm)}
          disabled={loading} // Disable while loading
        >
          Add New
        </button>

        {showForm && (
          <form
            onSubmit={handleAddNewSignup}
            className="mt-4 bg-gray-200 p-4 rounded"
          >
            <div className="mb-2">
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                value={newSignup.firstName}
                onChange={(e) =>
                  setNewSignup({ ...newSignup, firstName: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                value={newSignup.lastName}
                onChange={(e) =>
                  setNewSignup({ ...newSignup, lastName: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Email Address:</label>
              <input
                type="email"
                value={newSignup.emailAddress}
                onChange={(e) =>
                  setNewSignup({ ...newSignup, emailAddress: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                value={newSignup.phone}
                onChange={(e) =>
                  setNewSignup({ ...newSignup, phone: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
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

        {/* Filtering search bar */}
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
            {displayedSignups.map((signup) => (
              <tr key={signup.id} className="border-t">
                <td className="px-4 py-2">{`${signup.firstName} ${signup.lastName}`}</td>
                <td className="px-4 py-2">{signup.emailAddress}</td>
                <td className="px-4 py-2">{signup.phone || "N/A"}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteSignup(signup.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={displayPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center space-x-2"}
            pageClassName={"px-4 py-2 border rounded"}
            pageLinkClassName={"hover:bg-blue-300"}
            previousClassName={"px-4 py-2 border rounded"}
            nextClassName={"px-4 py-2 border rounded"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-blue-400 text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default OpenHomeReportSignupPage;
