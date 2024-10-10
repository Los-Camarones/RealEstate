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

// Handle GET requests (Fetch Subscribers)
export async function GET(req: Request) {
  const token = getAuthToken(req);

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    //To do: find a way to show all subscribers
    //pagination and fields can be passed as query parameters
    // Fetch all subscribers (with optional pagination/fields if needed look at the API documentation)
    const url = new URL(req.url);

    const id = url.searchParams.get('id');
    let API_URL: string;
    if(id) {
      API_URL = `https://www.idxhome.com/api/v1/client/subscriber/${id}.json`;
    } else {
      const offset = url.searchParams.get('offset') || '0'; // Get 'offset' from query params, default to '0'
      const limit = url.searchParams.get('limit') || '10'; // limit is defaulted to 10, unless otherwise specified
      const fields = url.searchParams.get('fields') || '*'; //fields to get specific data, otherwise get everything
      API_URL = `https://www.idxhome.com/api/v1/client/subscribers.json?fields=${fields}&offset=${offset}&limit=${limit}`;   
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching subscribers:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

// Handle POST requests (Add New Subscriber)
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
    // Add a new subscriber
    const response = await axios.post(`https://www.idxhome.com/api/v1/client/subscribers.json?emailAddress=${body.emailAddress}&firstName=${body.firstName}&lastName=${body.lastName}`, {}, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subscriber:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to create subscriber' }, { status: 500 });
  }
}

// Handle DELETE requests (Delete Subscriber)
export async function DELETE(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Get ID from URL path
  console.log('in method');


  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing subscriber ID' }, { status: 400 });
  }
  try {
    // Delete the subscriber with the given ID
    await axios.delete(`https://www.idxhome.com/api/v1/client/subscriber/${id}.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting subscriber:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
