// Select element by id
var tag = document.getElementById("highlight");
console.log(tag);

// Select element by class name
console.log(document.getElementsByClassName("bolded"))

// Select element by tag
console.log(document. getElementsByTagName("li"))

// Query selector
// It only takes the first found tag 
console.log(document.querySelector("li.bolded"));

// For all query selection
console.log(document.querySelectorAll(".bolded"))