// Import express
var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  // For each animal the message sent is different
  // `the hashmap is the best data object for this case
  var sounds = {
    pig: "Oink!",
    dog: "Woof",
    cow: "Moo"
  };
  var animal = req.params.animal.toLocaleLowerCase();
  sound = sounds[animal];
  res.send("The " + animal +  " says '" + sound + "'")
});

app.get("/repeat/:word/:numberRepetition", function(req, res) {
  var word = req.params.word;
  var numberRepetition = Number(req.params.numberRepetition);
  // Future message ro display
  var message = "";
  for (var i = 0; i < numberRepetition; i++) {
    message += word + " ";
  }
  // Remove the last space
  message = message.slice(0, -1);
  //  Print out the result
  res.send(message);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, function() {
  console.log("Serving dog demo on port 3000");
});
