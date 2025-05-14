import mongoose from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    toWatch: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true },
  { collection: "user" }
);

export default mongoose.model("User", userSchema);
