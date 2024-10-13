import { NextResponse } from 'next/server';
import axios from 'axios';

// Utility function to get the token from the cookie
function getAuthToken(req: Request): string | null {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;

  const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='));
  if (!tokenCookie) return null;

  const token = tokenCookie.split('=')[1];
  return token ? `Basic ${token}` : null;
}

// Handle GET requests to fetch property listings
export async function GET(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Get optional query parameters for pagination
    const offset = url.searchParams.get('offset') || '0';
    const limit = url.searchParams.get('limit') || '10';
    const fields = url.searchParams.get('fields') || '*';  // Fetch all fields by default

    // Fetch listings collection from the iHomefinder API
    const API_URL = `https://www.idxhome.com/api/v1/client/listings.json?fields=${fields}&offset=${offset}&limit=${limit}`;

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    // Return the fetched listings to the frontend
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching listings:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
