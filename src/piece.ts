export enum Color {
    white = 'white',
    black = 'black'
}

export interface IPiece {
    row: number
    column: number
    color: Color
    Moved: boolean
}

export class Piece implements IPiece {
    public Moved: boolean;

    constructor(public row: number, public column:number, public color: Color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.Moved = false;
    }
}