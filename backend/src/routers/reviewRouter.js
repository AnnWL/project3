import express from "express";
import {
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
//import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:movieId/reviews", getMovieReviews);
router.post("/:movieId/reviews", createReview);
router.put("/reviews/:reviewId", updateReview);
router.delete("/reviews/:reviewId", deleteReview);

export default router;
