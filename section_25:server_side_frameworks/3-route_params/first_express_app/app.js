// Importation of Express
var express = require("express");

// The common practice is to save the instance of the library under the name app
var app = express();

// Play around with routes
// "/" => "Hi there!"
// On "/", we run a call back function which takes two arguments:
// 1. request
// 2. result
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// "/dog" => "WAOUF!"
app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog")
    res.send("WAOUF!");
});

// Route parameters
// Pattern for /r/<anySingleThingFollowingIt>
app.get("/r/:subredditName", function(req, res){
    // This gives the parameters given as patterns in the route
    var subreedit = req.params.subredditName;
    res.send("Welcome to the " + subreedit.toUpperCase() + " subreedit")
});


app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);    
    res.send("Welcome to the comments page")
});

// The star route references all the routes aside from those mentioned before
app.get("*", function(req, res){
    res.send("YOU ARE A STAR!!!")
});

// Tell Express to listen for requests after the routes
app.listen(3000, function(){
    console.log("Serving dog demo on port 3000");
});