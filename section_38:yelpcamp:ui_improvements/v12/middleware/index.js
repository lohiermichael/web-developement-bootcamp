const Campground = require('../models/campground');
const Comment = require('../models/comment');

// Collection of all the middleware used in the application
var middleware = {};
middleware.checkCampgroundOwnership = function (req, res, next) {
  // Condition 1 : to be logged in
  if (req.isAuthenticated()) {
    // Condition 2: owning the campground
    Campground.findOne({ slug: req.params.slug }, (err, foundCampground) => {
      if (err) {
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        // Mongoose method for comparison between object and string
        if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash('Error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    // Redirect to the previous page
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
  }
};

middleware.checkCommentOwnership = function (req, res, next) {
  // Condition 1 : to be logged in
  if (req.isAuthenticated()) {
    // Condition 2: owning the campground
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash('error', 'Something went wrong!');
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    // Redirect to the previous page
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middleware.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // It doesn't show up immediately but on the next page as soon as we redirect
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
};

module.exports = middleware;
