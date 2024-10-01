'use client';

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/Navbar/navbar';
import '../globals.css';

const Buyers = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Buyers Guide - Home Buying Process</title>
        <meta name="description" content="Learn about the home buying process, tips for first-time buyers, and resources to make informed decisions." />
      </Head>
      <NavBar />

      <div className="relative min-h-screen flex flex-col items-center justify-start text-black p-6 bg-gray-50">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/bailey-anselme-Bkp3gLygyeA-unsplash.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-8">Welcome to the Buyers Page</h1>
          <p className="text-lg mb-4">Your guide to navigating the home buying process confidently.</p>

          {/* Steps to Buy a Home */}
          <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-semibold mb-4">Steps to Buy a Home</h2>
            <ol className="list-decimal list-inside">
              <li className="mb-2">Get pre-approved for a mortgage: This helps you understand your budget and shows sellers that you are a serious buyer.</li>
              <li className="mb-2">Find the right home: Consider your needs, preferences, and location. Explore different neighborhoods.</li>
              <li className="mb-2">Make an offer: Work with your agent to present a compelling offer based on market conditions.</li>
              <li className="mb-2">Conduct inspections: Ensure the home is in good condition and identify any potential issues.</li>
              <li className="mb-2">Close the deal: Review all documents, finalize the financing, and prepare for the big day.</li>
            </ol>
          </div>

          {/* Tips for First-Time Homebuyers */}
          <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-4xl font-semibold mb-4">Tips for First-Time Homebuyers</h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                <strong>Start saving early:</strong> When calculating how much money you need to buy a house, consider one-time expenses as well as new, recurring bills. Key upfront costs include:
                <ul className="list-disc list-inside mt-2">
                  <li><strong>Down payment:</strong> Depending on your mortgage type, down payments can range from as low as 3% to 20% of the home's price.</li>
                  <li><strong>Closing costs:</strong> Typically range from 2% to 6% of the loan amount, which can add up to thousands of dollars.</li>
                  <li><strong>Move-in expenses:</strong> Don’t forget to budget for moving costs and any immediate repairs or furnishings you may need.</li>
                </ul>
              </li>
              <li className="mb-2">
                <strong>Decide how much home you can afford:</strong> Use online calculators to assess your budget based on your income, debt, and credit score.
              </li>
              <li className="mb-2">
                <strong>Check and polish your credit:</strong> Your credit score significantly influences your mortgage eligibility and interest rates. Get free copies of your credit reports, pay bills on time, and keep credit card balances low.
              </li>
              <li className="mb-2">
                <strong>Explore mortgage options:</strong> Familiarize yourself with various types of mortgages, such as FHA loans with low down payment requirements or VA loans with no down payment for veterans.
              </li>
              <li className="mb-2">
                <strong>Research first-time home buyer assistance programs:</strong> Many states offer programs that combine low-interest loans with down payment assistance, making home ownership more accessible.
              </li>
            </ul>
          </div>

          {/* The Role of a Real Estate Agent */}
          <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-semibold mb-4">The Role of a Real Estate Agent</h2>
            <p className="text-black"> {/* Ensure the paragraph text is black */}
              A real estate agent can provide invaluable assistance throughout the buying process. They can help you:
            </p>
            <ul className="list-disc list-inside mt-2 text-black"> {/* Ensure list items are black */}
              <li>Identify properties that meet your criteria and schedule viewings.</li>
              <li>Negotiate offers and counteroffers to ensure you get the best deal.</li>
              <li>Handle all necessary paperwork and ensure compliance with regulations.</li>
              <li>Provide insights into the local market and trends to make informed decisions.</li>
            </ul>
          </div>


          {/* Frequently Asked Questions */}
          <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-4xl font-semibold mb-4 text-black">Frequently Asked Questions</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-black">What should I look for when buying a home?</h3>
              <p className="text-black"> {/* Ensure the paragraph text is black */}
                Consider the location, size, amenities, and condition of the property. Think about proximity to work, schools, and public transportation.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-black">How much should I save for a down payment?</h3>
              <p className="text-black"> {/* Ensure the paragraph text is black */}
                Typically, it's recommended to save 20% of the home's purchase price, but options exist for lower down payments depending on the mortgage type.
              </p>
            </div>
          </div>


         
         
         {/* Contact Information */}
          <div className="bg-gray-200 p-4 mb-4"> {/* Removed rounded-full class */}
            <h2 className="text-3xl font-semibold mb-4 text-black">Contact Us</h2>
            <p>
              If you have any questions or want to speak with an expert, feel free to reach out to{' '}
              <a href="https://www.lourdesmendoza.com/contact" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                <strong>Lourdes</strong>
              </a>{' '}
              at <a href="https://www.lourdesmendoza.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                <strong>lourdesmendoza.com</strong>
              </a>.
            </p>
          </div>





          {/* Buttons for Property Search and Mortgage Calculator */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div>
              <button
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => router.push('/property-search')}
              >
                Listings
              </button>
              <p className="mt-2 text-white">
                Click here to explore a wide range of properties available for sale. Find your dream home today!
              </p>
            </div>

            <div>
              <a href="https://www.lourdesmendoza.com/mortgage-calculator" target="_blank" rel="noopener noreferrer">
                <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300">
                  Mortgage Calculator
                </button>
              </a>
              <p className="mt-2 text-white">
                Calculate your mortgage payments and find out how much home you can afford with our easy-to-use tool.
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-semibold mt-16 text-white">Stay Informed!</h3>
          <p className="text-white">Subscribe to receive the latest updates and resources.</p>
          <div className="mt-4 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <footer className="mt-16 text-center text-sm relative z-10">
          <p className="text-white">© 2024 Lourdes Mendoza. All Rights Reserved.</p>
          <p className="mt-4 text-white">Information sourced from <a href="https://www.nerdwallet.com/article/mortgages/tips-for-first-time-home-buyers" className="text-blue-500 hover:underline">NerdWallet</a>.</p>
        </footer>
      </div>
    </>
  );
};

export default Buyers;
