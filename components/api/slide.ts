import { supabase } from "@/lib/supabaseClient";

/**
 * Fetches all slides from the Supabase database
 * @returns Array of slide objects or null if error occurs
 */
export async function getSlide() {
  try {
    const { data, error } = await supabase.from("slide").select("*");

    if (error) {
      console.error("Error fetching slides from Supabase:", error);
      throw error;
    }

    console.log("Slides fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    return null;
  }
}
