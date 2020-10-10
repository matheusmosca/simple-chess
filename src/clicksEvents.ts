import { IPieceDTO, ICoordinate, tryMovement, changePlayer } from "./game";
import { Color } from './pieces/piece';
import { boardMatrix } from "./board";
import { isInCheck } from "./check";


export let playerColor: Color = 'white'; 
let hasClickedAPiece = false;

// a reference to the currently selected div
let selectedElement: null | HTMLDivElement = null;

// an array of divs that are a part of all possible moves
// relative to the selectedElement. I am choosing to store this
// rather than dynamically create and destroy the array each selection to 
// save on computations that would otherwise stem from calculating possible moves twice: 
// once for creation, once for deletion
let hightlightedElements: HTMLElement[] = [];

let firstPieceDTO: IPieceDTO;
let secondPieceDTO: IPieceDTO;

export function findPiecePosition(target: HTMLDivElement): IPieceDTO {
  const row: number = parseInt((target as HTMLDivElement).getAttribute('row'));
  const column: number = parseInt((target as HTMLDivElement).getAttribute('column'));
  const coord: ICoordinate = { row, column }; 
  const pieceInstance = boardMatrix[row][column];
  
  return { coord, pieceInstance };
}

// this function will grab the div elements of all the
// possible moves for the selected piece, append a child and toggle specific 
// classes in order to visually indicate the available moves. 
function highlightPossibleMoves(target: EventTarget) {
  if (!selectedElement) return;

  const pieceDTO = findPiecePosition((target as HTMLDivElement));

  const possibleMoves = pieceDTO.pieceInstance.possibleMovementsList(boardMatrix);

  // I needed to grab the parent board div so I would be able to loop through the board
  const boardElement = (target as HTMLDivElement).parentElement;

  // these are the actual divs in browser
  const piecesElements = Array.from(boardElement.children, (child) => child as HTMLDivElement);

  // filter the piecesElements array to only the elements that have the same 
  // row and column attributes of each possible move coordinate
  const possibleMovesElements = piecesElements.filter(element => {
    return possibleMoves.some((coord) => {
      return coord.row === parseInt(element.getAttribute("row"), 10) &&
      coord.column === parseInt(element.getAttribute("column"), 10)
    });
  })

  // append a marker to each possible move, the marker is either
  // movealble (a blank space) or targetable (a space containing a piece)
  possibleMovesElements.forEach(element => {
    const marker = document.createElement('div');
    // if the position has a piece, marker is targetable
    marker.className = findPiecePosition(element).pieceInstance ? "targetable" : "moveable";
    element.appendChild(marker);
  })

  hightlightedElements = possibleMovesElements;
}

// this function will get called each time a new piece is selected, 
// as well as after each move made
function clearHighlightedMoves() {
  if (hightlightedElements.length === 0) {
    return;
  }

  hightlightedElements.forEach(element => {
    // there should not be more than firstChild since I manually appended the
    // additional child (see function highlightPossibleMoves)
    element.removeChild(element.firstChild);
  })

  // reset the array
  hightlightedElements = [];
}

export function firstClick(target: EventTarget): boolean {
  if (!hasClickedAPiece) {
    const { coord, pieceInstance } = findPiecePosition((target as HTMLDivElement));
    firstPieceDTO = { coord, pieceInstance };
    if (pieceInstance && pieceInstance.color === playerColor) {
      hasClickedAPiece = true

      selectedElement = target as HTMLDivElement;
      highlightPossibleMoves(target);
      selectedElement.classList.toggle("selected");

      return true
    }
  }
  
  else {
    // if there is a selectedElement, then the class "selected" was added
    // and therefore should be removed
    selectedElement?.classList.remove("selected")
    clearHighlightedMoves()

    return false
  }

}

export function secondClick(target: EventTarget) {
  if (hasClickedAPiece) {
    secondPieceDTO = findPiecePosition((target as HTMLDivElement));
    if (secondPieceDTO.pieceInstance !== null && secondPieceDTO.pieceInstance.color === playerColor) {
      hasClickedAPiece = false;
      firstClick(target);
    } else {
      const success = tryMovement(firstPieceDTO, secondPieceDTO, playerColor);
      hasClickedAPiece = false;
      if (success) {
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