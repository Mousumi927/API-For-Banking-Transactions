import { cards } from "./customerData.js";
console.log(JSON.stringify(cards, null, 2));
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGO_URL;

const db = await mongoose.connect(connectionString);
// async function(main) {
//   await mongoose.connect(connectionString);

//   main().catch((err) => console.log(err));
// }

const User = db.model("user", userSchema);
const users = await User.find();
console.log(users);
