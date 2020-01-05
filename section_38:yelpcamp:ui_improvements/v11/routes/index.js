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
      console.log('Err: ', err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds');
    });
  });
});

// Show login form
router.get('/login', (req, res) => {
  console.log(req.flash('error'));
  res.render('login', { message: req.flash('error')[0] });
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
  res.redirect('/login');
});

module.exports = router;
