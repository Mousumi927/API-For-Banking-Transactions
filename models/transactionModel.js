import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
  id: String,
  amount: Number,
  debitCardNumber: String,
});

export default mongoose.model("Transaction", TransactionSchema);
