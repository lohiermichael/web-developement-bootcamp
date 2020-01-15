const express = require('express');
const router = express.Router();
const passport = require('passport');
const Campground = require('../models/campground');
const User = require('../models/user');
const async = require("async");
const nodemailer = require("nodemailer");
// No need to install it as it is past of node
const crypto = require("crypto");


// Landing page
router.get('/', (req, res) => {
  res.render('landing');
});

// =============================
// AUTH ROUTES
// =============================

// Show register form
router.get('/register', (req, res) => {
  res.render('register', { page: 'register' });
});

// Handle sign up logic
router.post('/register', (req, res) => {
  eval(require('locus'));
  var newUser = new User({ username: req.body.username, });
  // If the admin code given is wrong
  if (req.body.adminCode === 'secret123') {
    newUser.isAdmin = true;
    register(isAdmin = true);
  } else if (req.body.adminCode === '') {
    newUser.isAdmin = false;
    register(isAdmin = false);
  } else {
    req.flash('error', 'You gave a wrong admin code');
    res.redirect('/register');
  }

  function register(isAdmin) {
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/register');
      }
      passport.authenticate('local')(req, res, function () {
        req.flash('success', `Welcome to YelCamp ${user.username}`);
        if (isAdmin) {
          req.flash('success', ' you have signed up as an admin')
        }
        res.redirect('/campgrounds');
      });
    });
  }

});

// Show login form
router.get('/login', (req, res) => {
  res.render('login', { page: 'login' });
});

// Handle login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    successFlash: 'Welcome!',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => { }
);

// Handle logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Successfully logged out');
  res.redirect('/campgrounds');
});

// Forgot password: GET route
router.get("/forgot", (req, res) => {
  res.render('forgot');
});

// Forgot password: POST route
router.post("/forgot", (req, res) => {

});



module.exports = router;
