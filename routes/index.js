import { cardRoute } from "./cardRoute.js";
import { transactionRoute } from "./transactionRoute.js";
import CONFIG from "../config/CONFIG.js";
import express from "express";

export const initializeRoute = () => {
  const app = express();
  app.use(express.json());
  const PORT = CONFIG.PORT;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });

  // For Home page
  app.get("/", (req, res) => {
    res.send("Banking API Home Page");
  });
  setupRoutes(app);
};

const setupRoutes = (app) => {
  app.use("/api/card", cardRoute);
  app.use("/api/transactions", transactionRoute);
};
