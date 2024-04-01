import React from 'react';
import Image from 'next/image';
import NavBar from './navbar'; 
import HomePageContent from './HomePageContent'; 

function Page() {
  return (
    <div> {/* Main container */}
      <div className="flex justify-between p-4 bg-gray-500 text-white">
        <div className="flex items-center">
          <button>
            <Image src="/logo_.png" alt="logo" width={150} height={150} />
          </button>
        </div>
        <NavBar />
      </div>

      <div className="home-content-wrapper"> {/* Wrapper for content below navbar */}
        <HomePageContent />
      </div>
    </div>
  );
}

export default Page;

