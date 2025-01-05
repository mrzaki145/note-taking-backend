import { supabase } from "../config/supabase.js";

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const err = new Error("Authentication required");
    err.status = 401;
    throw err;
  }

  return user;
}
