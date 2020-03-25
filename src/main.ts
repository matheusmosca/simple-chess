import { initializePieces, boardMatrix, renderBoard } from './board';
import { Piece } from './pieces/piece';

const board = document.querySelector('.board');

export interface ICoordinate {
    row: number
    column: number
}

export interface IPieceDTO {
    coord: ICoordinate
    pieceInstance?: Piece
}

initializePieces(boardMatrix);
renderBoard(boardMatrix, board);

function findPiecePosition(target: HTMLDivElement): IPieceDTO {
    const row: number = parseInt((target as HTMLDivElement).getAttribute('row'));
    const column: number = parseInt((target as HTMLDivElement).getAttribute('column'));
    const coord: ICoordinate = { row, column }; 

    const pieceInstance = boardMatrix[row][column];

    return { coord, pieceInstance };
}

let hasClickedAPiece = false
let firstPieceDTO: IPieceDTO;
let secondPieceDTO: IPieceDTO;

// 
    function tryMovement({ pieceInstance }: IPieceDTO, { coord }: IPieceDTO): void {
        const list = pieceInstance.possibleMovementsList(boardMatrix);
        let check: boolean = false;
        // Check if the coordinate (coord) is present in the list of possibleMovements
        list.forEach(e => {
            if (e.row == coord.row && e.column == coord.column) {
                check = true
            }
        });
        // If check is true so make the movement
        check ? pieceInstance.doMovement(boardMatrix, coord) : 0; 
        renderBoard(boardMatrix, board);
    }

    function playerMove(target: EventTarget)/*: IPieceDTO[] */{
    if (!hasClickedAPiece){
        firstPieceDTO = findPiecePosition((target as HTMLDivElement));
        hasClickedAPiece = true;
     } else {
         secondPieceDTO = findPiecePosition((target as HTMLDivElement));
         hasClickedAPiece = false;

         tryMovement(firstPieceDTO, secondPieceDTO);
        }
    }
    
    board.addEventListener('click', ({ target }) => {
        // const { coord } = findPiecePosition((target as HTMLDivElement));
        // if (boardMatrix[coord.row][coord.column] === null) {
        //     console.log(null);
        // } else {

        //     console.log(boardMatrix[coord.row][coord.column].constructor["name"]);
        // }
        playerMove(target);
        renderBoard(boardMatrix, board);
})