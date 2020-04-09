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

export function tryMovement({ pieceInstance }: IPieceDTO, { coord }: IPieceDTO): Boolean {
  const list = pieceInstance.possibleMovementsList(boardMatrix);
  let check: boolean = false;
    // Check if the coordinate (coord) is present in the list of possibleMovements
    list.forEach(e => {
      if (e.row === coord.row && e.column === coord.column) {
        check = true
      }
    });
    // If check is true so make the movement
    if (!!check) {
      pieceInstance.doMovement(coord);
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
