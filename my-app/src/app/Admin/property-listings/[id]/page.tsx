'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get listing ID from the URL
  interface Listing {
    id: string;
    description?: string;
    // Add other fields 
  }

  const [listing, setListing] = useState<Listing | null>(null);
  const [error, setError] = useState('');

  // Fetch a single listing based on the ID
  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const response = await axios.get(`/api/listings/${id}`);
          setListing(response.data);
        } catch (err) {
          setError('Failed to load listing');
          console.error('Error fetching listing:', err);
        }
      };

      fetchListing();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Property Details</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Listing {listing.id}</h2>
        <p>{listing.description || 'No description available'}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default PropertyDetails;
