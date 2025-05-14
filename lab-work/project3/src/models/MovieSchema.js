import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    releaseDate: { type: Date },
    genre: { type: [String] },
    director: { type: String }, //consider to change this to crew
    cast: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        score: { type: Number, min: 1, max: 10 },
        review: { type: String, minlength: 5, maxlength: 500 },
      },
    ],
  },
  { timestamps: true },
  { collection: "movie" }
);

export default mongoose.model("Movie", movieSchema);
