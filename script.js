const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winning'); 
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  result.textContent = '';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? 'X' : 'O';

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw) {
  if (draw) {
    result.textContent = "It's a Draw!";
  } else {
    result.textContent = `${isXTurn ? "X" : "O"} Wins!`;

    WINNING_COMBINATIONS.forEach(combo => {
      if (combo.every(index => cells[index].classList.contains(isXTurn ? 'x' : 'o'))) {
        combo.forEach(index => cells[index].classList.add('winning'));
      }
    });
  }

  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}


function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
