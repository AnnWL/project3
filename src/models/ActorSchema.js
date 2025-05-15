import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    ext_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    birthday: { type: Date },
    place_of_birth: { type: String },
    nationality: { type: String },
    biography: { type: String },
    profile_path: { type: String },
    popularity: { type: Number },
  },
  { timestamps: true, collection: "actor" }
);

// {
//   id: 65731,
//   name: "Sam Worthington",
//   birthday: "1976-08-02",
//   place_of_birth: "Godalming, Surrey, England, UK",
//   biography:
//     "Samuel Henry John Worthington is an Australian actor renowned for his role as Jake Sully in the Avatar franchise (2009–present). He gained international recognition with his performances in Terminator Salvation (2009) as Marcus Wright and in Clash of the Titans (2010) and its sequel Wrath of the Titans (2012) as Perseus. Worthington has also appeared in films such as The Debt (2010), Everest (2015), Hacksaw Ridge (2016), The Shack (2017), and Fractured (2019). Additionally, he voiced Captain Alex Mason in the Call of Duty: Black Ops video game series.",
//   profile_path: "/6SGb5R9wmbQNpQIzuNcL5dCCAcq.jpg",
//   popularity: 37.231,
// },

export default mongoose.model("Actor", actorSchema);
