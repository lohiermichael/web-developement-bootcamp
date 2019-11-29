// 1. Click

// Add a click event on h1
$("h1").click(function() {
  alert("You have just clicked on h1");
});

// It works with a collection of elements
$("button").click(function() {
  alert("You have just clicked on a button");
});

// Change the background color on click
$("button").click(function() {
  // Note the jQuery version of "this" is different
  $(this).css("background", "pink");
});

$("button").click(function() {
  // Note the jQuery version of "this" is different
  var text = $(this).text();
  console.log("You clicked on " + text);
});

// 2. Key press

// Add keypress on the input
$("input").keypress(function() {
  console.log("Your pressed a key");
});

// Console log the text when the person presses "Enter"
$("input").keypress(function(event) {
  if (event.keyCode === 13){
    console.log($(this). val());
  }
});

// 3. "On" method



