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
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar
  });
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

// User profile
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      res.flash('error', 'Something went wrong');
      res.redirect('/campgrounds');
    }
    Campground.find().where('author.id').equals(foundUser._id).exec((err, campgrounds) => {
      if (err) {
        res.flash('error', 'Something went wrong');
        res.redirect('/campgrounds');
      }
      res.render('users/show', { user: foundUser, campgrounds: campgrounds });
    })
  })
});

// Forgot password: GET route
router.get("/forgot", (req, res) => {
  res.render('password/forgot');
});

// Forgot password: POST route
router.post('/forgot', function (req, res, next) {
  async.waterfall([
    // Make a token
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    // Find the user with the given address
    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          // If no mail found redirect to the forgot page with a flash error
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        // Set the two following attributes for the reset
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        // Save the user as is 
        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    // Send mail using the nodemailer library
    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'michael.lohier.webdev@gmail.com',
          pass: process.env.GMAIL_ADMIN_PASSWORD
        }
      });
      // Draft email structure
      var mailOptions = {
        to: user.email,
        from: 'michael.lohier.webdev@gmail.com',
        subject: 'Yelpcamp Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      // Send the email
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('Mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

// Reset password: GET route
router.get('/reset/:token', function (req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    // The date of the expiration of the token has to be greater than now
    resetPasswordExpires: { $gt: Date.now() }
  },
    (err, user) => {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('password/reset', { token: req.params.token });
    });
});

// Reset password: POST route
router.post('/reset/:token', (req, res) => {
  async.waterfall([
    function (done) {
      // Find an user in the database that matches the who to whom the token was sent
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        // Check if the password and its confirmation match
        if (req.body.password === req.body.confirm) {
          // Passport method to reset and hash the new password
          user.setPassword(req.body.password, function (err) {
            // Reset the token attributes of the user to undefined
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            // Save the new user and log him in
            user.save(function (err) {
              req.logIn(user, function (err) {
                done(err, user);
              });
            });
          })
          // If the passwords don't match redirect the user
        } else {
          req.flash("error", "Passwords do not match.");
          return res.redirect('back');
        }
      });
    },
    // Send another email to the user to confirm that his password is indeed reset
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'michael.lohier.webdev@gmail.com',
          pass: process.env.GMAIL_ADMIN_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'michael.lohier.webdev@mail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        // when the mail is sent, flash a success message to the user
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function (err) {
    // Finally after the pipe of consecutive executions redirect to the campground page
    res.redirect('/campgrounds');
  });
});


module.exports = router;
