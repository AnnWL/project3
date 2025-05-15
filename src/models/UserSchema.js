import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    toWatch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    review: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String, minlength: 5, maxlength: 500 },
      },
    ],
  },
  { timestamps: true, collection: "user" }
);

export default mongoose.model("User", userSchema);
