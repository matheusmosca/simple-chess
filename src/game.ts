import { boardMatrix, renderBoard } from './board';
import { Piece } from './pieces/piece';

export const board = document.querySelector('.board');

export interface ICoordinate {
    row: number
    column: number
}

export interface IPieceDTO {
    coord: ICoordinate
    pieceInstance?: Piece
}

function findPiecePosition(target: HTMLDivElement): IPieceDTO {
    const row: number = parseInt((target as HTMLDivElement).getAttribute('row'));
    const column: number = parseInt((target as HTMLDivElement).getAttribute('column'));
    const coord: ICoordinate = { row, column }; 
    const pieceInstance = boardMatrix[row][column];
    
    return { coord, pieceInstance };
}

// export function removeHTMLClass({ row, column }: ICoordinate): void {
//     const divs = Array.from(document.querySelectorAll(`[row='${row}']`));
//     console.log(divs)
//     let div = divs.filter(n => {
//         // let x: string[] = n.getAttributeNames;
//         if (n.getAttributeNames.inclu) {
//             return true
//         }
//     });

//     if (boardMatrix[row][column] !== null) {
//         const piece = boardMatrix[row][column].constructor["name"].toLowerCase();
//         const { color } = boardMatrix[row][column];
//         console.log(div)
//         if (div.classList.contains(piece) && div.classList.contains(color)) {
//             div.classList.remove(piece);
//             div.classList.remove(color);
//         }

//     }

// }

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
    if (!!check) {
        pieceInstance.doMovement(coord);

    }
    renderBoard(boardMatrix, board);
}

let hasClickedAPiece = false
let firstPieceDTO: IPieceDTO;
let secondPieceDTO: IPieceDTO;

export function playerMove(target: EventTarget) {
    if (!hasClickedAPiece) {
        firstPieceDTO = findPiecePosition((target as HTMLDivElement));
        hasClickedAPiece = true;
    } else {
        secondPieceDTO = findPiecePosition((target as HTMLDivElement));
        hasClickedAPiece = false;

        tryMovement(firstPieceDTO, secondPieceDTO);
    }
}