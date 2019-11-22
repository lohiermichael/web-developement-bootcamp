var header = document.getElementsByTagName("h1")[0];
var squares = document.querySelectorAll(".square");
var ColorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

var numberOfSquares = 6;
var colors = [];
var pickedColor;
// Display picked color
colorDisplay.textContent = pickedColor;

// Init function launched when the game starts
init();

function init() {
  // Create the mode buttons
  setupModeButtons();
  // Attribute the colors to the squares
  setupSquares();
  // Reset the game
  reset()
}

resetButton.addEventListener("click", function() {
    reset();
});


function setupModeButtons(){
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
          // We remove both the class selected to reset the selection carefully
          modeButtons[0].classList.remove("selected");
          modeButtons[1].classList.remove("selected");
          // We add the class selected to the button we clicked on
          this.classList.add("selected");
          // Figure out which squares to display
          this.textContent === "Easy"
            ? (numberOfSquares = 3)
            : (numberOfSquares = 6);
          // Reset the game
          reset();
        });
      }
}


function setupSquares(){
    for (var i = 0; i < squares.length; i++) {
        // Add event listener for each square
        squares[i].addEventListener("click", function() {
          var clickedColor = this.style.backgroundColor;
          if (clickedColor === pickedColor) {
            displayOnWin(clickedColor);
          } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try again";
          }
        });
      }
}

function reset() {
  // Generate all new colors
  colors = generateRandomColors(numberOfSquares);
  // Pick a new random color
  pickedColor = pickColor();
  // Change color display to match new picked color
  colorDisplay.textContent = pickedColor;
  // Change the colors of the squares on the page
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      // Add initial colors to squares
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }

  // Change the background back to the color by default
  header.style.backgroundColor = "steelblue";
  // Remove the massage
  messageDisplay.textContent = "";
  // Change the reset button button to New colors
  resetButton.textContent = "New colors";
}

function displayOnWin(color) {
  messageDisplay.textContent = "Correct!";
  // Change color of all squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }

  // Change color of the header
  header.style.background = color;
  resetButton.textContent = "Try Again?";
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(numColors) {
  var colors = new Array();
  for (var i = 1; i <= numColors; i++) {
    // Generate a red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // Generate a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // Generate a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    colors.push("rgb(" + r + ", " + g + ", " + b + ")");
  }
  return colors;
}