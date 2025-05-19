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
    genre: { type: [String] },
    keywords: { type: [String] },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }], // <-- Add this
    // Optional: remove 'review' here if you're using a separate ReviewModel
  },
  { timestamps: true, collection: "movie" }
);

export default mongoose.model("Movie", movieSchema);
