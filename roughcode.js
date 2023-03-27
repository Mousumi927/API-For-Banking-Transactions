import express from "express";
import { cards } from "./customerData.js";
// import { router } from "./test.Router.js";
import { transactions } from "./customerData.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  //or console.log("Listening on PORT" + PORT)
});

app.use(express.json());
// app.use("/test", router);

// const transactions = getTransactionsFromDatabase(customer_id);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Validate Card by Card Number and Cvv
app.get("/api/card/validate/:debitCardNumber/:cvv", (req, res) => {
  // const debitCardNumber = req.params.debitCardNumber
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.params.debitCardNumber) &&
      card.CVV === Number(req.params.cvv) &&
      card.isDeleted === false
  );
  if (card) res.send(true);
  else res.send(false);
});

// Get Card by card number and cvv
app.get("/api/card/:debitCardNumber/:cvv", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.params.debitCardNumber) &&
      card.CVV === Number(req.params.cvv) &&
      card.isDeleted === false
  );
  if (card) res.send(card);
  else res.status(404).send("Card not found");
});


// Add transaction
app.post("/api/card/", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.body.debitCardNumber) &&
      card.isDeleted === false
  );

  if (!card) {
    res.status(404).send("Card not found");
  } else if (card.amount < Number(req.body.amount)) {
    res.status(400).send("Insufficient balance");
  } else {
    const newTransaction = {
      id: transactions.length + 1,
      debitCardNumber: Number(req.body.debitCardNumber),
      amount: Number(req.body.amount),
      dateAndTime: Date.UTC,
      isDeleted: false,
    };
    card.amount = card.amount - Number(newTransaction.amount);
    transactions.push(newTransaction);
    res.send(newTransaction);
  }
});

// Delete card by card id
app.delete("/api/card/:cardId", (req, res) => {
  if (!card) {
    res.status(404).send("Card not found");
  } else {
    card.isDeleted = true;
    res.send(true);
  }
});

// Get All Transactions
app.get("/api/transactions/", (req, res) => {
  res.send(transactions);
});

//edit transaction by transactionID
app.put("/api/transactions/:debitCardNumber/:transactionID", (req, res) => {
  const debitCardNumber = req.params.debitCardNumber;
  const transactionID = req.params.transactionID;
  const cardIndex = transactions.findIndex(
    (transaction) =>
      transaction.debitCardNumber === Number(req.params.debitCardNumber) &&
      transaction.id === Number(req.params.transactionID)
  );
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    if (req.body.amount) {
      transactions[cardIndex].amount = req.body.amount;
    }

    console.log(transactions[cardIndex]);
    res.send(String(cardIndex));
  }
});

// list all transactions in database after each occurence by transactionID:
app.post("/api/transactions/:debitCardNumber/:transactionID", (req, res) => {
  const newTransaction = {
    transactionID: req.body.transactionID,
    debitCardNumber: req.body.debitCardNumber,
    amount: req.body.amount,
    dateAndTime: Date.UTC
  };

  transactions.push(newTransaction);

  res.send("Transaction added");
});


