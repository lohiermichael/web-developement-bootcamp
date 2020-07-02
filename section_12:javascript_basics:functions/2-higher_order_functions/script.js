// setInterval: an example of higher order functions
function sing() {
    console.log("Twinkle, twinkle, little star");
    console.log("how I wonder where you are");
}

// setInterval(sing, 1000)
setInterval(function(){
    console.log("I am an anonymous function");
    console.log("THIS IS AWESOME!")
},
200)