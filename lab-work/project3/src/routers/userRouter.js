import express from "express";
import {
  getAllUsers,
  deleteUser,
  promoteToAdmin,
  getProfile,
  addToFavorites,
  addToWatchList,
} from "../controllers/users.js";

const router = express.Router();

// Public routes
router.get("/profile", getProfile); // Get logged-in user's profile

// User routes
router.post("/favorites", addToFavorites); // Add movie to favorites
router.post("/watchlist", addToWatchList); // Add movie to watch list

// Admin routes (to add middleware later on)
router.get("/", getAllUsers); // Get all users (Admin only)
router.delete("/:id", deleteUser); // Delete user by ID (Admin only)
router.put("/:id/promote", promoteToAdmin); // Promote user to admin (Admin only)

export default router;
