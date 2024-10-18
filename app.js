let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let undoBtn = document.querySelector("#undo-btn");
let themeBtn = document.querySelector("#theme-btn");

let turnO = true; // playerX, playerO
let count = 0; // To track draw
let playerX = "Player X";
let playerO = "Player O";
let playerXScore = 0;
let playerOScore = 0;
let lastMove = null; // To track the last move for undo

const playerXScoreEl = document.querySelector("#playerX-score");
const playerOScoreEl = document.querySelector("#playerO-score");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msgContainer.classList.remove("show");
  lastMove = null; // Clear last move
};

// Update the score of the winner
const updateScore = (winner) => {
  if (winner === "X") {
    playerXScore++;
    playerXScoreEl.innerText = playerXScore;
  } else {
    playerOScore++;
    playerOScoreEl.innerText = playerOScore;
  }
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;

      lastMove = { index, symbol: box.innerText }; // Save the last move

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  msgContainer.classList.add("show");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  updateScore(winner);
  let winningPlayer = winner === "X" ? playerX : playerO;
  msg.innerText = `Congratulations, ${winningPlayer} wins!`;
  msgContainer.classList.remove("hide");
  msgContainer.classList.add("show");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Undo the last move
undoBtn.addEventListener("click", () => {
  if (lastMove) {
    boxes[lastMove.index].innerText = "";
    boxes[lastMove.index].disabled = false;
    turnO = lastMove.symbol === "O"; // Switch back the turn
    count--;
    lastMove = null; // Clear last move after undo
  }
});

// Switch between light and dark themes
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
