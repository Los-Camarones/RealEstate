/*
    This file is used to define the route for the logout API endpoint.
    It is used to clear the token cookie when the user logs out.
*/
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Clear the token by setting an expired cookie
  res.headers.set('Set-Cookie', 'userStateToken=; Max-Age=0; Path=/');
  return res;
}
