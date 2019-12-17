// Import Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var campgrounds = [
    {name: "Salmon Creek", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"},
    {name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"},           
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"}
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Landing page
app.get("/", (req,res) => {
    res.render("landing");
});

// Campgrounds
app.get("/campgrounds", (req,res) => {
    res.render("campgrounds", {campgrounds: campgrounds})
});

// Implement new campgrounds with post routes on campground
app.post("/campgrounds", (req,res) => {
    // Get data from form and add to campground array
    console.log(req.body);
    var newName = req.body.name;
    var newImage = req.body.image;
    var newCampground = {name: newName, image: newImage};
    campgrounds.push(newCampground);
    // Redirect back to campgrounds page
    // By default it will be redirected to the get route
    res.redirect("/campgrounds"); 
});

// Page with the form to send the data to the campground list
app.get("/campgrounds/new", (req,res) => {
    res.render("new");
});


// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));