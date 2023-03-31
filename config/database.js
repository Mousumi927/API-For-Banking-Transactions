import CONFIG from "./CONFIG.js";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = CONFIG.DB_CONNECTION_STRING;
    await connect(mongoURI);
    console.log("MongoDB Connected..." + mongoURI);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
