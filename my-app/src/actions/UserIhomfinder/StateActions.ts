'use server';
/**
 * This file serves as a token state handler for users using Ihomefinder
 * The token is used purely as a flag to indicate whether the user is "logged in" or "logged out."
 */
import { randomBytes } from 'crypto'; // If using server-side Node.js



export async function addToken() {
    // Generate and store a simple token
    const token = generateSecureToken();
    localStorage.setItem('authUserToken', token);
    document.cookie = "authToken=" + token + "; max-age=3600; path=/; secure; samesite=strict";
    //console.log('User logged in, token stored.');
  }
  
  export async function removeToken() {
    // Remove the token to indicate logged out state
    localStorage.removeItem('authUserToken');
    console.log('User logged out, token removed.');
  }
  
  export async function isUserLoggedIn(): Promise<boolean> {
    // Check if the token exists
    return localStorage.getItem('authToken') !== null;
  }

function generateSecureToken() {
    return randomBytes(32).toString('hex'); 
}
