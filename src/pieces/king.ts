import { Piece, IPiece, Color } from './piece';
import { ICoordinate } from '../game';

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
}
