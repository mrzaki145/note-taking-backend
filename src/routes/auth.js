import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";

export const authRouter = express.Router();

// Sign up
authRouter.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    validateRequest,
  ],
  authController.signup
);

// Sign in
authRouter.post(
  "/signin",
  [body("email").isEmail(), body("password").notEmpty(), validateRequest],
  authController.signin
);

// Change password
authRouter.post(
  "/change-password",
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 6 }),
    validateRequest,
  ],
  authController.changePassword
);

// Reset password with token
authRouter.post(
  "/reset-password",
  [body("password").isLength({ min: 6 }), validateRequest],
  authController.resetPassword
);

// Request password reset
authRouter.post(
  "/forgot-password",
  [body("email").isEmail(), validateRequest],
  authController.forgotPassword
);

// Refresh token
authRouter.post(
  "/refresh",
  [
    body("refresh_token").notEmpty().withMessage("Refresh token is required"),
    validateRequest,
  ],
  authController.refreshToken
);
