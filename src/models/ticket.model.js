const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  code: { type: String, unique: true },
  purchase_datetime: { type: Date, default: new Date() },
  amount: { type: Number },
  purchaser: { type: String, required: true },
  products: [{ product: { type: mongoose.Types.ObjectId, ref: "Product" }, quantity: Number }],
});
module.exports = mongoose.model("Ticket", ticketSchema);
