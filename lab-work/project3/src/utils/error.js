// Custom Error Classes
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

// Helper function to handle not found errors (throwing NotFoundError)
export const handleNotFound = (resource, id) => {
  throw new NotFoundError(`${resource} ${id} not found`);
};

// Helper function to handle validation errors (throwing BadRequestError)
export const handleValidationError = (msg) => {
  throw new BadRequestError(msg);
};

// Helper function to check if actors/crew exist (throwing BadRequestError if validation fails)
export const validateIdsExist = async (Model, ids, resource) => {
  if (ids && ids.length > 0) {
    const result = await Model.find({ _id: { $in: ids } });
    if (result.length !== ids.length) {
      throw new BadRequestError(`${resource} ID(s) are invalid`);
    }
  }
  return null;
};

// Centralized function for handling responses
export const handleResponse = (
  res,
  status,
  msg,
  resource = null,
  resourceType = "Resource"
) => {
  return res.status(status).json({
    status: status === 200 ? "ok" : "error",
    msg,
    [resourceType.toLowerCase()]: resource,
  });
};
