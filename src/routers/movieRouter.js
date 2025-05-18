import express from "express";
import {
  getAllMovies,
  getMovieById,
  getMovieCast,
  addActorToMovie,
  removeActorFromMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
} from "../controllers/movies.js";

const router = express.Router();

// Public endpoints
router.get("/search", searchMovies);
router.get("/", getAllMovies); // Get all movies
router.get("/:movieId", getMovieById); // Get movie by ID
router.get("/:movieId/cast", getMovieCast); // Get movie cast

// Registered User endpoints
router.post("/:movieId/actors", addActorToMovie); // Add actor to movie
router.delete("/:movieId/actors/:actorId", removeActorFromMovie); // Remove actor from movie

// Admin-only endpoints
router.post("/", createMovie); // Create a new movie
router.put("/:movieId", updateMovie); // Update movie
router.delete("/:movieId", deleteMovie); // Delete movie

export default router;
