import { Piece, IPiece, Color } from './piece';
import { ICoordinate } from '../main'

export class Pawn extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }
    // Return an array with the availables movements
    public possibleMovementsList(board: Piece[][]): ICoordinate[] {
        const listOfCoordinates: ICoordinate[] = [];
        const color = this.color;
        const mov = (color == 'white') ? 1 : -1;

        // movement 1 row up
        if (this.row + mov < 8 && this.row + mov >= 0) {
            // movement 2 rows up
            if (!this.Moved) {

                if (this.row + 2*mov < 8 && this.row + 2*mov >= 0) {

                    if (board[this.row + 2*mov][this.column] === null) {
                        listOfCoordinates.push({ row: this.row + 2*mov, column: this.column })
                    }
                }
            }

            if(board[this.row + mov][this.column] === null) {
                listOfCoordinates.push({ row: this.row + mov, column: this.column });
            }
        }
        return listOfCoordinates;
    }

}
