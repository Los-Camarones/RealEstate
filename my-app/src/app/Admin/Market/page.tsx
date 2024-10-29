'use client';
"use client";
import "../../globals.css";
import NavBar from "../../../components/Navbar/navbar";
import useAuth from "../../hooks/useAuth"; // Ensure user is authenticated
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MarketData {
  date: string;
  value: number;
}

interface ApiResponse {
  results: MarketData[];
}

const MarketTrends: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get<ApiResponse>('/api/market');
        console.log('API Response:', response.data); // Log the API response
        if (Array.isArray(response.data.results)) {
          setMarketData(response.data.results); // Extract the results array
        } else {
          console.error('API response is not an array:', response.data.results);
          setError('Unexpected API response format.');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError("Failed to fetch market data.");
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  console.log('Market Data:', marketData); // Log the market data state

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Market Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={marketData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketTrends;