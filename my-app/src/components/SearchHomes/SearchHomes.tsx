import React, { useState, useEffect } from 'react';
import './SearchHomes.css';
import { useRouter } from 'next/navigation';
// Import Boxicons CSS
import 'boxicons/css/boxicons.min.css';

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

    // Directly navigate to a specified URL
    window.location.href = `https://www.lourdesmendoza.com/valuation`; // Replace with your desired base URL
  };

  //TODO: Fix this code because it duplicates twice. Not sure if its necessary because it works without it.
  // UseEffect to inject the script into the component after it mounts
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.innerHTML = `
  //     document.currentScript.replaceWith(ihfKestrel.render({
  //       "component": "valuationFormWidget",
  //       "style": "twoline"
  //     }));
  //   `;
  //   document.body.appendChild(script);

  //   // Cleanup function
  //   return () => {
  //     if (document.body.contains(script)) {
  //       document.body.removeChild(script); // Only remove the script if it still exists
  //     }
  //   };
  // }, []); // Empty dependency array ensures this runs only after the component mounts

  return (
    <div className="search-homes">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="What is the Value of my House?"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className='bx bx-search-alt-2 search-icon'></i>
          </button>
        </div>
      </form>
      <div id="valuationFormWidgetContainer"></div>
    </div>
  );
};

export default SearchHomes;
