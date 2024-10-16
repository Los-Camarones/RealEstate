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

// Handle GET requests (Fetch Property Listings)
export async function GET(req: Request) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch property listings (you can add pagination or fields as needed)
    const response = await axios.get('https://www.idxhome.com/api/v1/client/listings.json', {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching property listings:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch property listings' }, { status: 500 });
  }
}

// Handle POST requests (Add New Property)
export async function POST(req: Request) {
  const token = getAuthToken(req);
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Validate the request body for required fields
  if (!body.address || !body.price || !body.bedrooms) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Add a new property listing
    const response = await axios.post(`https://www.idxhome.com/api/v1/client/listings.json`, body, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating property listing:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to create property listing' }, { status: 500 });
  }
}

// Handle DELETE requests (Delete Property)
export async function DELETE(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Get ID from URL path

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing property ID' }, { status: 400 });
  }

  try {
    // Delete the property with the given ID
    await axios.delete(`https://www.idxhome.com/api/v1/client/listings.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting property listing:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to delete property listing' }, { status: 500 });
  }
}
