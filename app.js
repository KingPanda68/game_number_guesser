/*
game functions
-player must guess a number between 1 and 10
-player has a certain amount of guesses
-notify player of guesses left
-notify player of correct answer when lost
-let player choose to player again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign min and max values
minNum.textContent = min;
maxNum.textContent = max;

// play agin event
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// listen for submit
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //   check win
  if (guess === winningNum) {
    // won

    gameOver(true, `${winningNum} is correct, YOU WIN!!!`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // lost
      gameOver(
        false,
        `Game Over, YOU LOST!!! The correct answer was ${winningNum}`
      );

      // disable input
      guessInput.disabled = true;
    } else {
      // game continue/wrong answer

      // change border color
      guessInput.style.borderColor = "red";

      // clear input
      guessInput.value = "";

      // tell user it's a wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // disable input
  guessInput.disabled = true;

  // change border color
  guessInput.style.borderColor = color;

  // message color
  message.style.color = color;

  // set message
  setMessage(msg);

  // play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
