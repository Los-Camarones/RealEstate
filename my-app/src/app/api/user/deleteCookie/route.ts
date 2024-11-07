import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Set the cookie with an expired `maxAge` to delete it
  res.cookies.set('userStateToken', '', {
    httpOnly: false,
    maxAge: 0,    // Expired immediately
    path: '/',    // Ensure the path matches where the cookie was set
  });
  return res;
}
