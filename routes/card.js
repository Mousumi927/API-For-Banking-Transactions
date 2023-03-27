import express from "express";
import { cards, transactions } from "../customerData.js";
const router = express.Router();

// Validate Card by Card Number and Cvv
router.get("/validate/:debitCardNumber/:cvv", (req, res) => {
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
router.get("/:debitCardNumber/:cvv", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.params.debitCardNumber) &&
      card.CVV === Number(req.params.cvv) &&
      card.isDeleted === false
  );
  if (card) res.send(card);
  else res.status(404).send("Card not found");
});

// Post transaction by card numbber
router.post("/", (req, res) => {
  const card = cards.find(
    (card) =>
      card.debitCardNumber === Number(req.body.debitCardNumber) &&
      card.isDeleted === false
  );
  console.log("card is ", card);
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
router.delete("/:cardId", (req, res) => {
  if (!card) {
    res.status(404).send("Card not found");
  } else {
    card.isDeleted = true;
    res.send(true);
  }
});

export default router;
