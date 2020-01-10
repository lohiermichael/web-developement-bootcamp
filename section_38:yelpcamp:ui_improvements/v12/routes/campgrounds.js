const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn, (req, res) => {
  // Get data from form and add to campground array
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    author: {
      id: req.user._id,
      username: req.user.username
    }
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW route - display info about one campground
router.get('/:slug', (req, res) => {
  // Find campground with slug
  Campground.findOne({ slug: req.params.slug })
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

// EDIT route - Display edit form for one campground
router.get('/:slug/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findOne({ slug: req.params.slug }, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

// UPDATE ROUTE - update information for one campground and redirect
router.put('/:slug', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findOneAndUpdate(
    { slug: req.params.slug },
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect(`/campgrounds`);
      } else {
        res.redirect(`/campgrounds/${req.params.slug}`);
      }
    }
  );
});

// DESTROY route - delete one campground and redirect
router.delete('/:slug', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findOneAndRemove(
    { slug: req.params.slug },
    (err, deletedCampground) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect('/campgrounds');
      } else {
        // Delete all associated comments
        deletedCampground.comments.forEach(commentId => {
          Comment.findByIdAndRemove(commentId, (err, deletedComment) => {
            if (err) console.log('Err: ', err);
            else console.log(deletedComment);
          });
        });

        res.redirect('/campgrounds');
      }
    }
  );
});

module.exports = router;
