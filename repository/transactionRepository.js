import TransactionModel from "../models/transactionModel.js";

const getTransactionByCardNumber = async (
  debitCardNumber
) => {
  return await TransactionModel.find({
    debitCardNumber: debitCardNumber

  }
  );
};

const createTransaction = async (
  cardAmount,
  transactionAmount,
  debitCardNumber,
  cvv
) => {
  return await TransactionModel.create({
    amount: Number(cardAmount) - Number(transactionAmount),
    debitCardNumber: debitCardNumber,
    cvv: cvv,
  });
};

export default {
  createTransaction,
  getTransactionByCardNumber,
};
