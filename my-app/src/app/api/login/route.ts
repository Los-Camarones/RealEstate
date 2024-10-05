/*
    This is an example of a login route that authenticates a user with the iHomefinder API.
    The API requires basic authentication with a username and password.
    If the user is authenticated, a token is returned, which is then set as an HTTP-only cookie.
    The token is used to authenticate subsequent requests to the API.
    */
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    // Create Basic Auth token
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    // Send a request to iHomefinder API for authentication
    const response = await axios.get('https://www.idxhome.com/api/v1/client.json', {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      // Ideally, iHomefinder should return a token. Fallback to the Base64 string (auth) if not provided
      const token = response.data.token || auth; 

      // Set the token as an HTTP-only cookie (ensure Secure in production)
      const cookie = `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`; // max-age = 1 hour

      const res = NextResponse.json({ success: true });
      res.headers.set('Set-Cookie', cookie); // Set HTTP-only cookie

      return res;
    } else {
      // Invalid credentials scenario
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error: any) {
    // Log the full error details for better debugging
    console.error('Authentication error:', error.response?.data || error.message);

    // Handle authentication failure
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
