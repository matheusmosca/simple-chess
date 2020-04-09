import { initializePieces, boardMatrix, renderBoard } from './board';
import { playerMovement, board } from './game';

initializePieces(boardMatrix);
renderBoard(boardMatrix, board);

board.addEventListener('click', ({ target }) => {
    playerMovement(target);
    renderBoard(boardMatrix, board);
})