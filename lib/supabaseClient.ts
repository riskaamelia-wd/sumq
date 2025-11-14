import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

// * Initialize Supabase client with environment variables
// ! These variables must be set in .env.local file
const supabaseUrl = config.supabase.url!;
const supabaseAnonKey = config.supabase.anonKey!;
console.log(supabaseUrl, supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase configuration missing. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
