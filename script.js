"use strict";

// let totalScoreFirst = document.querySelector(".game__output--0"); //FINAL SCORE 0
// let totalScoreSecond = document.querySelector(".game__output--1"); //FINAL SCORE 1
// let scoreFirst = document.querySelector(".game__score--0"); //MINI SCORE 0
// let scoreSecond = document.querySelector(".game__score--1"); //MINI SCORE 1
let currentDice = document.querySelector(".dice"); //CUBE DICE
currentDice.classList.add("hidden");
let currentScoreTemp = 0; // MINI-ACC
let activePlayer = 0; //flag
let scores = [0, 0]; //TOTAL ACCS
const rollButton = document.querySelector(".game__tab--roll");
const holdButton = document.querySelector(".game__tab--hold");
const newButton = document.querySelector(".game__tab--new");

rollButton.addEventListener("click", rollTheDice);

holdButton.addEventListener("click", holdTheScore);

newButton.addEventListener("click", restartTheGame);

function rollTheDice() {
  let random = Math.floor(Math.random() * (6 - 1) + 1);
  console.log(random);
  currentDice.classList.remove("hidden");
  currentDice.src = `Dice-${random}.png`;

  if (random !== 1) {
    currentScoreTemp += random;
    document.querySelector(`.game__score--${activePlayer}`).textContent =
      currentScoreTemp;
  } else {
    document.querySelector(`.game__score--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    currentScoreTemp = 0;
  }
}

function holdTheScore() {
  document.querySelector(`.game__score--${activePlayer}`).textContent = 0;
  scores[activePlayer] += currentScoreTemp;
  currentScoreTemp = 0;
  document.querySelector(`.game__output--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document.querySelector(`.game__player--${activePlayer}`).style.backgroundColor = "green";
    holdButton.removeEventListener("click", holdTheScore);
    rollButton.removeEventListener("click", rollTheDice);
  }
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function restartTheGame() {
  currentDice.classList.add("hidden");
  document.querySelector(".game__output--0").textContent = 0;
  document.querySelector(".game__output--1").textContent = 0;
  document.querySelector(".game__score--0").textContent = 0;
  document.querySelector(".game__score--1").textContent = 0;
  scores = [0, 0];
  currentScoreTemp = 0;
  document.querySelector(`.game__player--0`).style.backgroundColor = "#fff4";
  document.querySelector(`.game__player--1`).style.backgroundColor = "#fff4";
  holdButton.addEventListener("click", holdTheScore);
  rollButton.addEventListener("click", rollTheDice);
}
