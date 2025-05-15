import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorites.js";

const router = express.Router();

router.get("/users/:userId/favorites", getFavorites);
router.post("/users/:userId/favorites/:movieId", addFavorite);
router.delete("/users/:userId/favorites/:movieId", removeFavorite);

export default router;
