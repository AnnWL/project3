import MovieModel from "../models/MovieSchema.js";
import ActorModel from "../models/ActorSchema.js";
import CastModel from "../models/CastSchema.js";
import {
  handleNotFound,
  handleValidationError,
  validateIdsExist,
} from "../utils/error.js";

// =========================
// Public endpoints (no auth)
// =========================

// Search movies by keyword in title/description or by genre
export const searchMovies = async (req, res) => {
  try {
    const { keyword, genre } = req.query;

    const query = {};
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    if (!keyword && !genre) {
      return handleValidationError(
        res,
        "Please provide 'keyword' or 'genre' for search"
      );
    }

    const movies = await MovieModel.find(query);
    return res.status(200).json({
      status: "ok",
      msg: "Movies retrieved",
      movies,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error searching movies",
    });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json({
      status: "ok",
      msg: "Listing all movies",
      movies,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error retrieving movies",
    });
  }
};

// Get a movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    const cast = await CastModel.find({ movie: movie._id }).populate("actor");

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${req.params.movieId} retrieved`,
      movie,
      cast,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error getting specified movie",
    });
  }
};

// Get movie cast
export const getMovieCast = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    const cast = await CastModel.find({ movie: movie._id }).populate("actor");

    return res.status(200).json({
      status: "ok",
      msg: `Cast for movie ${req.params.movieId} retrieved`,
      cast,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error getting cast for movie ${req.params.movieId}`,
    });
  }
};

// Get all unique genres from movies
export const getGenres = async (req, res) => {
  try {
    const movies = await MovieModel.find({}, { genre: 1 }); // get only genre field

    // Flatten all genres and extract names
    const allGenreNames = movies
      .flatMap((movie) => movie.genre || [])
      .map((g) => g.name)
      .filter(Boolean); // remove null/undefined

    // Remove duplicates
    const uniqueGenreNames = [...new Set(allGenreNames)].sort();

    return res.status(200).json({
      status: "ok",
      genres: uniqueGenreNames,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Failed to fetch genres" });
  }
};

// =========================
// Admin endpoints
// =========================

// Add an actor to a movie (via Cast model)
export const addActorToMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { actorId, character } = req.body;

    const [movie, actor] = await Promise.all([
      MovieModel.findById(movieId),
      ActorModel.findById(actorId),
    ]);

    if (!movie) return handleNotFound(res, "Movie", movieId);
    if (!actor) return handleNotFound(res, "Actor", actorId);
    if (!character)
      return handleValidationError(res, "'character' is required");

    const existing = await CastModel.findOne({
      movie: movieId,
      actor: actorId,
    });
    if (existing) {
      return handleValidationError(
        res,
        `Actor ${actorId} already cast in movie ${movieId}`
      );
    }

    const cast = new CastModel({ movie: movieId, actor: actorId, character });
    await cast.save();

    return res.status(201).json({
      status: "ok",
      msg: `Actor ${actorId} added to movie ${movieId} as ${character}`,
      cast,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error adding actor to movie",
    });
  }
};

// Remove an actor from a movie
export const removeActorFromMovie = async (req, res) => {
  try {
    const { movieId, actorId } = req.params;

    const deleted = await CastModel.findOneAndDelete({
      movie: movieId,
      actor: actorId,
    });

    if (!deleted) {
      return handleNotFound(res, "Cast entry", `${movieId}-${actorId}`);
    }

    return res.status(200).json({
      status: "ok",
      msg: `Actor ${actorId} removed from movie ${movieId}`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error removing actor from movie",
    });
  }
};

// Create a movie (no cast added here)
export const createMovie = async (req, res) => {
  try {
    const {
      ext_id,
      title,
      releaseDate,
      runtime,
      description,
      tagline,
      collection_poster_path,
      poster_path,
      popularity,
      vote_average,
      vote_count,
      genre,
      keywords,
    } = req.body;

    if (!ext_id || !title) {
      return handleValidationError(res, "'ext_id' and 'title' are required");
    }

    const newMovie = new MovieModel({
      ext_id,
      title,
      releaseDate,
      runtime,
      description,
      tagline,
      collection_poster_path,
      poster_path,
      popularity,
      vote_average,
      vote_count,
      genre,
      keywords,
    });

    await newMovie.save();

    return res.status(201).json({
      status: "ok",
      msg: "Movie created successfully",
      movie: newMovie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error creating new movie",
    });
  }
};

// Update a movie
export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updates = req.body;

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updates, {
      new: true,
    });

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${movieId} updated successfully`,
      movie: updatedMovie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error updating movie",
    });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndDelete(req.params.movieId);
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    // Clean up related cast entries
    await CastModel.deleteMany({ movie: req.params.movieId });

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${req.params.movieId} and related cast deleted successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error deleting movie",
    });
  }
};
