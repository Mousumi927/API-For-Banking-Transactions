import { initializeRoute } from "./routes/index.js";
import connectDB from "./config/database.js";

initializeRoute();
connectDB();
