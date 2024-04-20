const selectBox = document.querySelector(".select-box");
const playBoard = document.querySelector(".play-board");
const resultBox = document.querySelector(".result-box");
const playerO = document.querySelector(".playerO");
const playerX = document.querySelector(".playerX");
const allBox = document.querySelectorAll(".box");
const resultText = document.querySelector(".result-text");
const scores = document.querySelectorAll(".score");

const winArr = [
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

let playerOIcon = `<img src="./img/icon-o.svg" alt="icon-O" />`;
let playerXIcon = `<img src="./img/icon-x.svg" alt="icon-X" />`;
let playerOIconFade = `<img src="./img/icon-o-light.svg" alt="icon-O-light" />`;
let playerXIconFade = `<img src="./img/icon-x-light.svg" alt="icon-X-light" />`;
let playerOArr = [];
let playerXArr = [];
let xScore = 0;
let oScore = 0;

let selectPlayer;

let prevWin = "";
let findWinner = false;

// on window load
window.onload = () => {
  allBox.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(box, index));
  });
};

function startGame(player) {
  selectPlayer = player;
  setActive(player);
  selectBox.classList.add("hide");

  setTimeout(() => {
    playBoard.classList.add("show");
  }, 300);
}

function restartGame() {
  allBox.forEach((box) => {
    box.innerHTML = "";
    box.style.pointerEvents = "unset";
  });
  if (prevWin == "") {
    setActive(selectPlayer);
  } else {
    setActive(prevWin);
  }

  playerOArr = [];
  playerXArr = [];
}

function quitGame() {
  restartGame();
  xScore = oScore = 0;
  selectPlayer = prevWin = "";
  findWinner = false;
  setActive("");

  scores.forEach((score) => {
    score.innerHTML = "0";
  });

  playBoard.classList.remove("show");
  resultBox.classList.remove("show");

  setTimeout(() => {
    selectBox.classList.remove("hide");
  }, 300);
}

function nextRound() {
  restartGame();
  findWinner = false;
  setActive(prevWin);
  resultBox.classList.remove("show");
}

function handleBoxClick(element, i) {
  const activePlayer = playerO.classList.contains("active") ? "o" : "x";
  const icon = activePlayer === "o" ? playerOIcon : playerXIcon;

  element.innerHTML = icon;

  if (activePlayer === "o") {
    playerOArr.push(i);
    removeIcon(playerOArr);
    fadeIcon(playerXArr, playerXIconFade);
  } else {
    playerXArr.push(i);
    removeIcon(playerXArr);
    fadeIcon(playerOArr, playerOIconFade);
  }

  element.style.pointerEvents = "none";

  if (playerOArr.length === 3 || playerXArr.length === 3) {
    checkWin(activePlayer === "o" ? playerOArr : playerXArr, activePlayer);
  }

  if (!findWinner) {
    setActive(activePlayer === "o" ? "x" : "o");
  }
}

// To remove first icon
function removeIcon(arr) {
  if (arr.length > 3) {
    allBox[arr[0]].innerHTML = "";
    allBox[arr[0]].style.pointerEvents = "unset";
    arr.shift();
  }
}

// To fade first icon
function fadeIcon(arr, icon) {
  if (arr.length == 3) {
    allBox[arr[0]].innerHTML = icon;
  }
}

// Set player active
function setActive(player) {
  if (player === "x") {
    playerX.classList.add("active");
    playerO.classList.remove("active");
  } else if (player === "o") {
    playerO.classList.add("active");
    playerX.classList.remove("active");
  } else {
    playerO.classList.remove("active");
    playerX.classList.remove("active");
  }
}

// Check if player win
function checkWin(arr, icon) {
  let tempArr = [...arr];
  tempArr.sort();

  for (let i = 0; i < 8; i++) {
    if (JSON.stringify(tempArr) === JSON.stringify(winArr[i])) {
      allBox.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      findWinner = true;
      return showResult(icon);
    }
  }
}

// show win result
function showResult(icon) {
  prevWin = icon;

  if (icon == "o") {
    oScore++;
    scores[0].innerHTML = oScore;
    resultText.style.color = "var(--first)";
  } else {
    xScore++;
    scores[1].innerHTML = xScore;
    resultText.style.color = "var(--second)";
  }

  resultText.innerHTML = `
          <img src="./img/icon-${icon}.svg" alt="" />
          <h1>WIN THE ROUND</h1>`;

  resultBox.classList.add("show");
}
