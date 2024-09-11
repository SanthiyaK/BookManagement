const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Helper function to calculate rent
const calculateRent = (rentPerDay, issueDate, returnDate) => {
  const days = Math.ceil((new Date(returnDate) - new Date(issueDate)) / (1000 * 60 * 60 * 24));
  return rentPerDay * days;
};

// Issue a book
router.post('/issue', async (req, res) => {
  const { book_name, user_id, issue_date } = req.body;

  try {
    const book = await Book.findOne({ book_name });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transaction = new Transaction({
      book_id: book._id,
      user_id,
      issue_date: new Date(issue_date)
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Return a book
router.post('/return', async (req, res) => {
  const { book_name, user_id, return_date } = req.body;

  try {
    const book = await Book.findOne({ book_name });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transaction = await Transaction.findOne({
      book_id: book._id,
      user_id,
      return_date: { $exists: false }
    });

    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const rentAmount = calculateRent(book.rent_per_day, transaction.issue_date, return_date);

    transaction.return_date = new Date(return_date);
    transaction.rent_amount = rentAmount;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/person/books', async (req, res) => {
    const { user_id } = req.query;
  
    try {
      const transactions = await Transaction.find({ user_id }).populate('book_id');
      res.json({
        user_id,
        issued_books: transactions.map(t => ({
          book_id: t.book_id._id,
          book_name: t.book_id.book_name,
          issue_date: t.issue_date,
          return_date: t.return_date
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // routes/transactions.js

router.get('/book/rent', async (req, res) => {
    const { book_name } = req.query;
  
    try {
      const book = await Book.findOne({ book_name });
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      const totalRent = await Transaction.aggregate([
        { $match: { book_id: book._id, return_date: { $exists: true } } },
        { $group: { _id: null, total_rent: { $sum: '$rent_amount' } } }
      ]);
  
      res.json({
        book_name,
        total_rent_generated: totalRent.length ? totalRent[0].total_rent : 0
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;
