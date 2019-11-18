// Change color to h1 when clicking on it
var h1 = document.querySelector("h1");
h1.addEventListener("click", function(){
    h1.style.color = "blue";
})

// Anywhere in the ul the click event is active
var ul = document.querySelector("ul");
ul.addEventListener("click", function(){
    console.log("ul was clicked")
})

// Change color of an li on click

function changeColor() {
    this.style.color = "pink";
}

var lis = document.querySelectorAll("li");
for (i = 0; i < lis.length; i++){
    lis[i].addEventListener("click", changeColor)
    }
