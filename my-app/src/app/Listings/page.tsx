"use client";

import { useEffect, useState } from 'react';
import NavBar from "../../components/Navbar/navbar";
import "../globals.css";

const Listing = () => {
  const [listings, setListings] = useState<any[]>([]); // Ensure listings is an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        console.log('Fetched listings:', data); // Log the response
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        setError('Failed to fetch listings');
      }
    }

    fetchListings();
  }, []);

  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.innerHTML = `document.currentScript.replaceWith(ihfKestrel.render());`;
    
    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function: only remove the script if it is still a child of the body
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
        <h1>Home Listing</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {Array.isArray(listings) && listings.map((listing: any) => ( // Ensure listings is an array
              <li key={listing.id}>
                {listing.name} - ${listing.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Listing;
