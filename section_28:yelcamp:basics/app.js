// Import Express
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Landing page
app.get("/", (req,res) => {
    res.render("landing");
});

// Campgrounds
app.get("/campgrounds", (req,res) => {
    var campgrounds = [
        {name: "Salmon Creek", image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"},
        {name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"},           
        {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297fd4924ec751_340.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds})
});



// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));