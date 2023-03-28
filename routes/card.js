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
  if (card) res.send("Card is valid");
  else res.send("invalid card");
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
