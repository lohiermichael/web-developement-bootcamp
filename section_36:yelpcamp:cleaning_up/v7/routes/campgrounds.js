const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// =============================
// CAMPGROUNDS ROUTES
// =============================

// INDEX route - list all campgrounds
router.get('/', (req, res) => {
  //   Retrieve campgrounds from the database
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log('Error', err);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds });
    }
  });
});

// CREATE route - add new campground to DB
router.post('/', isLoggedIn, (req, res) => {
  // Get data from form and add to campground array
  var newName = req.body.name;
  var newImage = req.body.image;
  var newDescription = req.body.description;
  var newCampground = {
    name: newName,
    image: newImage,
    description: newDescription
  };
  // Create a campground and save it in the database
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log('Error: ', err);
    } else {
      // Redirect back to campgrounds page
      // By default it will be redirected to the get route
      res.redirect('/campgrounds');
    }
  });
});

// NEW route - display from to create new campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW route - display info about one campground
router.get('/:id', (req, res) => {
  // Find campground with provided id
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log('Error', err);
      } else {
        // Render show campground
        res.render('campgrounds/show', { campground: foundCampground });
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
