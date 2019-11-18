// Change the background color when we click on the CLICK ME button
var button = document.getElementsByTagName("button")[0];

// My way

// button.addEventListener("click", function(){
//     if ( document.body.style.background === "white"){
//         document.body.style.background = "purple";
//     }
//     else{
//         document.body.style.background = "white";
//     }
// })

// First solution

// var isPurple = false;
// button.addEventListener("click", function(){
//     if (isPurple){
//         document.body.style.background = "white";
//     }
//     else{
//         document.body.style.background = "purple";
//     }
//     isPurple = !isPurple;
//     }
// )

// Best solution with CSS Toggle
button.addEventListener("click", function(){
    document.body.classList.toggle("purple");
})