import MovieModel from "../models/Movie.js";
import ActorModel from "../models/Actor.js";
import CrewModel from "../models/Crew.js";
import {
  handleNotFound,
  handleValidationError,
  validateIdsExist,
} from "../utils/error.js";

// =========================
// Public endpoints (no auth)
// =========================

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find().populate("actors").populate("crew");
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
    const movie = await MovieModel.findById(req.params.movieId)
      .populate("actors")
      .populate("crew");

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

// Get movie cast (actors)
export const getMovieCast = async (req, res) => {
  return getMovieEntity(req, res, "actors", "cast");
};

// Get movie crew
export const getMovieCrew = async (req, res) => {
  return getMovieEntity(req, res, "crew", "crew");
};

// =========================
// Registered User endpoints
// =========================

// Add an actor or crew to a movie
export const addEntityToMovie = async (req, res, entityType) => {
  try {
    const movieId = req.params.movieId;
    const entityId = req.body[`${entityType}Id`];

    const entityModel = entityType === "actor" ? ActorModel : CrewModel;
    const entity = await entityModel.findById(entityId);
    if (!entity) return handleNotFound(res, entityType, entityId);

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    const collection = movie[`${entityType}s`];
    if (collection.includes(entityId)) {
      return handleValidationError(
        res,
        `${
          entityType.charAt(0).toUpperCase() + entityType.slice(1)
        } ${entityId} already in movie ${movieId}`
      );
    }

    collection.push(entityId);
    await movie.save();

    return res.status(200).json({
      status: "ok",
      msg: `${capitalize(entityType)} ${entityId} added to movie ${movieId}`,
      movie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error adding ${entityType} to movie`,
    });
  }
};

// Remove an actor or crew from a movie
export const removeEntityFromMovie = async (req, res, entityType) => {
  try {
    const { movieId, entityId } = req.params;

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    const collection = movie[`${entityType}s`];
    const index = collection.indexOf(entityId);

    if (index === -1) {
      return handleNotFound(res, capitalize(entityType), entityId);
    }

    collection.splice(index, 1);
    await movie.save();

    return res.status(200).json({
      status: "ok",
      msg: `${capitalize(
        entityType
      )} ${entityId} removed from movie ${movieId}`,
      movie,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error removing ${entityType} from movie`,
    });
  }
};

// =========================
// Admin-only endpoints
// =========================

// Create a movie (Admin only)
export const createMovie = async (req, res) => {
  try {
    const { title, releaseDate, genre, plot, actors, crew } = req.body;

    const actorError = await validateIdsExist(ActorModel, actors, "Actor");
    if (actorError) return handleValidationError(res, actorError);

    const crewError = await validateIdsExist(CrewModel, crew, "Crew member");
    if (crewError) return handleValidationError(res, crewError);

    const newMovie = new MovieModel({
      title,
      releaseDate,
      genre,
      plot,
      actors: actors || [],
      crew: crew || [],
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

    const actorError = await validateIdsExist(
      ActorModel,
      updates.actors,
      "Actor"
    );
    if (actorError) return handleValidationError(res, actorError);

    const crewError = await validateIdsExist(
      CrewModel,
      updates.crew,
      "Crew member"
    );
    if (crewError) return handleValidationError(res, crewError);

    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updates, {
      new: true,
    }).populate("actors crew");

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

// =========================
// Helper functions
// =========================

// Get movie cast or crew
const getMovieEntity = async (req, res, populateField, responseKey) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId).populate(
      populateField
    );
    if (!movie) return handleNotFound(res, "Movie", req.params.movieId);

    return res.status(200).json({
      status: "ok",
      msg: `${capitalize(responseKey)} for movie ${
        req.params.movieId
      } retrieved`,
      [responseKey]: movie[populateField],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error getting ${responseKey} for movie ${req.params.movieId}`,
    });
  }
};

// Capitalize helper function
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
