// Define the tags
var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var resetButton= document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");


// Define game variables
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;


p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1Score ++;
        if (p1Score === winningScore){
            p1Display.classList.add("winner") 
            gameOver = true;
        }
        p1Display.textContent = p1Score;
    }
})

p2Button.addEventListener("click", function(){
    if (!gameOver){
        p2Score ++;
        if (p2Score === winningScore){
            p2Display.classList.add("winner") 
            gameOver = true;
        }
        p2Display.textContent = p2Score;
    }
})

resetButton.addEventListener("click", function(){
    reset()
})

// Any type of change of the value of the input
numInput.addEventListener("change", function(){
    winningScoreDisplay.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})

// Reset function to restart the game from 0
function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove("winner")
    p2Display.classList.remove("winner")
    gameOver = false;
}