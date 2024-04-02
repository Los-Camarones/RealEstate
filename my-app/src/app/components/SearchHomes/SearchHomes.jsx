import React, { useState, useEffect } from 'react';
import './SearchHomes.css'
//function for a search bar to search for homes
const SearchHomes = () => {
  const [searchQuery, setSearchQuery] = useState('');

  //needs to capture change
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //handles the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className= "search-homes">
    <form onSubmit={handleSubmit}>
      <input
        type="text" 
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search for a home"
      />
      <button type="submit" className= "search-homes button">Search</button>
    </form>
    </div>
  );
};

export default SearchHomes;
