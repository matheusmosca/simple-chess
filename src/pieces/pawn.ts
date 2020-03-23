import { Piece, IPiece, Color } from './piece';

export class Pawn extends Piece implements IPiece {
    
    constructor(row: number, column: number, color: Color) {
        super(row, column, color);
        this.Moved = false;
    }
    
}
