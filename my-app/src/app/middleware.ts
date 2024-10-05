/*
    This is a middleware function that checks if the user is authenticated.
    If the user is not authenticated, it will redirect the user to the sign-in page.
    This middleware function is used to protect routes that require authentication.
*/
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  /*
  const role = request.cookies.get('role')?.value;  // role is stored in cookies
*/
  // Redirect if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/Sign-in', request.url));
  }

  // To do: find a way to get the role from the plugin or if Lourdes want to add an office role

  /*
  // Redirect if non-admin user tries to access admin routes
  if (request.nextUrl.pathname.startsWith('/Admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }
*/
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Admin/:path*',  // Protect all admin routes
    '/dashboard',     // Protect client dashboard
    '/settings',       // Protect client settings
  ],
};

