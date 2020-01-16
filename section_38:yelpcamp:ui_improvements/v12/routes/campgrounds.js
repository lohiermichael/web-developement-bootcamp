const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');
const Review = require("../models/review");
const cloudinary = require('cloudinary');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'file.txt')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter })

cloudinary.config({
  cloud_name: 'dkezhjprr',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// =============================
// CAMPGROUNDS ROUTES
// =============================

// INDEX route - list all campgrounds
router.get('/', (req, res) => {
  var noMatch = false;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Retrieve all campgrounds from the database
    Campground.find({ name: regex }, function (err, campgrounds) {
      if (err) {
        console.log('Error', err);
      } else {
        // Display a message if there is no campground
        if (campgrounds.length == 0) {
          var noMatch = true;
        }
        res.render('campgrounds/index', {
          campgrounds: campgrounds,
          noMatch: noMatch
        });
      }
    });
  } else {
    // Retrieve all campgrounds from the database
    Campground.find({}, function (err, campgrounds) {
      if (err) {
        console.log('Error', err);
      } else {
        res.render('campgrounds/index', {
          campgrounds: campgrounds,
          noMatch: noMatch
        });
      }
    });
  }
});

// CREATE route - add new campground to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), (req, res) => {
  console.log(req.file);
  cloudinary.uploader.upload(req.file.path, function (result) {
    // Add cloudinary url for the image to the campground object under image property
    req.body.campground.image = result.secure_url;
    // Add author to campground
    req.body.campground.author = {
      id: req.user._id,
      username: req.user.username
    }
    Campground.create(req.body.campground, (err, campground) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      res.redirect('/campgrounds/' + campground.slug);
    });
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
    .populate('likes')
    .populate({
      path: 'reviews',
      options: { sort: { createdAt: -1 } }
    })
    .exec(function (err, foundCampground) {
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
router.delete("/:slug", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findOneAndUpdate({ slug: req.params.slug }, function (err, campground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      // Delete all comments associated with the campground
      Comment.remove({ "_id": { $in: campground.comments } }, function (err) {
        if (err) {
          console.log(err);
          return res.redirect("/campgrounds");
        }
        // deletes all reviews associated with the campground
        Review.Remove({ "_id": { $in: campground.reviews } }, function (err) {
          if (err) {
            console.log(err);
            return res.redirect("/campgrounds");
          }
          //  delete the campground
          campground.remove();
          req.flash("success", "Campground deleted successfully!");
          res.redirect("/campgrounds");
        });
      });
    }
  });
});

// Campground Like Route
router.post("/:slug/like", middleware.isLoggedIn, function (req, res) {
  Campground.findOne({ slug: req.params.slug },
    function (err, foundCampground) {
      if (err) {
        console.log(err);
        return res.redirect("/campgrounds");
      }

      // check if req.user._id exists in foundCampground.likes
      // Is true if one of the like is the current user
      // When it finds a match, it stops
      var foundUserLike = foundCampground.likes.some(function (like) {
        return like.equals(req.user._id);
      });

      if (foundUserLike) {
        // user already liked, removing like
        foundCampground.likes.pull(req.user._id);
      } else {
        // adding the new user like
        foundCampground.likes.push(req.user);
      }

      // Save the new campground and redirect to the campground SHOW page
      foundCampground.save(function (err) {
        if (err) {
          console.log(err);
          return res.redirect("/campgrounds");
        }
        return res.redirect("/campgrounds/" + foundCampground.slug);
      });
    });
});


// Transform a search into a standardized string
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;
