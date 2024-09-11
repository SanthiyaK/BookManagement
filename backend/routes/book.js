const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get list of books by name or term
router.get('/search', async (req, res) => {
  const { term } = req.query;

  try {
    const books = await Book.find({ book_name: new RegExp(term, 'i') });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of books within a rent price range
router.get('/rent/range', async (req, res) => {
  const { min_rent, max_rent } = req.query;

  try {
    const books = await Book.find({
      rent_per_day: { $gte: Number(min_rent), $lte: Number(max_rent) }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of books by category, name/term, and rent per day range
router.get('/filter', async (req, res) => {
  const { category, term, min_rent, max_rent } = req.query;

  try {
    const books = await Book.find({
      category: new RegExp(category, 'i'),
      book_name: new RegExp(term, 'i'),
      rent_per_day: { $gte: Number(min_rent), $lte: Number(max_rent) }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
