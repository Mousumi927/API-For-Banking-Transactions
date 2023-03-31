import cardRepository from "../repository/cardRepository.js";

export const getCardDetailsByCardNumberAndCvv = async (
  debitCardNumber,
  cvv
) => {
  return await cardRepository.getCardDetailsByCardNumberAndCvv(
    debitCardNumber,
    cvv
  );
};

export const addCard = async (card) => {
  return await cardRepository.addCard(card);
};

export const editCardCvv = async (debitCardNumber, cvv) => {
  return await cardRepository.editCardCvv(debitCardNumber, cvv);
};

export const deleteCard = async (debitCardNumber) => {
  return await cardRepository.deleteCard(debitCardNumber);
};

export const updateAmountCard = async (
  debitCardNumber,
  cardAmount,
  transactionAmount
) => {
  return await cardRepository.updateAmountCard(
    debitCardNumber,
    cardAmount,
    transactionAmount
  );
};
