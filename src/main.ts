import { initializePieces, boardMatrix, renderBoard } from './board'

const board = document.querySelector('.board');

type Color = 'white' | 'black';

interface ICoordinate {
    row: number
    column: number
}

interface IPieceDTO {
    coord: ICoordinate
    color: Color
    pieceType: string
}

initializePieces(boardMatrix);
renderBoard(boardMatrix, board);

function findPiecePosition(target: HTMLDivElement): IPieceDTO {
    const row: number = parseInt((target as HTMLDivElement).getAttribute('row'));
    const column: number = parseInt((target as HTMLDivElement).getAttribute('column'));
    const pieceType = boardMatrix[row][column].constructor["name"];
    const { color } = boardMatrix[row][column];
    
    const coord: ICoordinate = { row, column }; 

    return { coord, color, pieceType };
}

// board.classList.length
board.addEventListener('click', ({ target }) => {
    const pieceDTO = findPiecePosition((target as HTMLDivElement));
        console.table(pieceDTO);
})
