const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issue_date: { type: Date, required: true },
  return_date: { type: Date },
  rent_amount: { type: Number }
});

module.exports = mongoose.model('Transaction', transactionSchema);