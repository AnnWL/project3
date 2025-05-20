import express from "express";
import {
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
import { authenticateUser } from "../middleware/user.js";
//import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:movieId/reviews", getMovieReviews);
router.post("/:movieId/reviews", authenticateUser, createReview);
router.put("/reviews/:reviewId", authenticateUser, updateReview);
router.delete("/reviews/:reviewId", authenticateUser, deleteReview);

export default router;
