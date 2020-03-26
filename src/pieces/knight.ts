import { Piece, IPiece, Color } from './piece';
import { ICoordinate } from '../game';

export class Knight extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        
        if (this.row + 2 < 8 && this.column - 1 >= 0) {
            if (board[this.row + 2][this.column - 1] === null || board[this.row + 2][this.column - 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row + 2, column: this.column - 1 });
            }
        }

        if (this.row + 2 < 8 && this.column + 1 < 8) {
            if (board[this.row + 2][this.column + 1] === null || board[this.row + 2][this.column + 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row + 2, column: this.column + 1 });
            }
        }
        
        if (this.row - 2 >= 0 && this.column + 1 < 8) {
            if (board[this.row - 2][this.column + 1] === null || board[this.row - 2][this.column + 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row - 2, column: this.column + 1 });
            }
        }
        
        if (this.row - 2 >= 0 && this.column - 1 >= 0) {
            if (board[this.row - 2][this.column - 1] === null || board[this.row - 2][this.column - 1].color !== this.color) {
                listOfCoordinates.push({ row: this.row - 2, column: this.column - 1 });
            }
        }
        
        if (this.row - 1 >= 0 && this.column + 2 < 8) {
            if (board[this.row - 1][this.column + 2] === null || board[this.row - 1][this.column + 2].color !== this.color) {
                listOfCoordinates.push({ row: this.row - 1, column: this.column + 2 });
            }
        }
        
        if (this.row + 1 < 8 && this.column + 2 < 8) {
            if (board[this.row + 1][this.column + 2] === null || board[this.row + 1][this.column + 2].color !== this.color) {
                listOfCoordinates.push({ row: this.row + 1, column: this.column + 2 });
            }
        }
        
        if (this.row + 1 < 8 && this.column - 2 >= 0) {
            if (board[this.row + 1][this.column - 2] === null || board[this.row + 1][this.column - 2].color !== this.color) {
                listOfCoordinates.push({ row: this.row + 1, column: this.column - 2 });
            }
        }
        
        if (this.row - 1 >= 0 && this.column - 2 >= 0) {
            if (board[this.row - 1][this.column - 2] === null || board[this.row - 1][this.column - 2].color !== this.color) {
                listOfCoordinates.push({ row: this.row - 1, column: this.column - 2 });
            }
        }
        
        return listOfCoordinates;
    }
}
