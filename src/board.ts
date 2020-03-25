import { Color, Piece } from './pieces/piece'
import { Pawn } from './pieces/pawn'
import { Rook } from './pieces/rook'
import { Knight } from './pieces/knight'
import { Bishop } from './pieces/bishop'
import { Queen } from './pieces/queen'
import { King } from './pieces/king'

var boardMatrix: Piece[][] = [[], [], [], [], [], [], [], []];

function initializePieces(boardMatrix: Piece[][]): void {
    // White pieces
    boardMatrix[0][0] = new Rook(0, 0, Color.white); 
    boardMatrix[0][1] = new Knight(0, 1, Color.white); 
    boardMatrix[0][2] = new Bishop(0, 2, Color.white); 
    boardMatrix[0][3] = new Queen(0, 3, Color.white); 
    boardMatrix[0][4] = new King(0, 4, Color.white); 
    boardMatrix[0][5] = new Bishop(0, 5, Color.white); 
    boardMatrix[0][6] = new Knight(0, 6, Color.white); 
    boardMatrix[0][7] = new Rook(0, 7, Color.white); 
    // White pawns
    for (let j = 0; j < 8; j++) {
        boardMatrix[1][j] = new Pawn(1, j, Color.white);
    }
    // Black pieces
    boardMatrix[7][0] = new Rook(7, 0, Color.black); 
    boardMatrix[7][1] = new Knight(7, 1, Color.black); 
    boardMatrix[7][2] = new Bishop(7, 2, Color.black); 
    boardMatrix[7][3] = new Queen(7, 3, Color.black); 
    boardMatrix[7][4] = new King(7, 4, Color.black); 
    boardMatrix[7][5] = new Bishop(7, 5, Color.black); 
    boardMatrix[7][6] = new Knight(7, 6, Color.black); 
    boardMatrix[7][7] = new Rook(7, 7, Color.black); 
    // Black pawns    
    for (let j = 0; j < 8; j++) {
        boardMatrix[6][j] = new Pawn(6, j, Color.black);
    }
}

// Render pieces from the matrix
function renderBoard(boardMatrix: Piece[][], board: Element): void {
    let e = 0;
    const listOfDivs = Array.from(board.children);

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j< 8; j++) {
            if (boardMatrix[i][j] !== undefined && boardMatrix[i][j] !== null) {
                // Pick what is the piece
                const piece = boardMatrix[i][j].constructor["name"].toLowerCase();
                const { color } = boardMatrix[i][j];
                // Next div element
                const divElement = listOfDivs[e];
                // Add classes to div element, so the piece will appear with the correct color.
                divElement.classList.add('piece', piece, color);
              // If the element is null so this shouldn't appear  
            } else if (boardMatrix[i][j] === null && listOfDivs[e].classList.contains('piece')) {
                // !BUG here with King and Queen
                // !fix:
                // ?????????
                listOfDivs[e].classList.contains('queen') ? listOfDivs[e].classList.remove('queen') : 0;
                listOfDivs[e].classList.contains('black') ? listOfDivs[e].classList.remove('black') : 0;
                listOfDivs[e].classList.contains('white') ? listOfDivs[e].classList.remove('white') : 0;
                listOfDivs[e].classList.contains('king') ? listOfDivs[e].classList.remove('king') : 0;
                // ?????????
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

export {
    boardMatrix,
    initializePieces,
    renderBoard
}