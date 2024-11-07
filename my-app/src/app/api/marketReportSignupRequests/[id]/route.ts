


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

  // Ensure the token is present
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Ensure the ID is present
  if (!id) {
    return NextResponse.json({ error: 'Missing Market Report Signup ID' }, { status: 400 });
  }

  try {
    // Correct API URL for deleting a specific Market Report Signup request
    const apiUrl = `https://www.idxhome.com/api/v1/client/marketReportSignupRequest/${id}.json`;
    console.log(`API URL for DELETE: ${apiUrl}`);

    // Perform the delete request
    await axios.delete(apiUrl, {
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
    });

    return NextResponse.json(null, { status: 204 }); // No content returned after successful deletion
  } catch (error: any) {
    // Log and handle the error
    console.error('Error deleting Market Report Signup:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to delete Market Report Signup' }, { status: 500 });
  }
}
