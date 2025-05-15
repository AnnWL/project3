import ActorModel from "../models/ActorSchema.js";
import { getByIdOrThrow } from "../utils/db.js";
import {
  handleResponse,
  handleNotFound,
  handleValidationError,
} from "../utils/error.js";

// Search actors by name
export const searchActors = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return handleValidationError(res, "Please provide 'name' for search");
    }

    const actors = await ActorModel.find({
      name: { $regex: name, $options: "i" },
    });

    return res.status(200).json({
      status: "ok",
      msg: "Actors retrieved",
      actors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      msg: "Error searching actors",
    });
  }
};

const getActorById = (id) => getByIdOrThrow(ActorModel, id);

// Get all actors
export const getAllActors = async (req, res) => {
  try {
    const actors = await ActorModel.find();
    handleResponse(res, 200, "Actors fetched successfully", actors, "Actors");
  } catch (error) {
    console.error(error.message);
    handleResponse(res, 400, "Error getting actors");
  }
};

// Create a new actor (Admin only)
export const createActor = async (req, res) => {
  try {
    const { name, age, bio } = req.body;

    // Input validation
    if (!name || !age || !bio) {
      throw new handleValidationError(
        "All fields (name, age, bio) are required"
      );
    }

    const newActor = new ActorModel({
      name,
      age,
      bio,
    });

    await newActor.save();
    handleResponse(res, 201, "Actor created successfully", newActor, "Actor");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error creating actor"
    );
  }
};

// Update an actor by ID (Admin only)
export const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, bio } = req.body;

    // Lookup actor by ID
    const actor = await getActorById(id);

    actor.name = name || actor.name;
    actor.age = age || actor.age;
    actor.bio = bio || actor.bio;

    await actor.save();
    handleResponse(res, 200, "Actor updated successfully", actor, "Actor");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error updating actor"
    );
  }
};

// Delete an actor by ID (Admin only)
export const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;

    // Lookup and delete actor by ID
    const actor = await getActorById(id);

    await actor.remove();
    handleResponse(res, 200, "Actor deleted successfully");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error deleting actor"
    );
  }
};
