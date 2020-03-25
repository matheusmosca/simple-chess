import { ICoordinate } from '../main'

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

export abstract class Piece implements IPiece {
    public Moved: boolean;

    constructor(public row: number, public column:number, public color: Color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.Moved = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        return;
    }

    doMovement(board: Piece[][], { row, column }: ICoordinate) {
        board[this.row][this.column] = null;
        this.Moved = true;
        this.row = row;
        this.column = column
        board[row][column] = this;
    }
}