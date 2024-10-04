/*
    This is an API route that checks if a user is authenticated.
    It reads the token from the cookie and validates it.
    If the token is valid, it returns { authenticated: true }.
    If the token is not valid, it returns { authenticated: false } with a 401 status code.
*/
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

  if (token) {
    // validate the token here
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
