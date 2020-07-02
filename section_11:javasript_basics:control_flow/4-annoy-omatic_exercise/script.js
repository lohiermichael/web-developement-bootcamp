// Ask the user "Are we there yet"
var answer =  prompt("Are we there yet");

// // Keep asking again and again until they enter "yes" OR "yeah"
// while ((answer !== "yes") && (answer !== "yeah")){
//     answer = prompt("Are we there yet")
// }

// // Then, alert "Yeah, we finally made it!"
// alert("Yeah, we finally made it!")

// BONUS
while (!(answer.includes("yes")) && !(answer.includes("yeah"))){
    answer = prompt("Are we there yet")
}
alert("Yeah, we finally made it!")
