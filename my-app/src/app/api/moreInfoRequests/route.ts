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

// Handle GET requests (Fetch Listing Report Signup Requests)
export async function GET(req: Request) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Pagination and fields can be passed as query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    let API_URL: string;

    if (id) {
      // Fetch specific listing report signup request by ID
      API_URL = `https://www.idxhome.com/api/v1/client/moreInfoRequest/{moreInfoRequestId}.json`;
    } else {
      // Fetch all listing report signup requests with optional pagination/fields
      const offset = url.searchParams.get('offset') || '0'; // Default offset to '0'
      const limit = url.searchParams.get('limit') || '10'; // Default limit to '10'
      const fields = url.searchParams.get('fields') || '*'; // Default to all fields

      // Construct the API URL with pagination and fields
      API_URL = `https://www.idxhome.com/api/v1/client/moreInfoRequests.json?fields=${fields}&offset=${offset}&limit=${limit}`;
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching more info requests:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch more info requests' }, { status: 500 });
  }
}

// Handle POST requests (Add New Listing Report Signup Request)
export async function POST(req: Request) {
  const token = getAuthToken(req);
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Validate the request body for required fields
  if (!body.emailAddress || !body.firstName || !body.lastName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Add a new listing report signup request
    const response = await axios.post(`https://www.idxhome.com/api/v1/client/moreInfoRequests.json`, {
      emailAddress: body.emailAddress,
      firstName: body.firstName,
      lastName: body.lastName,
    }, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating more info request:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to create more info request' }, { status: 500 });
  }
}