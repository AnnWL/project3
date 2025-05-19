import express from "express";
import {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
  getActorById,
} from "../controllers/actors.js";
import { searchActors } from "../controllers/actors.js";

const router = express.Router();

router.get("/search", searchActors);

// Get all actors
router.get("/", getAllActors);

// Get a single actor by ID
router.get("/:id", getActorById);

// Create a new actor (Admin only)
router.post("/", createActor);

// Update an actor by ID (Admin only)
router.put("/:id", updateActor);

// Delete an actor by ID (Admin only)
router.delete("/:id", deleteActor);

export default router;
