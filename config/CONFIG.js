import dotenv from "dotenv";
dotenv.config();

let CONFIG = {};

CONFIG.PORT = process.env.PORT || 8000;
CONFIG.DB_CONNECTION_STRING = process.env.MONGO_URL;

export default CONFIG;
