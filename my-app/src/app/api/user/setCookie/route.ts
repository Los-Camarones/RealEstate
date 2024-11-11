import { NextResponse } from "next/server";
import { randomBytes } from 'crypto'; // If using server-side Node.js

export async function POST() {

    //const token = randomBytes(32).toString('hex');
    const token = true;
    const response = NextResponse.json({ message: 'Success' });

    // Set the cookie with a 1-hour expiration
    response.cookies.set('userStateToken', 'true', {
        maxAge: 60 * 60,  // 1 hour
        httpOnly: false,    // Makes the cookie accessible by client
        path: '/',
      });
    return response;
}