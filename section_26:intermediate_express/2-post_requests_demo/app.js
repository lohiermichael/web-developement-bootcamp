// Import Express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("home");
});

// List of friends
friends = ["Michael", "Yossi", "Laurenz", "Kevin"];


app.post("/addfriend", (req,res) => {
    // Using a package named body parser
    // newFriend is the name attribute from the input of the ejs file
    var newFriend = req.body.newFriend;
    // Append the new friend to the friends array
    friends.push(newFriend);
    // We then redirect the user to the /friends route
    res.redirect("/friends");
});

app.get("/friends", (req,res) => {
    res.render("friends", {friends: friends});
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log('Server Running On Port $(PORT)')); 