import express from "express";
import { cards, transactions } from "./customerData.js";
// import { router } from "./test.Router.js";
// import { transactions } from "./customerData.js";
import cardRouter from "./routes/card.js";
import transactionRouter from "./routes/transaction.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  //or console.log("Listening on PORT" + PORT)
});

app.use(express.json());
// app.use("/test", router);

app.use("/api/card", cardRouter);
app.use("/api/transactions", transactionRouter);

// const transactions = getTransactionsFromDatabase(customer_id);

app.get("/", (req, res) => {
  res.send("Hello World");
});
