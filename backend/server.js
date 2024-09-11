const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRoutes = require('./routes/books');
const transactionRoutes = require('./routes/transactions');
 const userRoutes = require('./routes/users'); 
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/bookdb';
const bookRoutes = require('./routes/book');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
 
app.use('/books', booksRoutes);
app.use('/transactions', transactionRoutes);
app.use('/users', userRoutes); 
app.use('/book', bookRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = router;