import { IPiece, Color, Piece } from './piece'
import { Pawn } from './pawn'
import { Rook } from './rook'
import { Knight } from './knight'
import { Bishop } from './bishop'
import { Queen } from './queen'
import { King } from './king'

var boardMatrix: Piece[][] = [[], [], [], [], [], [], [], []];

function initializePieces(boardGrid: Piece[][]): void {
    // White pieces
    boardMatrix[0][0] = new Rook(0, 0, Color.white); 
    boardMatrix[0][1] = new Knight(0, 0, Color.white); 
    boardMatrix[0][2] = new Bishop(0, 0, Color.white); 
    boardMatrix[0][3] = new Queen(0, 0, Color.white); 
    boardMatrix[0][4] = new King(0, 0, Color.white); 
    boardMatrix[0][5] = new Bishop(0, 0, Color.white); 
    boardMatrix[0][6] = new Knight(0, 0, Color.white); 
    boardMatrix[0][7] = new Rook(0, 0, Color.white); 
    // White pawns
    for (let j = 0; j < 8; j++) {
        boardMatrix[1][j] = new Pawn(1, j, Color.white);
    }
    // Black pieces
    boardMatrix[7][0] = new Rook(0, 0, Color.black); 
    boardMatrix[7][1] = new Knight(0, 0, Color.black); 
    boardMatrix[7][2] = new Bishop(0, 0, Color.black); 
    boardMatrix[7][3] = new Queen(0, 0, Color.black); 
    boardMatrix[7][4] = new King(0, 0, Color.black); 
    boardMatrix[7][5] = new Bishop(0, 0, Color.black); 
    boardMatrix[7][6] = new Knight(0, 0, Color.black); 
    boardMatrix[7][7] = new Rook(0, 0, Color.black); 
    // Black pawns    
    for (let j = 0; j < 8; j++) {
        boardMatrix[6][j] = new Pawn(1, j, Color.black);
    }
}

initializePieces(boardMatrix);

const board = document.querySelector('.board');
// board.classList.length
board.addEventListener('click', (e) => {
    e.preventDefault();
    const x = parseInt((e.target as HTMLDivElement).getAttribute('row'))
    const y = parseInt((e.target as HTMLDivElement).getAttribute('column'))
    const obj = boardMatrix[x][y];
    console.log(obj);
    console.log(`row: ${x}, column: ${y}`);
})
