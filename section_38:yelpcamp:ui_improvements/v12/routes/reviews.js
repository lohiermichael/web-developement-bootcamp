const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const middleware = require("../middleware");

// Reviews INDEX
router.get("/", function (req, res) {
    Campground.findOne({ slug: req.params.slug }).populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } } // Sorting the populated reviews array to show the latest first
    }).exec(function (err, campground) {
        if (err || !campground) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("reviews/index", { campground: campground });
    });
});

// Reviews NEW
router.get("/new", middleware.isLoggedIn, middleware.checkReviewExistence, function (req, res) {
    // middleware.checkReviewExistence checks if a user already reviewed the campground, only one review per user is allowed
    Campground.findOne({ slug: req.params.slug }, function (err, campground) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("reviews/new", { campground: campground });

    });
});

// Reviews CREATE
router.post("/", middleware.isLoggedIn, middleware.checkReviewExistence, function (req, res) {
    // Lookup campground using ID
    Campground.findOne({ slug: req.params.slug }).populate("reviews").exec(function (err, campground) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Review.create(req.body.review, function (err, review) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            // Add author username/id and associated campground to the review
            review.author.id = req.user._id;
            review.author.username = req.user.username;
            review.campground = campground;
            // Save review
            review.save();
            campground.reviews.push(review);
            // Calculate the new average review for the campground
            campground.rating = calculateAverage(campground.reviews);
            // Save campground
            campground.save();
            req.flash("success", "Your review has been successfully added.");
            res.redirect('/campgrounds/' + campground.slug);
        });
    });
});

// Function that calculates the average of all the reviews' ratings
function calculateAverage(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return sum / reviews.length;
}

// Reviews EDIT
router.get("/:review_id/edit", middleware.checkReviewOwnership, function (req, res) {
    Review.findById(req.params.review_id, function (err, foundReview) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("reviews/edit", { slug: req.params.slug, review: foundReview });
    });
});


// Reviews UPDATE
router.put("/:review_id", middleware.checkReviewOwnership, function (req, res) {
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, { new: true }, function (err, updatedReview) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Campground.findOne({ slug: req.params.slug }).populate("reviews").exec(function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            // Recalculate campground average
            campground.rating = calculateAverage(campground.reviews);
            // Save changes
            campground.save();
            req.flash("success", "Your review was successfully edited.");
            res.redirect('/campgrounds/' + campground.slug);
        });
    });
});

// Reviews DESTROY
router.delete("/:review_id", middleware.checkReviewOwnership, function (req, res) {
    Review.findByIdAndRemove(req.params.review_id, function (err) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Campground.findOneAndUpdate({ slug: req.params.slug }, { $pull: { reviews: req.params.review_id } }, { new: true }).populate("reviews").exec(function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            // recalculate campground average
            campground.rating = calculateAverage(campground.reviews);
            //save changes
            campground.save();
            req.flash("success", "Your review was deleted successfully.");
            res.redirect("/campgrounds/" + req.params.slug);
        });
    });
});

module.exports = router;