var p = document.getElementsByTagName("p")[0];
// Select text content
console.log(p.textContent)
// Select text content with anchor tags 
console.log(p.innerHTML)

var ul = document.querySelector("ul");
// Text content of an ul
console.log(ul.textContent)
// Select text content with anchor tags 
console.log(ul.innerHTML)

// Change the text of the h1
document.querySelector("h1").textContent = "END OF THIS LESSON";

// It is going to be interpreted as a pure text and not as an h1
document.body.textContent = "<h1>GOOD BYE</h1>"
// We can use innerHTML for this
document.body.innerHTML = "<h1>GOOD BYE</h1>"
