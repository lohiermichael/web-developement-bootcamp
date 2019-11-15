var h1 = document.querySelector("h1");
// console.log(h1.style);

// // Change the color of the h1 to yellow
// h1.style.color = "yellow";

// // Change the border of the h1
// h1.style.border = "solid red 1px"

var p = document.getElementsByTagName("p")[0]
var interval = setInterval(function(){
    p.classList.toggle("big")
}, 1000);

clearInterval(interval);