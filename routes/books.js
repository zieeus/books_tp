const express = require('express');
const router = express.Router();

const books = [
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
];

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.get('/', isAuthenticated, (req, res) => {
  res.render('books', { books });
});

module.exports = router;