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

// Handle GET requests to fetch valuation requests
export async function GET(req: Request) {
  const token = getAuthToken(req);
  
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch valuation requests
    const response = await axios.get('https://www.idxhome.com/api/v1/client/valuationRequests.json', {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    // Return the valuation requests data as JSON
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching valuation requests:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch valuation requests' }, { status: 500 });
  }
}

