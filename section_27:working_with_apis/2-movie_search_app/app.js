// Import Express
const express = require('express');
const app = express();

const request = require("request");

app.set('view engine', 'ejs');

var movieSearch = "california";

// Render a form for the research
app.get("/", (req,res) => {
    res.render("search");
});

app.get("/results", (req,res) => {
    const apiKey = "thewdb";
    var query = req.query.search;
    request(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`, (err, response, body) => {
        if (!err & response.statusCode === 200){
            // Turn the ext into an JavaScript object
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    })
});
// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Movie app running On Port ${PORT}`));