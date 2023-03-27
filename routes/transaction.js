import express from "express";
import { transactions } from "../customerData.js";
const router = express.Router();

// Get All Transactions
router.get("/", (req, res) => {
  res.send(transactions);
});

//edit transaction by transactionID
router.put("/:debitCardNumber/:transactionID", (req, res) => {
  const debitCardNumber = req.params.debitCardNumber;
    const transactionID = req.params.transactionID;

    // if (!(transactions.includes(transcationID) && cards.includes(debitCardNumber)))
    // {
    //     res.send.startus(404).send('not found')
    //     return
    //   }
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
router.post("/:debitCardNumber/:transactionID", (req, res) => {
  const newTransaction = {
    transactionID: req.body.transactionID,
    debitCardNumber: req.body.debitCardNumber,
    amount: req.body.amount,
    dateAndTime: Date.UTC,
  };

  transactions.push(newTransaction);

  res.send("Transaction added");
});

export default router;
