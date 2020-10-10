import { ICoordinate, board, findKingCoord } from '../game';
import { renderBoard } from '../board';
import { isInCheck } from '../check';


export type Color = 'white' | 'black'

export interface IPiece {
    row: number
    column: number
    color: Color
    Moved: boolean
    promote: boolean
    doubleMovementTurn: number
}

export abstract class Piece implements IPiece {
    public Moved: boolean;
    public promote: boolean;
    static turn: number = 1; 
    public doubleMovementTurn: number = -1;    


    constructor(public row: number, public column:number, public color: Color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.Moved = false;
        this.promote = false;
    }

    possibleMovementsList(board: Piece[][]): ICoordinate[] {
        return;
    }

    doMovement({ row, column }: ICoordinate, matrix: Piece[][]) {

        matrix[this.row][this.column] = null;
        this.Moved = true;
        this.row = row;
        this.column = column;

        matrix[row][column] = null;
        renderBoard(matrix, board);
        
        matrix[row][column] = this;
        matrix[row][column].color = this.color;
        renderBoard(matrix, board);
        Piece.turn++;
      }

    fakeMovement({ row, column }: ICoordinate, matrix: Piece[][]): boolean {
      let isNull: boolean;
      let bool: boolean;
      matrix[row][column] === null ? isNull = true : isNull = false;
      matrix[this.row][this.column] = null;
      if (!isNull) {
        matrix[row][column].color = this.color;
      } else {
        matrix[row][column] = this;
      }
      if (this.constructor["name"].toLowerCase() === 'king') {
        bool = isInCheck({ row, column }, this.color, matrix);
      } else {
        bool = isInCheck(findKingCoord(this.color), this.color, matrix);
      }
      matrix[this.row][this.column] = this;
      matrix[this.row][this.column].color = this.color;
      
      if (!isNull && matrix[row][column].color === 'white') {
        matrix[row][column].color = 'black';
      } else if (!isNull) {
        matrix[row][column].color = 'white';
      } else {
        matrix[row][column] = null;
      }

      return bool;
    }  

    avaiableCastling(board: Piece[][]): ICoordinate[] {
      return [];
    }

    doCastling({ row, column }: ICoordinate, matrix: Piece[][]) {

    }

    enPassant(matrix: Piece[][]): ICoordinate {
      return
    }  

    doEnpassant({ row, column }: ICoordinate, matrix: Piece[][]) {
    }
      
}