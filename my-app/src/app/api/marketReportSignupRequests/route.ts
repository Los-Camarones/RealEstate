// /src/app/api/marketReportSignupRequests/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Utility function to get the token from the cookie
function getAuthToken(req: NextRequest): string | null {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;

  const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='));
  if (!tokenCookie) return null;

  const token = tokenCookie.split('=')[1];
  return token ? `Basic ${token}` : null; // Ensure correct format for Authorization
}

// Handle GET requests (Fetch Market Report Signups with pagination)
export async function GET(req: NextRequest) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch query params for pagination and fields
    const url = new URL(req.url);
    const offset = url.searchParams.get('offset') || '0';
    const limit = url.searchParams.get('limit') || '10';
    const fields = url.searchParams.get('fields') || '*';

    // Construct the API URL for the IDX Home request
    const API_URL = `https://www.idxhome.com/api/v1/client/marketReportSignupRequests.json?fields=${fields}&offset=${offset}&limit=${limit}`;
    console.log(`API URL for GET: ${API_URL}`);

    // Make the API call
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching market report signups:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch market report signups', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}

// Handle POST requests (Add New Market Report Signup)
export async function POST(req: NextRequest) {
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
    // Correct API URL for creating a new Market Report Signup request
    const response = await axios.post(
      `https://www.idxhome.com/api/v1/client/marketReportSignupRequests.json`,
      {
        emailAddress: body.emailAddress,
        firstName: body.firstName,
        lastName: body.lastName,
      },
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating market report signup:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create market report signup', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
