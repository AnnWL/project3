import express from "express";
import {
  getAllMovies,
  getMovieById,
  getMovieCast,
  getMovieCrew,
  addEntityToMovie,
  removeEntityFromMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.js";

const router = express.Router();

// Public endpoints
router.get("/", getAllMovies); // Get all movies
router.get("/:movieId", getMovieById); // Get movie by ID
router.get("/:movieId/cast", getMovieCast); // Get movie cast
router.get("/:movieId/crew", getMovieCrew); // Get movie crew

// Registered User endpoints
router.post("/movies/:movieId/actors", (req, res) =>
  addEntityToMovie(req, res, "actor")
); // Add actor to movie
router.post("/movies/:movieId/crew", (req, res) =>
  addEntityToMovie(req, res, "crew")
); // Add crew to movie
router.delete("/movies/:movieId/actors/:entityId", (req, res) =>
  removeEntityFromMovie(req, res, "actor")
); // Remove actor from movie
router.delete("/movies/:movieId/crew/:entityId", (req, res) =>
  removeEntityFromMovie(req, res, "crew")
); // Remove crew from movie

// Admin-only endpoints
router.post("/movies", createMovie); // Create a new movie
router.put("/movies/:movieId", updateMovie); // Update movie
router.delete("/movies/:movieId", deleteMovie); // Delete movie

export default router;
