var age = Number(prompt("Enter your age"))
if (age < 0){
    console.log("Your age is invalid !!!")
}
if (age == 21){
    console.log("Happy birthday!")
}
if ((age % 2) !== 0){
    console.log("Your age is odd!")
}
if (age % Math.sqrt(age) === 0){
    console.log("Perfect square!")
}