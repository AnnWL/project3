import {
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/movies.js";
//import { protect } from "../middlewares/auth.js";

router.get("/:movieId/reviews", getMovieReviews);
router.post("/:movieId/reviews", protect, createReview);
router.put("/reviews/:reviewId", protect, updateReview);
router.delete("/reviews/:reviewId", protect, deleteReview);
