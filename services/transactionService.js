import transactionRepository from "../repository/transactionRepository.js";

export const getTransactionByCardNumber = async(
  debitCardNumber

) => {
  return await transactionRepository.getTransactionByCardNumber(
    debitCardNumber
  );
}

export const createTransaction = async (
  cardAmount,
  transactionAmount,
  debitCardNumber,
  cvv
) => {
  return await transactionRepository.createTransaction(
    cardAmount,
    transactionAmount,
    debitCardNumber,
    cvv
  );
};
