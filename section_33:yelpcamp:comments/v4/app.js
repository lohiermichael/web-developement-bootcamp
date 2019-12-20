// Import Express
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");
  
  
  
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
    
  // Execute the module to test the database
  seedDB();
    
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
            res.render("index", { campgrounds: campgrounds });
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
    res.render("new");
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
            res.render("show", {campground: foundCampground});
        }
    });
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));
