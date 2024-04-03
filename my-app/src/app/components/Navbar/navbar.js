import React from 'react';
import Link from 'next/link';


function NavBar() {
  return (
    <div className="flex items-center bg-gray-500">
      <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
        Home
      </button>

      <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
        Listings
      </button>

      <Link href = "/about">
      <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
       About Me
      </button>
      </Link>

      <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
        Sellers
      </button>

      <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
        Buyers
      </button>

        <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
            Communities
        </button>

        <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
            Properties
        </button>

        <button className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
            What's My Home Worth?
        </button>
        
    </div>
  );
}

export default NavBar;