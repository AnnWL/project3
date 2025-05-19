import UserModel from "../models/UserSchema.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../utils/error.js";
import { getByIdOrThrow } from "../utils/db.js";

const getUserById = (id) => getByIdOrThrow(UserModel, id);

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find().select("-password"); // Exclude password for privacy
    res.status(200).json({ status: "ok", users: allUsers });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Delete a user by ID (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await getUserById(id); // Reuse helper function for validation

    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ status: "ok", msg: "User deleted successfully" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Promote user to Admin (Admin only)
export const promoteToAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id); // Reuse helper function for validation

    // If the user is already an admin, throw conflict error
    if (user.role === "admin") {
      throw new ConflictError("User is already an admin");
    }

    // Promote user to admin
    user.role = "admin";
    await user.save();

    res.status(200).json({ status: "ok", msg: "User promoted to admin" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

//registered users
// Get profile of the logged-in user
export const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id)
      .populate("favorites")
      .populate("toWatch");

    if (!user) {
      throw new NotFoundError("Profile not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Add Movie to Favorites
export const addToFavorites = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      throw new BadRequestError("Movie ID is required");
    }

    await UserModel.findByIdAndUpdate(req.user.id, {
      $addToSet: { favorites: movieId },
    });

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Add Movie to Watch List
export const addToWatchList = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      throw new BadRequestError("Movie ID is required");
    }

    await UserModel.findByIdAndUpdate(req.user.id, {
      $addToSet: { toWatch: movieId },
    });

    res.status(200).json({ message: "Movie added to watch list" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

//register user
