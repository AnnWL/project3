import UserModel from "../models/User.js";
import MovieModel from "../models/Movie.js";
import { handleNotFound, handleValidationError } from "../utils/error.js";

// Get user's favorite movies
export const getFavorites = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).populate(
      "favorites"
    );
    if (!user) return handleNotFound(res, "User", req.params.userId);

    return res.status(200).json({
      status: "ok",
      msg: "Favorites retrieved successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error retrieving favorites",
    });
  }
};

// Add a movie to favorites
export const addFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) return handleNotFound(res, "User", userId);

    const movie = await MovieModel.findById(movieId);
    if (!movie) return handleNotFound(res, "Movie", movieId);

    if (user.favorites.some((fav) => fav.toString() === movieId)) {
      return handleValidationError(
        res,
        `Movie ${movieId} is already in favorites`
      );
    }

    user.favorites.push(movieId);
    await user.save();
    await user.populate("favorites");

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${movieId} added to favorites`,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error adding to favorites",
    });
  }
};

// Remove a movie from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) return handleNotFound(res, "User", userId);

    if (!user.favorites.some((fav) => fav.toString() === movieId)) {
      return handleNotFound(res, "Favorite movie", movieId);
    }

    user.favorites = user.favorites.filter((fav) => fav.toString() !== movieId);
    await user.save();
    await user.populate("favorites");

    return res.status(200).json({
      status: "ok",
      msg: `Movie ${movieId} removed from favorites`,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error removing from favorites",
    });
  }
};
