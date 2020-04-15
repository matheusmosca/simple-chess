import { Piece, IPiece, Color } from './piece';
import { ICoordinate, board } from '../game';
import { pickPiece, IPieceType, boardMatrix, renderBoard } from '../board';
import { isInCheck, checkHouses } from '../check';

export class King extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        let i = this.row + 1;
        let j = this.column - 1;

        if (i < 8 && j >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }
        
        j++;
        if (i < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }

        j++;
        if (i < 8 && j < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }

        i = this.row - 1;
        j = this.column - 1;
        if (i >= 0 && j >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }
        
        j++;
        if (i >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }
        
        j++;
        if (i >= 0 && j < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }
        
        i = this.row;
        j = this.column - 1;
        if (j >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }
        j += 2;
        if (j < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
            }    
        }

        return listOfCoordinates;
    }

    avaiableCastling(board: Piece[][]): ICoordinate[] {
      const castlingList: ICoordinate[] = [];
      //* short castling
      let kingRow: number;
      (this.color === 'white') ? kingRow = 0 : kingRow = 7;
      let rook = board[kingRow][7]
      //! Castling
      if (rook !== null && board[kingRow][6] === null && board[kingRow][5] === null) {
        if (this.Moved === false && rook.Moved === false) {
          if (checkHouses([{ row: kingRow, column: 4 }, { row: kingRow, column: 5 }, { row: kingRow, column: 6 }], this.color, board)) {
            castlingList.push({ row: kingRow, column: 6 });
          }
        }
      } 
      //* longest castling
      const checkHousesList = [
        { row: kingRow, column: 4 },
        { row: kingRow, column: 3 },
        { row: kingRow, column: 2 },
        { row: kingRow, column: 1 },
        { row: kingRow, column: 0 }
      ];
      rook = board[kingRow][0];
      if (rook !== null && board[kingRow][1] === null && board[kingRow][2] === null && board[kingRow][3] === null) {
        if (this.Moved === false && rook.Moved === false) {
          if (checkHouses(checkHousesList, this.color, board)) {
            castlingList.push({ row: kingRow, column: 2 });
          }
        }
      } 
      return castlingList;
    }

    doCastling({ row, column }: ICoordinate, matrix: Piece[][]) {
      this.Moved = true;
      //! Short castling
      if (column === 6) {
        matrix[this.row][this.column] = null;
        this.row = row;
        this.column = column;
        matrix[row][column] = this;
        matrix[row][5] = matrix[row][7];
        
        matrix[row][7] = null;
        matrix[row][5].Moved = true;
        matrix[row][5].row = row;
        matrix[row][5].column = 5;
        renderBoard(matrix, board);
        //! Longest castling
      } else if (column === 2) {
        matrix[this.row][this.column] = null;
        this.row = row;
        this.column = column;
        matrix[row][column] = this;
        matrix[row][3] = matrix[row][0];
        
        matrix[row][0] = null;
        matrix[row][3].Moved = true;
        matrix[row][3].row = row;
        matrix[row][3].column = 3;
        renderBoard(matrix, board);
      }
    }
}
