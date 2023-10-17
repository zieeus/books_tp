const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const newUser = new User({ username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect('/register');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/books');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/', (req, res) => {
  res.redirect('/login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login'
}), (req, res) => {});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

module.exports = router;
