// src/utils/supabase/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Get environment variables for Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Check for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing');
}

// Create a Supabase client instance and export it as the default export
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
