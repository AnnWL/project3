import mongoose, { Schema } from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    releaseDate: { type: Date },
    genre: { type: [String] },
    keywords: { type: [String] },
    crew: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crew" }],
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String, minlength: 5, maxlength: 500 },
      },
    ],
  },
  { timestamps: true },
  { collection: "movie" }
);

export default mongoose.model("Movie", movieSchema);
