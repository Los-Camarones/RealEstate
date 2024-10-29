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

// Handle GET requests (Fetch Open Home Report Signup by ID)
export async function GET(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Get the signup ID from URL path

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing signup ID' }, { status: 400 });
  }

  try {
    // Fetch the specific open home report signup with the given ID
    const response = await axios.get(`https://www.idxhome.com/api/v1/client/openHomeReportSignup/${id}.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching open home report signup:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch open home report signup' }, { status: 500 });
  }
}

// Handle DELETE requests (Delete Open Home Report Signup) based on dynamic ID in URL
export async function DELETE(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();  // Get the signup ID from URL path

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing signup ID' }, { status: 400 });
  }

  try {
    // Delete the open home report signup with the given ID
    await axios.delete(`https://www.idxhome.com/api/v1/client/openHomeReportSignup/${id}.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting open home report signup:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to delete open home report signup' }, { status: 500 });
  }
}
