import mongoose from "mongoose";

const castSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
    character: { type: String, required: true },
  },
  { timestamps: true, collection: "cast" }
);

// prevent duplicates of same actor in same movie
castSchema.index({ movie: 1, actor: 1 }, { unique: true });

export default mongoose.model("Cast", castSchema);
