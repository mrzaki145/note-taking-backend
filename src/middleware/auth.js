import { supabase } from "../config/supabase.js";
import { AuthError } from "../utils/errors.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AuthError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new AuthError("Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AuthError("Authentication failed"));
  }
};
