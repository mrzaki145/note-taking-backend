import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/errors.js";

export async function getUserTags(userId) {
  const { data, error } = await supabase
    .from("notes")
    .select("tags")
    .eq("user_id", userId);

  if (error) throw new AppError(error.message, 400);

  const uniqueTags = [...new Set(data.flatMap((note) => note.tags || []))];

  return uniqueTags.sort();
}
