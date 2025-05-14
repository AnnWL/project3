import CrewModel from "../models/CrewModel.js";
import { getByIdOrThrow } from "../utils/db.js";
import {
  handleResponse,
  handleNotFound,
  handleValidationError,
} from "../utils/error.js";

const getCrewById = (id) => getByIdOrThrow(CrewModel, id);

// Get all crews
export const getAllCrews = async (req, res) => {
  try {
    const crews = await CrewModel.find();
    handleResponse(res, 200, "Crews fetched successfully", crews, "Crews");
  } catch (error) {
    console.error(error.message);
    handleResponse(res, 400, "Error getting crews");
  }
};

// Create a new crew (Admin only)
export const createCrew = async (req, res) => {
  try {
    const { name, role, bio } = req.body;

    // Input validation
    if (!name || !role || !bio) {
      throw new handleValidationError(
        "All fields (name, role, bio) are required"
      );
    }

    const newCrew = new CrewModel({
      name,
      role,
      bio,
    });

    await newCrew.save();
    handleResponse(res, 201, "Crew created successfully", newCrew, "Crew");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error creating crew"
    );
  }
};

// Update a crew by ID (Admin only)
export const updateCrew = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio } = req.body;

    // Lookup crew by ID
    const crew = await getCrewById(id);

    crew.name = name || crew.name;
    crew.role = role || crew.role;
    crew.bio = bio || crew.bio;

    await crew.save();
    handleResponse(res, 200, "Crew updated successfully", crew, "Crew");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error updating crew"
    );
  }
};

// Delete a crew by ID (Admin only)
export const deleteCrew = async (req, res) => {
  try {
    const { id } = req.params;

    // Lookup and delete crew by ID
    const crew = await getCrewById(id);

    await crew.remove();
    handleResponse(res, 200, "Crew deleted successfully");
  } catch (error) {
    console.error(error.message);
    handleResponse(
      res,
      error.status || 400,
      error.message || "Error deleting crew"
    );
  }
};
