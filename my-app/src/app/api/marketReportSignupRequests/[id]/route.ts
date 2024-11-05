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

// Handle DELETE requests (Delete Market Report Signup) based on dynamic ID in URL
export async function DELETE(req: Request) {
  const token = getAuthToken(req);
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Get ID from URL path

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing Market Report Signup ID' }, { status: 400 });
  }

  try {
    // Delete the Market Report Signup with the given ID
    console.log(`https://www.idxhome.com/api/v1/client/marketReportSignups/${id}.json`);
    await axios.delete(`https://www.idxhome.com/api/v1/client/marketReportSignups/${id}.json`, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error('Error deleting Market Report Signup:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to delete Market Report Signup' }, { status: 500 });
  }
}