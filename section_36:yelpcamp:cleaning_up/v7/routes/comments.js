const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// =============================
// COMMENTS ROUTES
// =============================

// NEW route
router.get('/new', isLoggedIn, (req, res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) console.log('Err: ', err);
    else {
      console.log(foundCampground);
      res.render('comments/new', { campground: foundCampground });
    }
  });
});

// CREATE route
router.post('/', isLoggedIn, (req, res) => {
  // Lookup campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log('Err: ', err);
      redirect('/campgrounds');
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) console.log('Err: ', err);
        else {
          // Add username and id to the comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // Save comment
          comment.save();
          // Connect new comment to campground
          campground.comments.push(comment);
          console.log(comment);
          campground.save();
          // Redirect to the SHOW page of the campground of the comment
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('login');
}

module.exports = router;
