import {
  getCardDetailsByCardNumberAndCvv,
  addCard,
  editCardCvv,
  deleteCard,
} from "../services/cardService.js";
import express from "express";
export const cardRoute = express.Router();

// Get Card by card number and cvv
cardRoute.get("/:debitCardNumber/:cvv", async (req, res) => {
  try {
    const card = await getCardDetailsByCardNumberAndCvv(
      req.params.debitCardNumber,
      req.params.cvv
    );
    if (card) res.send(card);
    else res.status(404).send("Card not Found");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add Card
cardRoute.post("/", async (req, res) => {
  try {
    const newCard = await addCard(req.body);
    res.send(newCard);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update card's cvv by card number
cardRoute.put("/:debitCardNumber/:cvv", async (req, res) => {
  try {
    const updateReturn = await editCardCvv(
      req.params.debitCardNumber,
      req.params.cvv
    );
    res.send(updateReturn);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete card by card number
cardRoute.delete("/:debitCardNumber/", async (req, res) => {
  try {
    const deleteReturn = await deleteCard(req.params.debitCardNumber);
    res.send(deleteReturn);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
