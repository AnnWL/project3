import express from "express";
import {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
} from "../controllers/actor.js";

const router = express.Router();

// Get all actors
router.get("/", getAllActors);

// Create a new actor (Admin only)
router.post("/", createActor);

// Update an actor by ID (Admin only)
router.put("/:id", updateActor);

// Delete an actor by ID (Admin only)
router.delete("/:id", deleteActor);

export default router;
