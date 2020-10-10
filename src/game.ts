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
  const list = checkingMovements(pieceInstance);
  console.table(list);
  let check: boolean = false;
  // Check if the coordinate (coord) is present in the list of possibleMovements
  list.forEach(e => {
    if (e.row === coord.row && e.column === coord.column) {
      check = true
    }
  });
  
  let checkEspecialMovements = especialMovements(pieceInstance, coord);
  if (!checkEspecialMovements && !!check) {
    if (pieceInstance.constructor["name"].toLowerCase() === 'pawn') {
      console.log(pieceInstance.doubleMovementTurn);
      if (Math.abs(coord.row - pieceInstance.row) === 2) {
        pieceInstance.doubleMovementTurn = Piece.turn;
      }
      if(coord.row == 0 || coord.row == 7){
        pieceInstance.promote = true;
      }
    }
    pieceInstance.doMovement(coord, boardMatrix);
    renderBoard(boardMatrix, board);
    
    return true
  } else if (!!checkEspecialMovements) {
    return true;
  }
  return false
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

function especialMovements(pieceInstance: Piece, coord: ICoordinate): boolean {
  let bool: boolean = false;
  if (pieceInstance.constructor["name"].toLowerCase() === 'king') {
    const castlingList = pieceInstance.avaiableCastling(boardMatrix);
    castlingList.forEach(e => {
      if (e.row === coord.row && e.column === coord.column) {
        pieceInstance.doCastling(coord, boardMatrix);
        renderBoard(boardMatrix, board);
        bool = true;
      }
    });
  } else if (pieceInstance.constructor["name"].toLowerCase() === 'pawn') {

    const { row, column } = pieceInstance.enPassant(boardMatrix);
    if (row === coord.row && column === coord.column ) {

      pieceInstance.doEnpassant(coord, boardMatrix);
      renderBoard(boardMatrix, board);
    
      return true;
    }
  }
  return bool;
}

export function checkingMovements(pieceInstance: Piece): ICoordinate[] {
  const list = pieceInstance.possibleMovementsList(boardMatrix);

  const checkedMovements = list.filter((c) => { 
      return !pieceInstance.fakeMovement(c, boardMatrix);
  });
  
  return checkedMovements;
}