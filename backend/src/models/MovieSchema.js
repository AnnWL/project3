import mongoose from "mongoose";

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
    genre: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
    keywords: { type: [String] },
  },
  { timestamps: true, collection: "movie" }
);

export default mongoose.model("Movie", movieSchema);
