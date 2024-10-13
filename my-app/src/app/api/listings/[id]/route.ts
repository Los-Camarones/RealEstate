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

// Handle GET request to fetch a single property listing by ID
export async function GET(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Extract the listing ID from the URL

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing listing ID' }, { status: 400 });
  }

  try {
    // Fetch the single listing from the iHomefinder API using the listing ID
    const API_URL = `https://www.idxhome.com/api/v1/client/listing/${id}.json`;

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    // Return the fetched listing data
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching listing:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}
