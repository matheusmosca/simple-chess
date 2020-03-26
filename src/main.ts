import { initializePieces, boardMatrix, renderBoard } from './board';
import { playerMove, board } from './game';

initializePieces(boardMatrix);
renderBoard(boardMatrix, board);

board.addEventListener('click', ({ target }) => {

    playerMove(target);
    renderBoard(boardMatrix, board);
})