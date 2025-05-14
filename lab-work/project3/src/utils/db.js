import { handleNotFound } from "./error.js";

export const getByIdOrThrow = async (Model, id) => {
  const doc = await Model.findById(id);
  if (!doc) {
    // Use Model.modelName as fallback name
    const entityName = Model.modelName || "Document";
    throw new handleNotFound(entityName, id);
  }
  return doc;
};
