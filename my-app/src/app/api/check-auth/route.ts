/*
    This is an API route that checks if a user is authenticated.
    It reads the token from the cookie and validates it.
    If the token is valid, it returns { authenticated: true }.
    If the token is not valid, it returns { authenticated: false } with a 401 status code.
*/
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = cookieHeader?.split('token=')[1]?.split(';')[0];

  if (!token) {
    return NextResponse.json({ authenticated: false, error: 'Token not found' }, { status: 401 });
  }

  try {
    // Validate the Basic Auth token by sending a request to the IDXHome API
    const response = await axios.get('https://www.idxhome.com/api/v1/client.json', {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      // Successfully authenticated with IDXHome API
      const { firstName, lastName } = response.data;
      return NextResponse.json({ authenticated: true, user: { firstName, lastName } });
    } else {
      // Invalid authentication token
      return NextResponse.json({ authenticated: false, error: 'Invalid authentication token' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Authentication error during token validation:', error.response?.data || error.message);
    return NextResponse.json({ authenticated: false, error: 'Authentication failed' }, { status: 500 });
  }
}
