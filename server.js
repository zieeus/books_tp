const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
const User = require('./models/userModel');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use('/', authRoutes);
app.use('/books', bookRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
