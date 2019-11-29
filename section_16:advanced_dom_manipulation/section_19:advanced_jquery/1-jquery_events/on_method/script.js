// Try to use the "on" method on h1
$("h1").on("click", function(){
  $(this).css("color", "purple");
});

// Try with keypress
$("input").on("keypress", function(){
  console.log("KEY PRESSED")
});

// Hovering event
$("button").on("mouseenter", function(){
  $(this).css("font-weight", "bold");
});
$("button").on("mouseleave", function(){
  $(this).css("font-weight", "normal");
});

