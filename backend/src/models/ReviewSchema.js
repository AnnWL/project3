import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
