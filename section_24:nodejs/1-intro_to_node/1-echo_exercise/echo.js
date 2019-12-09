// Solution to the echo exercise

// 1. Using the command line, create a file "echo.js"
// touch echo.btn-group-justified

// 2. Inside the file, write a function named echo that takes 2 arguments: a string and a number, It should print out the string, number number of times
function echo(str, num){
    for (var i =1; i <= num; i++){
        console.log(str);
    }
}

// 3. Add the two examples below to the end of the file
echo("Echo!!!", 10);
echo("Tater tots", 3);

// 4. Lastly, run the contents of "echo.js" using Node
// node echo.js