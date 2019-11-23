// Exercise 1: Select all divs and give them a purl=ple background
$("div").css("background", "purple");

// Exercise 2: Select all divs with class "highlight" and make them 200px wide
$("div.highlight").css("width", "200px");

// Exercise 3: Select the div with the id "third" and give it an orange border
$("#third").css("border", "2px solid orange");

// Bonus exercise: Select the first div only and change its front to pink
// $("div:nth-of-type(1)").css("color", "pink");
// $("div:first").css("color", "pink");
$("div:first-of-type").css("color", "pink");
