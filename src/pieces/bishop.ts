import { Piece, IPiece, Color } from './piece';
import { ICoordinate } from '../game';
import { boardMatrix } from '../board';

export class Bishop extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        let i = this.row + 1;
        let j = this.column + 1;

        while (i < 8 && j < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });

            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
            i++;
            j++;
        }
        i = this.row - 1;
        j = this.column + 1;
        
        while (i >= 0 && j < 8) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });

            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            } 

            i--;
            j++;
        }
        
        i = this.row + 1;
        j = this.column - 1;
        
        while (i < 8 && j >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });

            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
            i++;
            j--;
        }

        i = this.row - 1;
        j = this.column - 1;
        
        while (i >= 0 && j >= 0) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });

            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }

            i--;
            j--;
        }

        return listOfCoordinates;
    }
}
