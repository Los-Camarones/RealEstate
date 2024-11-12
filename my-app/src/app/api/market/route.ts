// src/app/api/market/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

// Utility function to get the token from the cookie
function getAuthToken(req: Request): string | null {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;

  // Find the 'token' cookie
  const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='));
  if (!tokenCookie) return null;

  // Extract the token value
  const token = tokenCookie.split('=')[1];
  return token ? `Basic ${token}` : null;  // Return token with 'Basic ' prefix
}

export async function GET(req: Request) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch the list of markets
    const response = await axios.get('https://www.idxhome.com/api/v1/client/markets.json', {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    // Log the full response data for debugging
    console.log('External API Response:', response.data);

    const marketList = response.data.results || [];

    // Now, for each market, fetch the details
    const marketDetailsPromises = marketList.map(async (market: any) => {
      try {
        // Get the self link from the market's links
        const selfLink = market.links.find((link: any) => link.rel === 'self')?.href;
        if (!selfLink) {
          console.error('Self link not found for market:', market);
          return null;
        }

        // Fetch the market details using the self link
        const marketResponse = await axios.get(selfLink, {
          headers: {
            Authorization: token,
            Accept: 'application/json',
          },
        });

        const marketData = marketResponse.data;
        return marketData;
      } catch (err: any) {
        console.error('Error fetching market detail:', err.response?.data || err.message);
        return null; // Exclude this market if there's an error
      }
    });

    const marketDetails = await Promise.all(marketDetailsPromises);

    // Filter out any null results due to errors
    const validMarketDetails = marketDetails.filter((market) => market !== null);

    // Return the detailed market data
    return NextResponse.json(validMarketDetails);
  } catch (error: any) {
    console.error('Error fetching markets:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch markets' }, { status: 500 });
  }
}
