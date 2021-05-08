let gameOverTimer;
let gameActive = true;
let currentPlayer = 'X';

const initGameState = ["", "", "", "", "", "", "", "", ""];
let gameState = [...initGameState];

const statusDisplay = document.querySelector('.overlay-content');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Draw!`;

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <=7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]]
    let b = gameState[winCondition[1]]
    let c = gameState[winCondition[2]]
    if (a === '' || b === '' || c === ''){
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break
    }
  };

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    handleOverlay();
    gameActive = false;
    return;
  };

  // check for draw
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    handleOverlay();
    gameActive = false;
    return;
  };

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  
  if (gameState[clickedCellIndex] === "" && gameActive) {
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
 return 
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = [...initGameState];
  statusDisplay.innerHTML = ""
  document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
  gameOverTimer = null;
}

function handleOverlay() {
  document.getElementById('gameOver').style.width = '100%';
  gameOverTimer = setTimeout(function() {
    document.getElementById('gameOver').style.width = '0%'
  }, 3000)
}
function handleCloseBtn() {
  document.getElementById('gameOver').style.width = '0%'
}

// event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
document.querySelector('.closebtn').addEventListener('click', handleCloseBtn)
