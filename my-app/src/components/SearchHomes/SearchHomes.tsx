import React, { useState } from 'react';
import './SearchHomes.css';
import { useRouter } from 'next/navigation';

const SearchHomes = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Router to handle navigation
  const router = useRouter();

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Encode the search query for URL usage
    const encodedSearchQuery = encodeURI(searchQuery);

    // Navigate to the search results page with the encoded query
    router.push(`/Properties/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="search-homes">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search for a home"
            className="search-input"
          />
          <button type="submit" className="search-button">
        
            {/* Uncomment and adjust if using an image icon */}
            { <img src='search-icon.jpg' alt="Search Icon" className='search-logo' /> }
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHomes;

