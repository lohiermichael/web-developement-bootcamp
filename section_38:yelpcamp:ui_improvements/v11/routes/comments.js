const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// =============================
// COMMENTS ROUTES
// =============================

// NEW route
router.get('/new', middleware.isLoggedIn, (req, res) => {
  // Find campground by id
  Campground.findById(req.params.campground_id, (err, foundCampground) => {
    if (err) console.log('Err: ', err);
    else {
      console.log(foundCampground);
      res.render('comments/new', { campground: foundCampground });
    }
  });
});

// CREATE route
router.post('/', middleware.isLoggedIn, (req, res) => {
  // Lookup campground using id
  Campground.findById(req.params.campground_id, (err, campground) => {
    if (err) {
      req.flash('error', 'Something went wrong!');
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
          req.flash('success', 'Successfully added comment');
          campground.save();
          // Redirect to the SHOW page of the campground of the comment
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// EDIT route
router.get(
  '/:comment_id/edit',
  middleware.checkCommentOwnership,
  (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect('back');
      } else {
        res.render('comments/edit', {
          campground_id: req.params.campground_id,
          comment: foundComment
        });
      }
    });
  }
);

// UPDATE route
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        console.log('Err: ', err);
        res.redirect('back');
      } else {
        res.redirect(`/campgrounds/${req.params.campground_id}`);
      }
    }
  );
});

// DESTROY route
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findOneAndRemove(req.params.comment_id, err => {
    if (err) {
      console.log('Err: ', err);
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.campground_id}`);
    }
  });
});

module.exports = router;
