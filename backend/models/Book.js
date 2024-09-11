const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  category: { type: String, required: true },
  rent_per_day: { type: Number, required: true }
});
module.exports = mongoose.model('Book', bookSchema);