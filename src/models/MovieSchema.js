import mongoose from "mongoose";
import CastSchema from "./CastSchema.js";

const movieSchema = new mongoose.Schema(
  {
    ext_id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    releaseDate: { type: Date },
    runtime: { type: Number },
    description: { type: String },
    tagline: { type: String },
    collection_poster_path: { type: String },
    poster_path: { type: String },
    popularity: { type: Number },
    vote_average: { type: Number },
    vote_count: { type: Number },
    genre: { type: [String] },
    keywords: { type: [String] },
    review: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String, minlength: 5, maxlength: 500 },
      },
    ],
  },
  { timestamps: true, collection: "movie" }
);

export default mongoose.model("Movie", movieSchema);
