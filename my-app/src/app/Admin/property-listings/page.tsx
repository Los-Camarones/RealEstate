'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyListings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  // Fetch listings from the API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');  // Fetch from your API endpoint
        setListings(response.data.results);  // Adjust depending on the data structure
      } catch (err) {
        setError('Failed to load listings');
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Property Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Listing {index + 1}</h2>
            <a href={listing.links.find((link: any) => link.rel === 'detailPage').href}
               className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              View on Website
            </a>
            <a href={`/property-listings/${listing.links.find((link: any) => link.rel === 'self').href.split('/').pop()}`}
               className="text-blue-500 hover:underline ml-4">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
