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
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})

// "/dog" => "WAOUF!"
app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog")
    res.send("WAOUF!");
})

// Tell Express to listen for requests after the routes
app.listen(3000, function(){
    console.log("Serving dog demo on port 3000");
})