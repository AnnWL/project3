import mongoose from "mongoose";

const crewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    biography: { type: String },
    gender: { type: Number }, // 0 for unknown, 1 for female, 2 for male
    profilePath: { type: String }, // URL to profile image
    department: { type: String }, // Primary department (Directing, Writing, etc.)
    knownFor: [{ type: String }], // Common jobs (Director, Screenplay, etc.)
    // movies: [{
    //   movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    //   movieId: { type: String },
    //   job: { type: String },
    //   department: { type: String }
    // }]
  },
  {
    timestamps: true,
    collection: "crew",
  }
);

export default mongoose.model("Crew", crewSchema);
