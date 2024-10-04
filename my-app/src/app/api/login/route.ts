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
    // Basic auth with iHomefinder API
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const response = await axios.get('https://www.idxhome.com/api/v1/client.json', {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      const token = response.data.token; // Use the actual token key based on API response

      // Set the token as an HTTP-only cookie
      const cookie = `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`; // max-age in seconds

      const res = NextResponse.json({ success: true });
      res.headers.set('Set-Cookie', cookie);
      return res;
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
