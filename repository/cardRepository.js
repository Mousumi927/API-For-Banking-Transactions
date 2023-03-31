import CardModel from "../models/cardModel.js";

const getCardDetailsByCardNumberAndCvv = async (debitCardNumber, cvv) => {
  return await CardModel.findOne({
    debitCardNumber: debitCardNumber,
    cvv: cvv,
  });
};

const addCard = async (card) => {
  return await CardModel.create(card);
};

const editCardCvv = async (debitCardNumber, cvv) => {
  return await CardModel.findOneAndUpdate(
    { debitCardNumber: debitCardNumber },
    { isDeleted: false, cvv: cvv },
    { new: true }
  );
};

const deleteCard = async (debitCardNumber) => {
  return await CardModel.findOneAndUpdate(
    { debitCardNumber: debitCardNumber },
    { isDeleted: true },
    { new: true }
  );
};

const updateAmountCard = async (
  debitCardNumber,
  cardAmount,
  transactionAmount
) => {
  return await CardModel.updateOne(
    { debitCardNumber: debitCardNumber },
    { amount: Number(cardAmount) - Number(transactionAmount) }
  );
};

export default {
  getCardDetailsByCardNumberAndCvv,
  addCard,
  editCardCvv,
  deleteCard,
  updateAmountCard
};

