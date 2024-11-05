import { NextResponse } from "next/server";
import { randomBytes } from 'crypto'; // If using server-side Node.js

export async function POST() {

    //const token = randomBytes(32).toString('hex');
    const token = true;
    const response = NextResponse.json({ message: 'Success' });

    // Set the cookie with a 1-hour expiration
    response.headers.set(`Set-Cookie`, `userStateToken=${token}; HttpOnly; Secure; Max-Age=3600`);

    return response;
}