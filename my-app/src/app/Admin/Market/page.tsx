// src/app/Admin/markets/page.tsx

'use client';
import '../../globals.css'; 
import NavBar from '../../../components/Navbar/navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';  
import ReactPaginate from 'react-paginate';

interface Market {
  id: string;
  name: string;
  clientId: string;
  // Include any other properties returned by the detailed market data
}

const MarketPage: React.FC = () => {
  const auth = useAuth();  // Check if the user is authenticated
  const [markets, setMarkets] = useState<Market[]>([]);
  const [displayedMarkets, setDisplayedMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page

  // State for form visibility and new market input
  const [showForm, setShowForm] = useState(false);
  const [newMarketName, setNewMarketName] = useState('');
  // Add other fields if necessary

  // Fetch list of markets on component mount if authenticated
  useEffect(() => {
    if (auth) {
      fetchMarkets();
    }
  }, [auth]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/market', {
        withCredentials: true, // ensure cookie is sent with request
      });

      console.log('Detailed Market Data:', response.data);

      const fetchedMarkets = response.data || [];
      setMarkets(fetchedMarkets);

      // Set the total pages based on the number of markets
      setTotalPages(Math.ceil(fetchedMarkets.length / itemsPerPage));

      // Set markets to display for the current page
      setDisplayedMarkets(fetchedMarkets.slice(offset, offset + itemsPerPage));
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching markets', error.response?.data || error.message);
      setError('Failed to fetch markets.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update displayed markets when offset or markets are changed
    setDisplayedMarkets(markets.slice(offset, offset + itemsPerPage));
  }, [offset, markets]);

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = data.selected * itemsPerPage;
    setOffset(newOffset);
  };

  // Handle form submission for adding a new market
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newMarketData = {
        name: newMarketName,
        // Include other fields if necessary
      };

      // Send a POST request to your API
      const response = await axios.post('/api/market', newMarketData, {
        withCredentials: true,
      });

      // Add the new market to the list
      setMarkets([response.data, ...markets]);
      setShowForm(false);
      setNewMarketName('');
      // Reset other fields if necessary
    } catch (error: any) {
      console.error('Error adding market', error.response?.data || error.message);
      setError('Failed to add market.');
    }
  };

  // If the user isn't authenticated, prevent rendering the markets
  if (!auth) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading markets, please wait...</div>;
  }

  return (
    <div className="flex-grow">
      <NavBar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Market List</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Market
          </button>
        </div>

        {showForm && (
          <div className="mb-4 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Add New Market</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Market Name</label>
                <input
                  type="text"
                  value={newMarketName}
                  onChange={(e) => setNewMarketName(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              {/* Add other fields if necessary */}
              <div className="flex space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Table of Markets */}
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Market ID</th>
              <th className="px-4 py-2">Client Id</th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody>
            {displayedMarkets.map((market, index) => (
              <tr key={`${market.id}-${index}`} className="border-t">
                <td className="px-4 py-2">{market.name}</td>
                <td className="px-4 py-2">{market.id}</td>
                <td className="px-4 py-2">{market.clientId}</td>
                {/* Add more data fields if needed */}
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
    </div>
  );
};

export default MarketPage;
