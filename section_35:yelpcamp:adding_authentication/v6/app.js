// Import Express
const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  expressSession = require("express-session"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

const app = express();

// Connect to the database
mongoose.connect(
  "mongodb://localhost/yelp_camp",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
  );
    
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// We mention __dirname in case it changes
app.use(express.static(__dirname + "/public"));
// Execute the module to test the database
seedDB();


// Passport configuration
app.use(expressSession({
  secret: "This is a good app",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



    
// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// INDEX route - list all campgrounds
app.get("/campgrounds", (req, res) => {
    //   Retrieve campgrounds from the database
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log("Error", err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });

});

// CREATE route - add new campground to DB
app.post("/campgrounds", (req, res) => {
  // Get data from form and add to campground array
  var newName = req.body.name;
  var newImage = req.body.image;
  var newDescription = req.body.description;
  var newCampground = { name: newName, image: newImage, description: newDescription };
  // Create a campground and save it in the database
  Campground.create(newCampground, function(err, newlyCreated){
      if (err){
          console.log("Error: ", err);
      }
      else{
          // Redirect back to campgrounds page
          // By default it will be redirected to the get route
          res.redirect("/campgrounds");
      }
  })
  
});

// NEW route - display from to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// SHOW route - display info about one campground
app.get("/campgrounds/:id", (req,res) => {
    // Find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err){
            console.log("Error", err);
        }
        else {          
            // Render show campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// =============================
// COMMENTS ROUTES
// =============================

// NEW route
app.get("/campgrounds/:id/comments/new", (req,res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) console.log("Err: ", err);
    else {
      console.log(foundCampground);
      res.render("comments/new", {campground:foundCampground}); 
    }
  });
});

// CREATE route
app.post("/campgrounds/:id/comments", (req, res) => {
  // Lookup campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log("Err: ", err);
      redirect("/campgrounds");
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) console.log("Err: ", err);
        else {
          // Connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // Redirect to the SHOW page of the campground of the comment
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// =============================
// AUTH ROUTES
// =============================

// Handle sign up logic
app.get("/register", (req,res) => {
  res.send("/register")  
});

// Show register form
app.post("/register", (req,res) => {
  var newUser = new User({username: req.body.username});
  console.log(newUser);
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log("Err: ", err);
      return res.render("register");
    };
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds")
    })
  });
});




// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));
