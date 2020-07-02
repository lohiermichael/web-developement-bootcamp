//  Let's make a function that console.log all the numbers divided by three in an array with a For Loop
var numbers = [1, 3, 4, 5, 1, 5,9, 454, 3, 15];

for(var i =0; i < numbers.length; i++){
    if (numbers[i] % 3 === 0){
        console.log(numbers[i])
    }
}