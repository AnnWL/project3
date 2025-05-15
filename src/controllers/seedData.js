import UserModel from "../models/UserSchema.js";
import MovieModel from "../models/MovieSchema.js";
import ActorModel from "../models/ActorSchema.js";
import CrewModel from "../models/CrewSchema.js";

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

// Helper function to create movies
const createMovies = async (actors, crew) => {
  await MovieModel.insertMany([
    {
      kaggle_id: 19995,
      title: "Avatar",
      releaseDate: new Date("10/12/2009"),
      runtime: 162,
      description:
        "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
      tagline: "Enter the World of Pandora.",
      collection_poster_path: "/nslJVsO58Etqkk17oXMuVK4gNOF.jpg",
      poster_path: "/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg",
      popularity: 150.437577,
      vote_average: 7.2,
      vote_count: 11800,
      genres: ["Action", "Adventure", "Fantasy", "Science Fiction"],
      keywords: [
        "culture clash",
        "future",
        "space war",
        "space colony",
        "society",
        "space travel",
        "futuristic",
        "romance",
        "space",
        "alien",
        "tribe",
        "alien planet",
        "cgi",
        "marine",
        "soldier",
        "battle",
        "anti war",
        "power relations",
        "mind and soul",
        "3d",
      ],
      cast: [
        {
          cast_id: 242,
          character: "Jake Sully",
          id: 65731,
          name: "Sam Worthington",
          profile_path: "/6SGb5R9wmbQNpQIzuNcL5dCCAcq.jpg",
        },
        {
          cast_id: 3,
          character: "Princess Neytiri",
          id: 8691,
          name: "Zoe Saldana",
          profile_path: "/ofNrWiA2KDdqiNxFTLp51HcXUlp.jpg",
        },
        {
          cast_id: 25,
          character: "Dr. Grace Augustine",
          id: 10205,
          name: "Sigourney Weaver",
          profile_path: "/gxBIAr3CnBjkNRoPovVJCvEGqP0.jpg",
        },
        {
          cast_id: 4,
          character: "Col. Quaritch",
          id: 11164,
          name: "Stephen Lang",
          profile_path: "/tqF6ibURpLvRPlgvLRvjCQqWaa2.jpg",
        },
      ],
    },

    {
      kaggle_id: 285,
      title: "Pirates of the Caribbean: At World's End",
      releaseDate: new Date("19/5/2007"),
      runtime: 169,
      description:
        "Captain Barbossa, long believed to be dead, has come back to life and is headed to the edge of the Earth with Will Turner and Elizabeth Swann. But nothing is quite as it seems.",
      tagline: "At the end of the world, the adventure begins.",
      popularity: 139.082615,
      vote_average: 6.9,
      vote_count: 4500,
      keywords: [
        "ocean",
        "drug abuse",
        "exotic island",
        "east india trading company",
        "love of one's life",
        "traitor",
        "shipwreck",
        "strong woman",
        "ship",
        "alliance",
        "calypso",
        "afterlife",
        "fighter",
        "pirate",
        "swashbuckler",
        "aftercreditsstinger",
      ],
      cast: [
        {
          cast_id: 1,
          character: "Captain Jack Sparrow",
          id: 2231,
          name: "Johnny Depp",
          profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
        },
        {
          cast_id: 2,
          character: "Will Turner",
          id: 504,
          name: "Orlando Bloom",
          profile_path: "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        },
        {
          cast_id: 3,
          character: "Elizabeth Swann",
          id: 1336,
          name: "Keira Knightley",
          profile_path: "/4U9G4YwTlIEb4f8dTXsWx7b4rY2.jpg",
        },
        {
          cast_id: 4,
          character: "Captain Sao Feng",
          id: 2834,
          name: "Chow Yun-fat",
          profile_path: "/rF4cbkBocbFSGV1LEHwwicTtNJI.jpg",
        },
        {
          cast_id: 5,
          character: "Captain Barbossa",
          id: 2524,
          name: "Geoffrey Rush",
          profile_path: "/9BVJCEvIQJHZdmPEprDaC5Hzd6R.jpg",
        },
      ],
    },
  ]);
};

// Helper function to create actors
const createActors = async () => {
  const actors = await ActorModel.insertMany([
    {
      id: 65731,
      name: "Sam Worthington",
      birthday: "1976-08-02",
      place_of_birth: "Godalming, Surrey, England, UK",
      biography:
        "Samuel Henry John Worthington is an Australian actor renowned for his role as Jake Sully in the Avatar franchise (2009–present). He gained international recognition with his performances in Terminator Salvation (2009) as Marcus Wright and in Clash of the Titans (2010) and its sequel Wrath of the Titans (2012) as Perseus. Worthington has also appeared in films such as The Debt (2010), Everest (2015), Hacksaw Ridge (2016), The Shack (2017), and Fractured (2019). Additionally, he voiced Captain Alex Mason in the Call of Duty: Black Ops video game series.",
      profile_path: "/6SGb5R9wmbQNpQIzuNcL5dCCAcq.jpg",
      popularity: 37.231,
    },
    {
      id: 8691,
      name: "Zoe Saldaña",
      birthday: "1978-06-19",
      place_of_birth: "Passaic, New Jersey, USA",
      biography:
        "Zoë Yadira Saldaña-Perego is an American actress. She is best known for her roles in major film franchises such as Neytiri in James Cameron's Avatar series (2009–present), Gamora in the Marvel Cinematic Universe (2014–2023), and Uhura in the rebooted Star Trek film series (2009–2016). She has appeared in films like Center Stage (2000), Pirates of the Caribbean: The Curse of the Black Pearl (2003), The Losers (2010), Colombiana (2011), and The Adam Project (2022). She is noted as the only actor to appear in three of the five highest-grossing films of all time (Avatar, Avengers: Infinity War, and Avengers: Endgame).",
      profile_path: "/iOVbUH20il632nj2v01NCtYYeSg.jpg",
      popularity: 51.191,
    },
    {
      id: 10205,
      name: "Sigourney Weaver",
      birthday: "1949-10-08",
      place_of_birth: "Manhattan, New York City, New York, USA",
      biography:
        'Susan Alexandra "Sigourney" Weaver is an American actress. She is regarded as a science fiction icon for her portrayal of Ellen Ripley in the Alien franchise (1979–1997), a role that earned her worldwide acclaim and several awards nominations. Her notable roles also include Ghostbusters (1984), Gorillas in the Mist (1988), Working Girl (1988), The Ice Storm (1997), Avatar (2009), and its sequel Avatar: The Way of Water (2022). She has received numerous accolades, including a BAFTA Award and two Golden Globes, and she has been nominated for three Academy Awards, four Primetime Emmys, and a Tony Award.',
      profile_path: "/7e6D41Ip7eM23zkeJCRrYYD1ZUw.jpg",
      popularity: 37.899,
    },
    {
      id: 11164,
      name: "Stephen Lang",
      birthday: "1952-07-11",
      place_of_birth: "Manhattan, New York City, New York, USA",
      biography:
        "Stephen Lang is an American actor and playwright. He is known for roles in films such as Avatar (2009) as Colonel Miles Quaritch, Don't Breathe (2016) and its sequel, Tombstone (1993), Public Enemies (2009), and the TV series Into the Badlands. He has been acclaimed for his stage work as well, including his performance in the one-man show 'Beyond Glory,' which recounts the stories of Medal of Honor recipients.",
      profile_path: "/vAzlR5nPuCXUxfj4Wr3Ay3epYGR.jpg",
      popularity: 31.579,
    },
    {
      id: 2231,
      name: "Johnny Depp",
      birthday: "1963-06-09",
      place_of_birth: "Owensboro, Kentucky, USA",
      biography:
        "Johnny Depp is an American actor, producer, and musician. He began his career in television before gaining fame for his role in the '21 Jump Street' series. Depp is widely known for his versatile roles in films such as Edward Scissorhands, Pirates of the Caribbean series, Finding Neverland, and many others. He is regarded as one of the most talented actors of his generation.",
      profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
      popularity: 42.317,
    },
    {
      id: 504,
      name: "Orlando Bloom",
      birthday: "1977-01-13",
      place_of_birth: "Canterbury, Kent, England, UK",
      biography:
        "Orlando Bloom is an English actor best known for his roles as Legolas in the 'Lord of the Rings' and 'The Hobbit' trilogies, and as Will Turner in the 'Pirates of the Caribbean' series. Bloom has also appeared in films like Troy and Kingdom of Heaven. He is recognized for his charismatic screen presence and action roles.",
      profile_path: "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
      popularity: 28.452,
    },
    {
      id: 1336,
      name: "Keira Knightley",
      birthday: "1985-03-26",
      place_of_birth: "Teddington, Middlesex, England, UK",
      biography:
        "Keira Knightley is a British actress who gained worldwide fame for her roles in period dramas and romantic films. She is known for starring in 'Pirates of the Caribbean', 'Pride & Prejudice', 'Atonement', and 'Anna Karenina'. Knightley is acclaimed for her strong performances and versatility.",
      profile_path: "/4U9G4YwTlIEb4f8dTXsWx7b4rY2.jpg",
      popularity: 26.185,
    },
    {
      id: 2834,
      name: "Chow Yun-fat",
      birthday: "1955-05-18",
      place_of_birth: "Lamma Island, British Hong Kong",
      biography:
        "Chow Yun-fat is a Hong Kong actor known for his charismatic presence and iconic roles in both Hong Kong and Hollywood films. He rose to fame with films like 'A Better Tomorrow' and gained international recognition through roles in 'Crouching Tiger, Hidden Dragon' and 'Pirates of the Caribbean: At World's End'.",
      profile_path: "/rF4cbkBocbFSGV1LEHwwicTtNJI.jpg",
      popularity: 15.678,
    },
    {
      id: 2524,
      name: "Geoffrey Rush",
      birthday: "1951-07-06",
      place_of_birth: "Toowoomba, Queensland, Australia",
      biography:
        "Geoffrey Rush is an Australian actor and film producer, acclaimed for his performances on stage and screen. He won an Academy Award for his role in 'Shine' and is known for roles in 'Pirates of the Caribbean', 'The King's Speech', and 'The Best Offer'. He is celebrated for his versatility and depth in acting.",
      profile_path: "/9BVJCEvIQJHZdmPEprDaC5Hzd6R.jpg",
      popularity: 20.332,
    },
  ]);
  return actors;
};

export const seedData = async () => {
  try {
    // Clear existing data
    await UserModel.deleteMany();
    await MovieModel.deleteMany();
    await ActorModel.deleteMany();
    //await CrewModel.deleteMany();

    // Seed data
    const users = await createUsers();
    const actors = await createActors();
    await createMovies(actors);
    //const crew = await createCrew();
    //await createMovies(actors, crew);

    console.log("✅ Seed data inserted successfully");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

// Helper function to create crew members
// const createCrew = async () => {
//   const crewMembers = await CrewModel.insertMany([
//     { name: "Jon Favreau", role: "Director" },
//     { name: "Joss Whedon", role: "Director" },
//   ]);
//   return crewMembers;
// };
