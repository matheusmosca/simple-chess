import { Piece, IPiece, Color } from './piece';
import { ICoordinate } from '../game';

export class Rook extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        let i = this.row;
        let j = this.column + 1;

        for (j; j < 8; j++) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
        }

        j = this.column - 1;
        
        for (j; j >= 0; j--) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
        }

        j = this.column;
        i = this.row + 1

        for (i; i < 8; i++) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
        }
        
        i = this.row - 1
        
        for (i; i >= 0; i--) {
            if (board[i][j] === null) {
                listOfCoordinates.push({ row: i, column: j });
            } else if (board[i][j].color !== this.color) {
                listOfCoordinates.push({ row: i, column: j });
                break;
            } else {
                break;
            }
        }

        return listOfCoordinates;
    }
}
