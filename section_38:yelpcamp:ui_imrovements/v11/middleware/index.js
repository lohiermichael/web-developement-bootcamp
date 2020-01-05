const Campground = require('../models/campground');
const Comment = require('../models/comment');

// Collection of all the middleware used in the application
var middleware = {};
middleware.checkCampgroundOwnership = function(req, res, next) {
  // Condition 1 : to be logged in
  if (req.isAuthenticated()) {
    // Condition 2: owning the campground
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect('back');
      } else {
        // Mongoose method for comparison between object and string
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    // Redirect to the previous page
    res.redirect('back');
  }
};

middleware.checkCommentOwnership = function(req, res, next) {
  // Condition 1 : to be logged in
  if (req.isAuthenticated()) {
    // Condition 2: owning the campground
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    // Redirect to the previous page
    res.redirect('back');
  }
};

middleware.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('login');
};

module.exports = middleware;
