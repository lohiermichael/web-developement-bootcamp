var express = require("express");
var app = express();



app.get("/", function(req, res){
    // We can either write some HTML here but it is really painful
    // res.send("<h1>Welcome to the home page!<\h1><h2>blabla<\h2>");
    // Or we can render a file by using the render method on the res object
    // We need to create the file in a separate directory
    res.render("home.ejs")
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    // res.send("You fell in love with " + thing);

    // We can give arguments in the render method as parameters that will be used in the ejs file
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", (req,res) => {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Michael"},
        {title: "Post 3", author: "Elliot"}
    ];
    res.render("posts.ejs", {posts: posts})
});


app.listen(3000, function() {
    console.log("More express on port 3000");
  });