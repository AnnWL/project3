import express from "express";
import {
  getAllCrews,
  createCrew,
  updateCrew,
  deleteCrew,
} from "../controllers/crew.js";

const router = express.Router();

// Get all crews
router.get("/", getAllCrews);

// Create a new crew (Admin only)
router.post("/", createCrew);

// Update a crew by ID (Admin only)
router.put("/:id", updateCrew);

// Delete a crew by ID (Admin only)
router.delete("/:id", deleteCrew);

export default router;
