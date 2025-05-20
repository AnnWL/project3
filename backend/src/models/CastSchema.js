// import mongoose from "mongoose";

// const castSchema = new mongoose.Schema(
//   {
//     movie: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Movie",
//       required: true,
//     },
//     actor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Actor",
//       required: true,
//     },
//     character: { type: String, required: true },
//   },
//   { timestamps: true, collection: "cast" }
// );

// // prevent duplicates of same actor in same movie
// castSchema.index({ movie: 1, actor: 1 }, { unique: true });

// export default mongoose.model("Cast", castSchema);

import mongoose from "mongoose";

const individualCastSchema = new mongoose.Schema(
  {
    ext_id: Number,
    name: String,
    original_name: String,
    character: String,
    credit_id: String,
    profile_path: String,
    order: Number,
    popularity: Number,
  },
  { _id: false }
);

const castSchema = new mongoose.Schema(
  {
    ext_id: { type: Number, required: true, unique: true },
    cast: [individualCastSchema],
  },
  { timestamps: true, collection: "cast" }
);

export default mongoose.model("Cast", castSchema);
