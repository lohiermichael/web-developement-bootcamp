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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://t4.ftcdn.net/jpg/02/85/46/07/240_F_285460722_WlwSgE1pRZgx1BT29xtD6C4Zzob1UUqr.jpg"
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

// var campgrounds = [
//   {
//     name: "Salmon Creek",
//     image:
//       "https://t4.ftcdn.net/jpg/01/10/15/81/240_F_110158155_7i78ZS7mygCZHoEt4VV292IZyC9PqY5o.jpg"
//   },
//   {
//     name: "Granite Hill",
//     image:
//       "https://t4.ftcdn.net/jpg/02/85/46/07/240_F_285460722_WlwSgE1pRZgx1BT29xtD6C4Zzob1UUqr.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image:
//       "https://t4.ftcdn.net/jpg/01/57/18/95/240_F_157189589_Rx0JhB9jbM0uW7QbCCWrAtMVxpRqz2TG.jpg"
//   }
// ];

// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// Campgrounds
app.get("/campgrounds", (req, res) => {
    //   Retrieve campgrounds from the database
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log("Error", err);
        }
        else {
            console.log("All the campgrounds");
            console.log(campgrounds);
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    });

});

// Implement new campgrounds with post routes on campground
app.post("/campgrounds", (req, res) => {
  // Get data from form and add to campground array
  var newName = req.body.name;
  var newImage = req.body.image;
  var newCampground = { name: newName, image: newImage };
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

// Page with the form to send the data to the campground list
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));
