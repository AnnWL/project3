import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    biography: { type: String },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true },
  { collection: "actor" }
);

export default mongoose.model("Actor", actorSchema);
