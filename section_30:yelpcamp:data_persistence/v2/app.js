// Import Express
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

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

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://t4.ftcdn.net/jpg/02/85/46/07/240_F_285460722_WlwSgE1pRZgx1BT29xtD6C4Zzob1UUqr.jpg",
//     description: "This is a wonderful granite hill. I really advise you to visit the place."
//   },
//   function(err, campground) {
//     if (err) {
//       console.log("Error: ", err);
//     } else {
//       console.log("New campground", campground);
//     }
//   }
// );

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


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
            console.log("All the campgrounds");
            console.log(campgrounds);
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
    Campground.findById(req.params.id, function (err, foundCampground) {
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
