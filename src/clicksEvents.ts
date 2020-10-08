import { IPieceDTO, ICoordinate, tryMovement, changePlayer } from "./game";
import { Color } from './pieces/piece';
import { boardMatrix } from "./board";
import { isInCheck } from "./check";

export let playerColor: Color = 'white'; 
let hasClickedAPiece = false;
let firstPieceDTO: IPieceDTO;
let secondPieceDTO: IPieceDTO;

export function findPiecePosition(target: HTMLDivElement): IPieceDTO {
  const row: number = parseInt((target as HTMLDivElement).getAttribute('row'));
  const column: number = parseInt((target as HTMLDivElement).getAttribute('column'));
  const coord: ICoordinate = { row, column }; 
  const pieceInstance = boardMatrix[row][column];

  return { coord, pieceInstance };
}

export function resetPickDropClass(target: HTMLElement, pick: boolean = true, drop: boolean = true) {
  if (drop) {
    target.parentElement.querySelectorAll( ".last-drop" ).forEach( e =>
      e.classList.remove( "last-drop" ) );
  }
  if (pick) {
    target.parentElement.querySelectorAll( ".last-pick" ).forEach( e =>
      e.classList.remove( "last-pick" ) );
  }
}

export function firstClick(target: EventTarget): boolean {
  if (!hasClickedAPiece) {
    const { coord, pieceInstance } = findPiecePosition((target as HTMLDivElement));
    firstPieceDTO = { coord, pieceInstance };
    // console.log(isInCheck(coord, playerColor));
    if (pieceInstance && pieceInstance.color === playerColor) {
      hasClickedAPiece = true
      console.log(pieceInstance.color);
      var targetElement = target as HTMLElement;
      resetPickDropClass(targetElement);
      targetElement.classList.add("last-pick");
      return true
    }
  }
  return false
}

export function secondClick(target: EventTarget) {
  if (hasClickedAPiece) {
    secondPieceDTO = findPiecePosition((target as HTMLDivElement));
    if (secondPieceDTO.pieceInstance !== null && secondPieceDTO.pieceInstance.color === playerColor) {
      hasClickedAPiece = false;
      firstClick(target);
    } else {
      const sucess = tryMovement(firstPieceDTO, secondPieceDTO, playerColor);
      hasClickedAPiece = false;
      if (sucess) {
        var targetElement = target as HTMLElement;
        resetPickDropClass(targetElement,false,true);
        targetElement.classList.add("last-drop");
        playerColor = changePlayer(playerColor);
      }
    }
  }
}

// export function removeHTMLClass({ row, column }: ICoordinate): void {
//     const divs = Array.from(document.querySelectorAll(`[row='${row}']`));
//     console.log(divs)
//     let div = divs.filter(n => {
//     let x: string[] = n.getAttributeNames;
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