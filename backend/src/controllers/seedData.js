import UserModel from "../models/UserSchema.js";
import MovieModel from "../models/MovieSchema.js";
import ActorModel from "../models/ActorSchema.js";
// import CrewModel from "../models/CrewSchema.js";

// Helper function to create users
const createUsers = async () => {
  const users = await UserModel.insertMany([
    {
      username: "Ann",
      email: "ann@example.com",
      password: "password123",
      role: "admin",
    },
    {
      username: "Jynn",
      email: "jynn@example.com",
      password: "password456",
      role: "admin",
    },
    {
      username: "Fai",
      email: "fai@example.com",
      password: "password789",
      role: "user",
    },
  ]);
  return users;
};

// Helper function to create actors with ext_id
const createActors = async () => {
  const actors = await ActorModel.insertMany([
    {
      ext_id: 65731,
      name: "Sam Worthington",
      birthday: "1976-08-02",
      place_of_birth: "Godalming, Surrey, England, UK",
      nationality: "Australian",
      biography:
        "Samuel Henry John Worthington is an Australian actor renowned for his role as Jake Sully in the Avatar franchise (2009–present)...",
      profile_path: "/6SGb5R9wmbQNpQIzuNcL5dCCAcq.jpg",
      popularity: 37.231,
    },
    {
      ext_id: 8691,
      name: "Zoe Saldaña",
      birthday: "1978-06-19",
      place_of_birth: "Passaic, New Jersey, USA",
      nationality: "American",
      biography:
        "Zoë Yadira Saldaña-Perego is an American actress. She is best known for her roles in major film franchises...",
      profile_path: "/iOVbUH20il632nj2v01NCtYYeSg.jpg",
      popularity: 51.191,
    },
    {
      ext_id: 10205,
      name: "Sigourney Weaver",
      birthday: "1949-10-08",
      place_of_birth: "Manhattan, New York City, New York, USA",
      nationality: "American",
      biography:
        'Susan Alexandra "Sigourney" Weaver is an American actress. She is regarded as a science fiction icon...',
      profile_path: "/7e6D41Ip7eM23zkeJCRrYYD1ZUw.jpg",
      popularity: 37.899,
    },
    {
      ext_id: 11164,
      name: "Stephen Lang",
      birthday: "1952-07-11",
      place_of_birth: "Manhattan, New York City, New York, USA",
      nationality: "American",
      biography:
        "Stephen Lang is an American actor and playwright. He is known for roles in films such as Avatar (2009)...",
      profile_path: "/vAzlR5nPuCXUxfj4Wr3Ay3epYGR.jpg",
      popularity: 31.579,
    },
    {
      ext_id: 2231,
      name: "Johnny Depp",
      birthday: "1963-06-09",
      place_of_birth: "Owensboro, Kentucky, USA",
      nationality: "American",
      biography:
        "Johnny Depp is an American actor, producer, and musician. He began his career in television before gaining fame...",
      profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
      popularity: 42.317,
    },
    {
      ext_id: 504,
      name: "Orlando Bloom",
      birthday: "1977-01-13",
      place_of_birth: "Canterbury, Kent, England, UK",
      nationality: "British",
      biography:
        "Orlando Bloom is an English actor best known for his roles as Legolas in the 'Lord of the Rings'...",
      profile_path: "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
      popularity: 28.452,
    },
    {
      ext_id: 1336,
      name: "Keira Knightley",
      birthday: "1985-03-26",
      place_of_birth: "Teddington, Middlesex, England, UK",
      nationality: "British",
      biography:
        "Keira Knightley is a British actress who gained worldwide fame for her roles in period dramas and romantic films...",
      profile_path: "/4U9G4YwTlIEb4f8dTXsWx7b4rY2.jpg",
      popularity: 26.185,
    },
    {
      ext_id: 2834,
      name: "Chow Yun-fat",
      birthday: "1955-05-18",
      place_of_birth: "Lamma Island, British Hong Kong",
      nationality: "Hong Kong",
      biography:
        "Chow Yun-fat is a Hong Kong actor known for his charismatic presence and iconic roles in both Hong Kong and Hollywood films...",
      profile_path: "/rF4cbkBocbFSGV1LEHwwicTtNJI.jpg",
      popularity: 15.678,
    },
    {
      ext_id: 2524,
      name: "Geoffrey Rush",
      birthday: "1951-07-06",
      place_of_birth: "Toowoomba, Queensland, Australia",
      nationality: "Australian",
      biography:
        "Geoffrey Rush is an Australian actor and film producer, acclaimed for his performances on stage and screen...",
      profile_path: "/9BVJCEvIQJHZdmPEprDaC5Hzd6R.jpg",
      popularity: 20.332,
    },
  ]);
  return actors;
};

// Helper function to create movies with cast referencing ext_id of actors
const createMovies = async () => {
  await MovieModel.insertMany([
    {
      ext_id: 19995,
      title: "Avatar",
      releaseDate: new Date("2009-10-12"),
      runtime: 162,
      description:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      tagline: "Enter the World of Pandora.",
      budget: 237000000,
      revenue: 2787965087,
      poster_path: "/kmcqlZGaSh20zpTbuoF0F4B2Npr.jpg",
      popularity: 150.437577,
      vote_average: 7.2,
      vote_count: 11800,
      genre: ["Action", "Adventure", "Fantasy", "Science Fiction"],
      keywords: ["pandora", "marine", "avatar", "alien", "space"],
      cast: [
        { actor_ext_id: 65731, character: "Jake Sully" },
        { actor_ext_id: 8691, character: "Neytiri" },
        { actor_ext_id: 10205, character: "Dr. Grace Augustine" },
        { actor_ext_id: 11164, character: "Col. Miles Quaritch" },
      ],
    },
    {
      ext_id: 45325,
      title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      releaseDate: new Date("2003-07-09"),
      runtime: 143,
      description:
        "Jack Sparrow and Will Turner seek to rescue Elizabeth Swann from cursed pirates who are immortal by night.",
      tagline: "Prepare to be blown out of the water.",
      budget: 140000000,
      revenue: 654264015,
      poster_path: "/fHWqsjGe0v8HBvzeCY9C2k9cpMJ.jpg",
      popularity: 100.125,
      vote_average: 7.9,
      vote_count: 11000,
      genre: ["Action", "Adventure", "Fantasy"],
      keywords: ["pirates", "curse", "black pearl", "pirate ship", "treasure"],
      cast: [
        { actor_ext_id: 2231, character: "Jack Sparrow" },
        { actor_ext_id: 504, character: "Will Turner" },
        { actor_ext_id: 1336, character: "Elizabeth Swann" },
        { actor_ext_id: 2834, character: "Captain Sao Feng" },
        { actor_ext_id: 2524, character: "Barbossa" },
      ],
    },
  ]);
};

const seedData = async () => {
  try {
    await UserModel.deleteMany({});
    await ActorModel.deleteMany({});
    await MovieModel.deleteMany({});

    await createUsers();
    await createActors();
    await createMovies();

    console.log("Database seeded successfully with ext_id references!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

export default seedData;
