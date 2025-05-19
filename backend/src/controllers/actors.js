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
      handleValidationError("Please provide 'name' for search");
    }

    const actors = await ActorModel.find({
      name: { $regex: name, $options: "i" },
    });

    return handleResponse(res, 200, "Actors retrieved", actors, "Actors");
  } catch (error) {
    console.error(error.message);
    return handleResponse(
      res,
      error.status || 500,
      error.message || "Error searching actors"
    );
  }
};

// Get actor by Id
export const getActorById = async (req, res) => {
  try {
    const actor = await ActorModel.findById(req.params.id);
    if (!actor) {
      return res
        .status(404)
        .json({ status: "error", message: "Actor not found" });
    }
    res.json({ status: "ok", actor });
  } catch (error) {
    console.error("Error in getActorById:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get all actors
export const getAllActors = async (req, res) => {
  try {
    const actors = await ActorModel.find();
    return handleResponse(
      res,
      200,
      "Actors fetched successfully",
      actors,
      "Actors"
    );
  } catch (error) {
    console.error(error.message);
    return handleResponse(res, 400, "Error getting actors");
  }
};

// Create a new actor (Admin only)
export const createActor = async (req, res) => {
  try {
    const {
      ext_id,
      name,
      birthday,
      place_of_birth,
      nationality,
      biography,
      profile_path,
      popularity,
    } = req.body;

    if (!ext_id || !name) {
      handleValidationError("Fields 'ext_id' and 'name' are required");
    }

    const newActor = new ActorModel({
      ext_id,
      name,
      birthday,
      place_of_birth,
      nationality,
      biography,
      profile_path,
      popularity,
    });

    await newActor.save();
    return handleResponse(
      res,
      201,
      "Actor created successfully",
      newActor,
      "Actor"
    );
  } catch (error) {
    console.error(error.message);
    return handleResponse(
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
    const updates = req.body;

    const actor = await getActorById(id);

    // Update only the fields defined in schema (if provided)
    if (updates.ext_id !== undefined) actor.ext_id = updates.ext_id;
    if (updates.name !== undefined) actor.name = updates.name;
    if (updates.birthday !== undefined) actor.birthday = updates.birthday;
    if (updates.place_of_birth !== undefined)
      actor.place_of_birth = updates.place_of_birth;
    if (updates.nationality !== undefined)
      actor.nationality = updates.nationality;
    if (updates.biography !== undefined) actor.biography = updates.biography;
    if (updates.profile_path !== undefined)
      actor.profile_path = updates.profile_path;
    if (updates.popularity !== undefined) actor.popularity = updates.popularity;

    await actor.save();
    return handleResponse(
      res,
      200,
      "Actor updated successfully",
      actor,
      "Actor"
    );
  } catch (error) {
    console.error(error.message);
    return handleResponse(
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

    // Option 1: direct delete without fetching
    const deleted = await ActorModel.findByIdAndDelete(id);

    if (!deleted) {
      return handleResponse(res, 404, "Actor not found");
    }

    return handleResponse(res, 200, "Actor deleted successfully");
  } catch (error) {
    console.error(error.message);
    return handleResponse(
      res,
      error.status || 400,
      error.message || "Error deleting actor"
    );
  }
};
