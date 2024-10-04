/*
    This is a middleware function that checks if the user is authenticated.
    If the user is not authenticated, it will redirect the user to the sign-in page.
    This middleware function is used to protect routes that require authentication.
*/
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/Sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile'], // Add any protected routes here
};
