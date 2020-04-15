import { Piece, IPiece, Color } from './piece';
import { ICoordinate, board } from '../game'
import { renderBoard } from '../board';

export class Pawn extends Piece implements IPiece {
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }
    //* Return an array with the availables movements
    public possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        const color = this.color;
        const mov = (color == 'white') ? 1 : -1;

        if (this.row + mov < 8 && this.row + mov >= 0) {
            //* movement 2 rows up
            if (!this.Moved) {
                
                if (this.row + 2*mov < 8 && this.row + 2*mov >= 0) {
                    
                    if (board[this.row + 2*mov][this.column] === null) {
                        listOfCoordinates.push({ row: this.row + 2*mov, column: this.column })
                    }
                }
            }
            
            // movement 1 row up
            if(board[this.row + mov][this.column] === null) {
                listOfCoordinates.push({ row: this.row + mov, column: this.column });
            }
        }

        //* left diagonal movement
        if (this.row + mov < 8 && this.row + mov >= 0 && this.column - 1 >= 0) {
            if (board[this.row + mov][this.column - 1] !== null && board[this.row + mov][this.column - 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row + mov, column: this.column - 1 });
            }

        }

        //* right diagonal movement
        if (this.row + mov < 8 && this.row + mov >= 0 && this.column + 1 < 8) {
            if (board[this.row + mov][this.column + 1] !== null && board[this.row + mov][this.column + 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row + mov, column: this.column + 1 });
            }

        }
        //!
        //* En passant
        // if (this.column - 1 >= 0) {
        //   const pawn1 = board[this.row][this.column - 1];
        //   if (pawn1 !== null && pawn1.constructor["name"].toLowerCase() === 'pawn' && pawn1.color !== this.color) {
        //     if (Math.abs(pawn1.doubleMovementTurn - Piece.turn) === 1) {
        //       listOfCoordinates.push({ row: this.row + mov, column: pawn1.column });
        //     }
        //   }  
        // }
        // if (this.column + 1 < 8) {
        //   const pawn2 = board[this.row][this.column + 1]; 
        //   if (pawn2 !== null && pawn2.constructor["name"].toLowerCase() === 'pawn' && pawn2.color !== this.color) {
        //     if (Math.abs(pawn2.doubleMovementTurn - Piece.turn) === 1) {
        //       listOfCoordinates.push({ row: this.row + mov, column: pawn2.column });
        //     }
        // }

        // }
        return listOfCoordinates;
    }

    enPassant(matrix: Piece[][]): ICoordinate {
      const mov = (this.color == 'white') ? 1 : -1;

      if (this.column - 1 >= 0) {
        const pawn1 = matrix[this.row][this.column - 1];
        if (pawn1 !== null && pawn1.constructor["name"].toLowerCase() === 'pawn' && pawn1.color !== this.color) {
          if (Math.abs(pawn1.doubleMovementTurn - Piece.turn) === 1) {
            return { row: this.row + mov, column: pawn1.column };
          }
        }  
      }
      if (this.column + 1 < 8) {
        const pawn2 = matrix[this.row][this.column + 1]; 
        if (pawn2 !== null && pawn2.constructor["name"].toLowerCase() === 'pawn' && pawn2.color !== this.color) {
          if (Math.abs(pawn2.doubleMovementTurn - Piece.turn) === 1) {
            return { row: this.row + mov, column: pawn2.column };
          }
        }
      }

      return { row: null, column: null };
    }  

    doEnpassant({ row, column }: ICoordinate, matrix: Piece[][]) {
      matrix[this.row][column] = null;
      matrix[this.row][this.column] = null;
      this.row = row;
      this.column = column;
      this.Moved = true;
      matrix[row][column] = this;
      renderBoard(matrix, board);
    }
}
