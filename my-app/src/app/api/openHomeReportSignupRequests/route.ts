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

// Handle GET requests (Fetch Open Home Report Signups)
export async function GET(req: Request) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);

    const id = url.searchParams.get('id');
    let API_URL: string;
    if (id) {
      API_URL = `https://www.idxhome.com/api/v1/client/openHomeReportSignup/{openHomeReportSignupRequestId}.json`;
    } else {
      const offset = url.searchParams.get('offset') || '0'; // Get 'offset' from query params, default to '0'
      const limit = url.searchParams.get('limit') || '10'; // Limit is defaulted to 10, unless otherwise specified
      const fields = url.searchParams.get('fields') || '*'; // Fields to get specific data, otherwise get everything
      API_URL = `https://www.idxhome.com/api/v1/client/openHomeReportSignups.json?fields=${fields}&offset=${offset}&limit=${limit}`;
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching open home report signups:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch open home report signups' }, { status: 500 });
  }
}

// Handle POST requests (Add New Open Home Report Signup)
export async function POST(req: Request) {
  const token = getAuthToken(req);
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Validate the request body for required fields
  if (!body.firstName || !body.lastName || !body.emailAddress) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Add a new open home report signup
    const response = await axios.post(`https://www.idxhome.com/api/v1/client/openHomeReportSignups.json`, {
      emailAddress: body.emailAddress,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone || '', // Optional field
    }, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating open home report signup:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to create open home report signup' }, { status: 500 });
  }
}