import { initializePieces, boardMatrix, renderBoard } from './board';
import { playerMovement, board, findKingCoord } from './game';
import { playerColor } from './clicksEvents';
import { isInCheck } from './check';
import { checkEndGame } from "./endgame";
import { calculateBoardSize } from "./boardSizeCalc";

calculateBoardSize();
initializePieces(boardMatrix);
renderBoard(boardMatrix, board);
setInfo();

var seconds: number = 0;
var interval = setInterval(setTimer, 1000);
var color = playerColor;

board.addEventListener('click', ({ target }) => {
  playerMovement(target);
  checkEndGame(playerColor, boardMatrix);
  renderBoard(boardMatrix, board);
  setInfo();
  console.log(isInCheck(findKingCoord(playerColor), playerColor, boardMatrix));
});

function setTimer(): any {
  const timer: HTMLElement = document.querySelector('.info__timer');
  
  seconds++;
  timer.textContent = String(seconds).padStart(2, '0');
}

function setColor(): void {
  const color: HTMLElement = document.querySelector('.info__color');

  color.textContent = playerColor.substring(0, 1).toUpperCase() + playerColor.substring(1);
}

function setInfo(): any {
  if(color !== playerColor) {
    color = playerColor;
    seconds = 0;
  }

  setColor();
}