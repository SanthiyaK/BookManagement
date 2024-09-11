const mongoose = require('mongoose');
const Book = require('./models/Book');
const User = require('./models/User');

const MONGO_URI = 'mongodb://localhost:27017/bookdb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Create users
    const users = await User.create([
      { name: 'Alice Smith', email: 'alice@example.com', phone_number: '123-456-7890' },
      { name: 'Bob Johnson', email: 'bob@example.com', phone_number: '234-567-8901' },
      { name: 'Charlie Brown', email: 'charlie@example.com', phone_number: '345-678-9012' },
      { name: 'Diana Prince', email: 'diana@example.com', phone_number: '456-789-0123' },
      { name: 'Evan Green', email: 'evan@example.com', phone_number: '567-890-1234' }
    ]);

    // Create books
    const books = await Book.create([
      { book_name: 'The Great Gatsby', category: 'Fiction', rent_per_day: 1.50 },
      { book_name: 'To Kill a Mockingbird', category: 'Fiction', rent_per_day: 1.75 },
      { book_name: '1984', category: 'Dystopian', rent_per_day: 2.00 },
      { book_name: 'A Brief History of Time', category: 'Science', rent_per_day: 2.50 },
      { book_name: 'The Catcher in the Rye', category: 'Fiction', rent_per_day: 1.60 },
      { book_name: 'Brave New World', category: 'Dystopian', rent_per_day: 2.20 },
      { book_name: 'Sapiens', category: 'History', rent_per_day: 2.75 },
      { book_name: 'The Hobbit', category: 'Fantasy', rent_per_day: 2.10 },
      { book_name: 'Pride and Prejudice', category: 'Romance', rent_per_day: 1.80 },
      { book_name: 'The Alchemist', category: 'Adventure', rent_per_day: 2.00 },
      { book_name: 'War and Peace', category: 'Historical', rent_per_day: 2.50 },
      { book_name: 'Ulysses', category: 'Classic', rent_per_day: 2.20 },
      { book_name: 'The Odyssey', category: 'Classic', rent_per_day: 2.00 },
      { book_name: 'The Da Vinci Code', category: 'Thriller', rent_per_day: 2.30 },
      { book_name: 'Gone Girl', category: 'Thriller', rent_per_day: 2.40 },
      { book_name: 'The Road', category: 'Dystopian', rent_per_day: 2.50 },
      { book_name: 'Fahrenheit 451', category: 'Dystopian', rent_per_day: 2.20 },
      { book_name: 'The Shining', category: 'Horror', rent_per_day: 2.00 },
      { book_name: 'Dracula', category: 'Horror', rent_per_day: 2.10 },
      { book_name: 'The Little Prince', category: 'Children', rent_per_day: 1.50 },
      { book_name: 'Charlotte\'s Web', category: 'Children', rent_per_day: 1.60 }
    ]);

    console.log('Sample data inserted');

    mongoose.disconnect();
  })
  .catch(err => console.error(err));