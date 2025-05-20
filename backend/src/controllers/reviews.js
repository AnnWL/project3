import ReviewModel from "../models/ReviewSchema.js";
import { handleValidationError, handleNotFound } from "../utils/error.js";

// Get all reviews for a movie (Public)
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      movie: req.params.movieId,
    }).populate("user", "username");
    return res.status(200).json({
      status: "ok",
      msg: `Reviews for movie ${req.params.movieId}`,
      reviews,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error retrieving reviews",
    });
  }
};

// Create review (Only registered user)
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;
    const userId = req.user.id; // need to have `req.user` from auth middleware

    // Check if review by user for movie exists
    const existing = await ReviewModel.findOne({
      movie: movieId,
      user: userId,
    });
    if (existing) {
      return handleValidationError(
        res,
        "You have already reviewed this movie."
      );
    }

    const review = new ReviewModel({
      movie: movieId,
      user: userId,
      rating,
      comment,
    });

    await review.save();

    return res.status(201).json({
      status: "ok",
      msg: "Review added",
      review,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error adding review",
    });
  }
};

// Update review (Only review owner)
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await ReviewModel.findById(reviewId);
    if (!review) return handleNotFound(res, "Review", reviewId);

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        status: "error",
        msg: "You are not authorized to update this review",
      });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    return res.status(200).json({
      status: "ok",
      msg: "Review updated",
      review,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error updating review",
    });
  }
};

// Delete review (Only review owner)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await ReviewModel.findById(reviewId);
    if (!review) return handleNotFound(res, "Review", reviewId);

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        status: "error",
        msg: "You are not authorized to delete this review",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      status: "ok",
      msg: "Review deleted",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return res.status(500).json({
      status: "error",
      msg: "Error deleting review",
    });
  }
};
