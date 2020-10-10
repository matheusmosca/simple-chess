import { Piece, Color } from './pieces/piece'
import { Pawn } from './pieces/pawn'
import { Rook } from './pieces/rook'
import { Knight } from './pieces/knight'
import { Bishop } from './pieces/bishop'
import { Queen } from './pieces/queen'
import { King } from './pieces/king'
import { ICoordinate } from './game'

var boardMatrix: Piece[][] = [[], [], [], [], [], [], [], []];

function initializePieces(boardMatrix: Piece[][]): void {
    // White pieces
    boardMatrix[0][0] = new Rook(0, 0, 'white'); 
    boardMatrix[0][1] = new Knight(0, 1, 'white'); 
    boardMatrix[0][2] = new Bishop(0, 2, 'white'); 
    boardMatrix[0][3] = new Queen(0, 3, 'white'); 
    boardMatrix[0][4] = new King(0, 4, 'white'); 
    boardMatrix[0][5] = new Bishop(0, 5, 'white'); 
    boardMatrix[0][6] = new Knight(0, 6, 'white'); 
    boardMatrix[0][7] = new Rook(0, 7, 'white'); 
    // White pawns
    for (let j = 0; j < 8; j++) {
        boardMatrix[1][j] = new Pawn(1, j, 'white');
    }
    // Black pieces
    boardMatrix[7][0] = new Rook(7, 0, 'black'); 
    boardMatrix[7][1] = new Knight(7, 1, 'black'); 
    boardMatrix[7][2] = new Bishop(7, 2, 'black'); 
    boardMatrix[7][3] = new Queen(7, 3, 'black'); 
    boardMatrix[7][4] = new King(7, 4, 'black'); 
    boardMatrix[7][5] = new Bishop(7, 5, 'black'); 
    boardMatrix[7][6] = new Knight(7, 6, 'black'); 
    boardMatrix[7][7] = new Rook(7, 7, 'black'); 
    // Black pawns    
    for (let j = 0; j < 8; j++) {
        boardMatrix[6][j] = new Pawn(6, j, 'black');
    }
}

// Render pieces from the matrix
function renderBoard(boardMatrix: Piece[][], board: Element): void {
    let e = 0;
    const listOfDivs = Array.from(board.children);

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j< 8; j++) {
            if (boardMatrix[i][j] !== undefined && boardMatrix[i][j] !== null) {
                if (boardMatrix[i][j].promote){
                    boardMatrix[i][j] = new Queen(i,j,boardMatrix[i][j].color);
                }
                // Pick what is the piece
                const piece = boardMatrix[i][j].constructor["name"].toLowerCase();
                const { color } = boardMatrix[i][j];
                // Next div element
                const divElement = listOfDivs[e];
                // Add classes to div element, so the piece will appear with the correct color.
                divElement.classList.add(piece, color);
              // If the element is null so this shouldn't appear  
            } else if (boardMatrix[i][j] === null && listOfDivs[e].classList.length > 1) {

                listOfDivs[e].classList.contains('black') ? listOfDivs[e].classList.remove('black') : 0;
                listOfDivs[e].classList.contains('white') ? listOfDivs[e].classList.remove('white') : 0;

                listOfDivs[e].classList.forEach(n => {
                    if (n !== 'light' && n !== 'dark') {
                        listOfDivs[e].classList.remove(n);
                    } 
                });
            } else {
                boardMatrix[i][j] = null;
            }
            e++;
        }
    }
}

export interface IPieceType {
  pieceType: string
  color: Color
}

function pickPiece({ row, column }: ICoordinate, matrix: Piece[][]): IPieceType {
  if (row >= 8 || row < 0 || column >= 8 || column < 0) {
    return { pieceType: null, color: null };
  } else if (matrix[row][column] === null) {
    return { pieceType: null, color: null };
  }
  const pieceType = matrix[row][column].constructor["name"].toLowerCase();
  const color = matrix[row][column].color;
  
  return { pieceType, color }
}

export {
    boardMatrix,
    initializePieces,
    renderBoard,
    pickPiece,
}