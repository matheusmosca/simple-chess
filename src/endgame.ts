import { Color, Piece } from "./pieces/piece";
import { findKingCoord, changePlayer } from "./game";
import { isInCheck } from "./check";


export function checkEndGame(playerColor: Color, matrix: Piece[][]): boolean {
  let bool: boolean = true;
  matrix.forEach(subarray => {
    subarray.forEach(pieceInstance => {
      if (pieceInstance !== null && pieceInstance.color === playerColor) {
        let possiblemovementsList = pieceInstance.possibleMovementsList(matrix);
        let checkedMovements = possiblemovementsList.filter(coord => {
          return !pieceInstance.fakeMovement(coord, matrix);
        });
        if (checkedMovements.length > 0) {
          bool = false;
        }
      }
    });
  });

  const kingChecked = isInCheck(findKingCoord(playerColor), playerColor, matrix);

  // No possible movements and king in check (Checkmate)
  if (bool && kingChecked) {
    alert(`Checkmate! ${changePlayer(playerColor)} wins!!!`);
  // No possible movements and king is not in check (Stalemate)  
  } else if (bool && !kingChecked) {
    alert("StaleMate! It's a Draw!!");
  }
  return bool
}