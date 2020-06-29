import { initializePieces, boardMatrix, renderBoard } from './board';
import { playerMovement, board, findKingCoord } from './game';
import { playerColor } from './clicksEvents';
import { isInCheck } from './check';
import { checkEndGame } from "./endgame";
import { calculateBoardSize } from "./boardSizeCalc";

calculateBoardSize();
initializePieces(boardMatrix);
renderBoard(boardMatrix, board);

board.addEventListener('click', ({ target }) => {
  playerMovement(target);
  checkEndGame(playerColor, boardMatrix);
  renderBoard(boardMatrix, board);
  console.log(isInCheck(findKingCoord(playerColor), playerColor, boardMatrix));
});