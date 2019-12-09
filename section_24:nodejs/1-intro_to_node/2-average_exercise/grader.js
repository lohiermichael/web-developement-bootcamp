// 1. Create a new file, "grader.js"
// touch grader.js

// 2. In the file define a new function named "average". 
// It should take a single parameter: an array of test scores (all numbers)
// It should return the average score in the array, rounded to the nearest whole number
function average(scores){
    // First calculate the sum of the elements of the array
    var sum = 0;
    for (var i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    // Calculate the average by dividing the sum by the length of the array
    var avg = sum / scores.length;
    // Return the rounded result
    return Math.round(avg);
}


// 3. Add the two examples below to the end of the file
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); // should return 94

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)) // should return 68


// 4. Lastly, run the contents of "grade.js" using Node
// node grader.js