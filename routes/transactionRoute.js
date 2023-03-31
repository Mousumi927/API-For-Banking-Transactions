import {
  createTransaction,
  getTransactionByCardNumber,
} from "../services/transactionService.js";
import {
  getCardDetailsByCardNumberAndCvv,
  updateAmountCard,
} from "../services/cardService.js";
import express from "express";
export const transactionRoute = express.Router();

// Get Transaction by Card Number
transactionRoute.get("/", async (req, res) => {
  try {
    const transactions = await getTransactionByCardNumber(
      req.body.debitCardNumber,
    );

    if (transactions) res.send(transactions);
    else res.status(404).send("Transaction not Found");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add Transaction
transactionRoute.post("/", async (req, res) => {
  try {
    const card = await getCardDetailsByCardNumberAndCvv(
      req.body.debitCardNumber,
      req.body.cvv
    );
    if (card.amount < Number(req.body.amount))
      res.status(400).send("Insufficient Balance");
    else {
      const newCard = await createTransaction(
        card.amount,
        req.body.amount,
        card.debitCardNumber,
        card.cvv
      );
      await updateAmountCard(
        card.debitCardNumber,
        card.amount,
        req.body.amount
      );
      res.send(newCard);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
