import { boardMatrix, renderBoard } from './board';
import { Piece, Color } from './pieces/piece';
import { firstClick, secondClick } from "./clicksEvents";

export const board = document.querySelector('.board');

export interface ICoordinate {
    row: number
    column: number
}

export interface IPieceDTO {
    coord: ICoordinate
    pieceInstance?: Piece
}

export function tryMovement({ pieceInstance }: IPieceDTO, { coord }: IPieceDTO, playerColor: Color): Boolean {
  // const list = pieceInstance.possibleMovementsList(boardMatrix);
  const list = checkingMovements(pieceInstance);
  console.table(list);
  let check: boolean = false;
  // Check if the coordinate (coord) is present in the list of possibleMovements
  list.forEach(e => {
    if (e.row === coord.row && e.column === coord.column) {
      check = true
    }
  });
  // If check is true so make the movement
  if (!!check) {
    pieceInstance.doMovement(coord, boardMatrix);
    renderBoard(boardMatrix, board);
    return true
  }
}

export function changePlayer(playerColor: Color): Color {
  if (playerColor === 'white') {
    return 'black'
  } else {
    return 'white'
  }
}

export function playerMovement(target: EventTarget) {
  if (!firstClick(target)) {
    secondClick(target);
  }
}

export function findKingCoord(playerColor: Color): ICoordinate {
  const kingCoord: ICoordinate = { row: null, column: null };
  boardMatrix.forEach((subarray) => {
    subarray.forEach((n) => {
      if (n !== null) {
        const piece = n.constructor["name"].toLowerCase();
        const color = n.color;
        if (piece === 'king' && color === playerColor) {
          kingCoord.row = n.row;
          kingCoord.column = n.column;
        }
      }
    });
  });
  return kingCoord;
}

export function checkingMovements(pieceInstance: Piece): ICoordinate[] {
  const list = pieceInstance.possibleMovementsList(boardMatrix);

  const checkedMovements = list.filter((c) => { 
      return !pieceInstance.fakeMovement(c, boardMatrix);
  });
  
  return checkedMovements;
}