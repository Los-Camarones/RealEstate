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
  return token ? `Basic ${token}` : null;  // Return token with Basic auth prefix
}

// Handle GET requests (Fetch specific Listing Report Signup Request by ID)
export async function GET(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Get the ID from URL path

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing valuation request ID' }, { status: 400 });
  }

  try {
    // Fetch the specific listing report signup request with the given ID
    const response = await axios.get(`https://www.idxhome.com/api/v1/client/valuationRequest/${id}.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching valuation report request:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch valuation report request' }, { status: 500 });
  }
}



