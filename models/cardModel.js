import mongoose from "mongoose";

const CardsSchema = mongoose.Schema({
  amount: Number,
  debitCardNumber: String,
  cvv: String,
  expDate: String,
  isDeleted: Boolean,
});

export default mongoose.model("Card", CardsSchema);
