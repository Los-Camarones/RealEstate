import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // External API URL
    const apiUrl = 'https://www.idxhome.com/api/v1/client/markets.json';

    // Make a request to the external API with Basic Authentication
    const response = await axios.get(apiUrl, {
      auth: {
        username: 'lourdesmendoza1',  // Replace with your actual username
        password: 'support123',  // Replace with your actual password
      },
    });

    // Assume response.data contains the market data you need
    const marketData = response.data;

    return NextResponse.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.error();
  }
}