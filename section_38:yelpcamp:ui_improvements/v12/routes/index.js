const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Landing page
router.get('/', (req, res) => {
  res.render('landing');
});

// =============================
// AUTH ROUTES
// =============================

// Handle sign up logic
router.get('/register', (req, res) => {
  res.render('register');
});

// Show register form
router.post('/register', (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', `Welcome to YelCamp ${user.username}`);
      res.redirect('/campgrounds');
    });
  });
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  (req, res) => {}
);

// Handle logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Successfully logged out');
  res.redirect('/campgrounds');
});

module.exports = router;
