import React, { useState, useEffect } from 'react';
import './SearchHomes.css'
import { useRouter } from 'next/navigation';
import searchIcon from '../../../../public/searchIcon.svg'
/*
  Function for a search bar to search for homes
*/
const SearchHomes = () => {
  
  //create variable searchQuery using the useState hook, empty initiliazation
  //create function setSearchQuery to update searchQuery
  const [searchQuery, setSearchQuery] = useState('');

  //create a router so that all inputs are directed to the appropriate page from NEXTjs
  const router = useRouter();

  //needs to capture change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //handles submission of an input
  const handleSubmit = (event: React.FormEvent) => {

    //do not refresh page
    event.preventDefault();

    //when a user searches a home, we need to encode the search query
    const encodedSearchQuery = encodeURI(searchQuery);

    console.log("encoded:" ,encodedSearchQuery);

    //push the input to the URL
    router.push('/Properties/search?q=${encodedSerachQuery}');
  };

  return (
    <div className="search-homes">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Enter City,Zip,County, Neighboorhood"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className='search-icon'></i>
            {/*<img src={searchIcon} alt="Search Icon" className='search-logo' />}*/}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHomes;

