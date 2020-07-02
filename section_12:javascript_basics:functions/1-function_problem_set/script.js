// Function that says True if a given number is even
function isEven(number) {
    return (number%2 === 0);
}

// Tests
console.log("Even exercise")
console.log(isEven(4))
console.log(isEven(21))
console.log(isEven(68))
console.log(isEven(333))

// Factorial function
function factorial(number){
    var res = 1;
    for (var i=2; i <= number; i++){
        res *= i;
    }
    return res
}


// Tests
console.log("Factorial exercise")
console.log(factorial(5))
console.log(factorial(2))
console.log(factorial(10))
console.log(factorial(0))

// Kebab to Snake exercise
function kebabToSnake(s) {
    return s.replace(/-/g, "_");
}

// Tests
console.log("Kebab exercise")
console.log(kebabToSnake("hello-world"))
console.log(kebabToSnake("dogs-are-awesome"))
console.log(kebabToSnake("blah"))
