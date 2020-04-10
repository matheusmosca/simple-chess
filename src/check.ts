import { ICoordinate } from "./game";
import { Color } from "./pieces/piece";
import { pickPiece, IPieceType } from "./board";

export function isInCheck({ row, column }: ICoordinate, color: Color): boolean {
  let checkBoolean: boolean = false;
  //* Pawn check
  pawnCheck({ row, column}, color) ? checkBoolean = true : 0;

  //* Bishop and Queen check
  bishopCheck({ row, column }, color) ? checkBoolean = true : 0;

  //* Rook and Queen check
  rookCheck({ row, column }, color) ? checkBoolean = true: 0
  
  //* King check
  kingCheck({ row, column }, color) ? checkBoolean = true: 0

  //* Knight check
  knightCheck(pickPiece({ row: row + 2, column: column - 1}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row + 2, column: column + 1}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row - 2, column: column + 1}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row - 2, column: column - 1}), color) ? checkBoolean = true : 0
  
  knightCheck(pickPiece({ row: row - 1, column: column + 2}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row + 1, column: column + 2}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row + 1, column: column - 2}), color) ? checkBoolean = true : 0
  knightCheck(pickPiece({ row: row - 1, column: column - 2}), color) ? checkBoolean = true : 0

  return checkBoolean;
  // TODO see board.ts pickPiece func //!!
}

function knightCheck({ pieceType, color: pieceColor }: IPieceType, color: Color ): boolean {
  // const { pieceType, color: pieceColor } = pickPiece({ row, column });
  if (pieceType === 'knight' && pieceColor !== color) {
    return true;
  }
  return false;
}  

function pawnCheck({ row, column }: ICoordinate, color: Color): boolean {
  let mov = 1;
  color === 'white' ? mov = 1 : mov = -1;

  const { pieceType, color: pieceColor } = pickPiece({ row: row + mov, column: column - 1 });
  if (pieceType === 'pawn' && pieceColor !== color) {
    return true
  }

  const piece = pickPiece({ row: row + mov, column: column + 1})
  if (piece.pieceType === 'pawn' && piece.color !== color) {
    return true
  }

  return false
}

function bishopCheck({ row, column }: ICoordinate, color: Color): boolean {
  let i = row + 1;
  let j = column + 1;

  while (i < 8 && j < 8) {
    let pieceData = pickPiece({ row: i, column: j });
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'bishop' && pieceData.pieceType !== 'queen') {
      break;
    }

    if ( (pieceData.pieceType === 'bishop' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    } 

    i++;
    j++;
  }
  i = row + 1;
  j = column - 1;
  
  while (i < 8 && j >= 0) {
    let pieceData = pickPiece({ row: i, column: j });
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'bishop' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'bishop' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    } 
    
    i++;
    j--;
  }

  i = row - 1;
  j = column + 1;

  while (i >= 0 && j < 8) {
    let pieceData = pickPiece({ row: i, column: j });
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'bishop' && pieceData.pieceType !== 'queen') {
      break;
    }

    if ( (pieceData.pieceType === 'bishop' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    } 

    i--;
    j++;
  }
  
  i = row - 1;
  j = column - 1
  
  while (i >= 0 && j >= 8) {
    let pieceData = pickPiece({ row: i, column: j });
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'bishop' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'bishop' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    } 

    i--;
    j--;
  }

  return false
}  

function rookCheck({ row, column }: ICoordinate, color: Color): boolean {
  let i = row;
  let j = column + 1;

  for (j; j < 8; j++) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'rook' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'rook' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    }
  }

  j = column - 1;

  for (j; j >= 0; j--) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'rook' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'rook' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    }
  }

  j = column;
  i = row + 1;

  for (i; i < 8; i++) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'rook' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'rook' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    }
  }

  i = row - 1;

  for (i; i >= 0; i--) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType !== null && pieceData.pieceType !== 'rook' && pieceData.pieceType !== 'queen') {
      break;
    }
    if ( (pieceData.pieceType === 'rook' || pieceData.pieceType === 'queen') && pieceData.color !== color ) {
      return true
    }
  }

  return false
}  

function kingCheck({ row, column }: ICoordinate, color: Color): boolean {
  let i = row + 1;
  let j = column - 1;
  let count = 0;

  while (count < 3) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType === 'king' && pieceData.color !== color) {
      return true;
    }
    count++;
    j++;
  }
  
  count = 0;
  i = row - 1;
  j = column - 1;

  while (count < 3) {
    let pieceData = pickPiece({ row: i, column: j});
    if (pieceData.pieceType === 'king' && pieceData.color !== color) {
      return true;
    }
    count++;
    j++;
  }

  const { pieceType, color: colorType } = pickPiece({ row, column: column - 1});
  if ( pieceType === 'king' && colorType !== color) {
    return true;
  }

  let pieceData = pickPiece({ row, column: column + 1});
  if (pieceData.pieceType === 'king' && pieceData.color !== color) {
    return true;
  }

  return false
}  