import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    ext_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    birthday: { type: Date },
    place_of_birth: { type: String },
    nationality: { type: String },
    biography: { type: String },
    profile_path: { type: String },
    popularity: { type: Number },
  },
  { timestamps: true, collection: "actor" }
);

export default mongoose.model("Actor", actorSchema);
