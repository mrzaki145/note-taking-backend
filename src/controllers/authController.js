import { supabase } from "../config/supabase.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  res.status(201).json({
    message: "User created successfully",
    user: data.user,
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 401;
    throw err;
  }

  res.json({
    message: "Signed in successfully",
    session: data.session,
    user: data.user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    const err = new Error("Not authenticated");
    err.status = 401;
    throw err;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  res.json({ message: "Password updated successfully" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  res.json({ message: "Password reset successfully" });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.CLIENT_URL}/reset-password`,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  res.json({
    message: "Password reset instructions sent to email",
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    throw new AuthError("Refresh token is required");
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    throw new AuthError("Invalid or expired refresh token");
  }

  res.json({
    message: "Token refreshed successfully",
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
    user: data.user,
  });
});
