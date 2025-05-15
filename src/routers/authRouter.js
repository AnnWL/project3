import express from "express";
import { register, login, refresh } from "../controllers/auth.js";
import {
  validateLoginData,
  validateRegistrationData,
} from "../validators/auth.js";
import checkError from "../validators/checkError.js";

const router = express.Router();

// Register user
router.post("/register", validateRegistrationData, checkError, register);

// Login user
router.post("/login", validateLoginData, checkError, login);

// Refresh token
router.post("/refresh", refresh);

export default router;
