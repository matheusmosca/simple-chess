import { ICoordinate, board } from '../main'
import { renderBoard, boardMatrix } from '../board';

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

    doMovement({ row, column }: ICoordinate) {
        boardMatrix[this.row][this.column] = null;
        this.Moved = true;
        this.row = row;
        this.column = column
        boardMatrix[row][column] = null;
        renderBoard(boardMatrix, board);
        boardMatrix[row][column] = this;
        renderBoard(boardMatrix, board);
    }
}