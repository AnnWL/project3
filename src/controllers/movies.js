import MovieModel from "../models/MovieSchema.js";
import ActorModel from "../models/ActorSchema.js";
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

    const movies = await MovieModel.find(query).populate("actors");

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
    const movies = await MovieModel.find().populate("actors");
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
    const movie = await MovieModel.findById(req.params.movieId).populate(
      "actors"
    );

    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${req.params.movieId} retrieved`,
      movie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error getting specified movie",
    });
  }
};

// =========================
// Helper functions
// =========================

// Get movie cast (actors)
export const getMovieCast = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId).populate(
      "actors"
    );
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    return res.status(200).json({
      status: "ok",
      msg: `Cast for movie ${req.params.movieId} retrieved`,
      cast: movie.actors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error getting cast for movie ${req.params.movieId}`,
    });
  }
};

// =========================
// Admin endpoints
// =========================

// Add an actor to a movie
export const addActorToMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const actorId = req.body.actorId;

    const actor = await ActorModel.findById(actorId);
    if (!actor) return handleNotFound(res, "Actor", actorId);

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    if (movie.actors.includes(actorId)) {
      return handleValidationError(
        res,
        `Actor ${actorId} already in movie ${movieId}`
      );
    }

    movie.actors.push(actorId);
    await movie.save();

    return res.status(200).json({
      status: "ok",
      msg: `Actor ${actorId} added to movie ${movieId}`,
      movie,
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

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    const index = movie.actors.indexOf(actorId);

    if (index === -1) {
      return handleNotFound(res, "Actor", actorId);
    }

    movie.actors.splice(index, 1);
    await movie.save();

    return res.status(200).json({
      status: "ok",
      msg: `Actor ${actorId} removed from movie ${movieId}`,
      movie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error removing actor from movie",
    });
  }
};

// Create a movie (Admin only)
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
      actors,
    } = req.body;

    if (!ext_id || !title) {
      return handleValidationError(res, "'ext_id' and 'title' are required");
    }

    const actorError = await validateIdsExist(ActorModel, actors, "Actor");
    if (actorError) return handleValidationError(res, actorError);

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
      actors: actors || [],
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

// Update a movie (Admin only)
export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updates = req.body;

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    // Optional: Validate actors if present
    if (updates.actors) {
      const actorError = await validateIdsExist(
        ActorModel,
        updates.actors,
        "Actor"
      );
      if (actorError) return handleValidationError(res, actorError);
    }

    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updates, {
      new: true,
    }).populate("actors");

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

// Delete a movie (Admin only)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndDelete(req.params.movieId);
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${req.params.movieId} deleted successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error deleting movie",
    });
  }
};
