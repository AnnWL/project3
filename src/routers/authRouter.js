import express from "express";
import { register, login, refresh } from "../controllers/auth.js";

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Refresh token
router.post("/refresh", refresh);

export default router;
