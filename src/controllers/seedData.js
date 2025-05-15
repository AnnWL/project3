import UserModel from "../models/UserSchema.js";
import MovieModel from "../models/MovieSchema.js";
import ActorModel from "../models/ActorSchema.js";
import CrewModel from "../models/CrewSchema.js";

// Helper function to create users
const createUsers = async () => {
  const users = await UserModel.insertMany([
    { username: "john", email: "john@example.com", password: "hashed123" },
    {
      username: "admin",
      email: "admin@example.com",
      password: "hashed456",
      role: "admin",
    },
  ]);
  return users;
};

// Helper function to create actors
const createActors = async () => {
  const actors = await ActorModel.insertMany([
    { name: "Robert Downey Jr.", age: 58, bio: "Iron Man actor" },
    { name: "Scarlett Johansson", age: 39, bio: "Black Widow actress" },
  ]);
  return actors;
};

// Helper function to create crew members
const createCrew = async () => {
  const crewMembers = await CrewModel.insertMany([
    { name: "Jon Favreau", role: "Director" },
    { name: "Joss Whedon", role: "Director" },
  ]);
  return crewMembers;
};

// Helper function to create movies
const createMovies = async (actors, crew) => {
  await MovieModel.insertMany([
    {
      title: "Iron Man",
      description: "Marvel movie",
      releaseDate: new Date("2008-05-02"),
      actors: [actors[0]._id],
      crew: [crew[0]._id],
    },
    {
      title: "Avengers",
      description: "Team-up movie",
      releaseDate: new Date("2012-05-04"),
      actors: [actors[0]._id, actors[1]._id],
      crew: [crew[1]._id],
    },
  ]);
};

export const seedData = async () => {
  try {
    // Clear existing data
    await UserModel.deleteMany();
    await MovieModel.deleteMany();
    await ActorModel.deleteMany();
    await CrewModel.deleteMany();

    // Seed data
    const users = await createUsers();
    const actors = await createActors();
    const crew = await createCrew();
    await createMovies(actors, crew);

    console.log("✅ Seed data inserted successfully");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};
