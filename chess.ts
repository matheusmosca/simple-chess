'use strict'
/**
* Board
*/
class Board {
    squares: Square[];
    boardContainer: JQuery;
    statusContainer: JQuery;

    markActive(square: Square) {
        this.removeActive();
        var active = 'active';
        var jqSquare = this.boardContainer.find(square.getSelector());
        jqSquare.addClass(active);
    }

    removeActive() {
        this.boardContainer.find('.chess-square').removeClass('active');
    }

    writePieces(pieces: Piece[]): void {
        $('.chess-piece').remove();
        pieces.forEach((p) => {
            $('#' + p.placedAt.getName()).html(`<span id=${p.getId()}
            class='chess-piece chess-piece-${p.getColorName().toLocaleLowerCase()}'>
            ${p.symbol}
            </span>`);
        });
    };

    writeBoard(): JQuery {
        let newBoardElement = this.boardContainer.html("<table id='chessTable'><thead id='chessHead'></thead></thead><tbody id='chessBody'></tbody><tfoot id='chessFoot'></tfoot></table>");
        let chessBody = $('#chessBody');
        this.squares = new Array<Square>();
        for (var i = 8; i >= 1; i--) {
            let rowString = "chessRow" + i;
            chessBody.append(`<tr id='${rowString}'></tr>`);
            for (var j = 1; j <= 8; j++) {
                let square = new Square(i, j);
                this.squares.push(square);
                $('#' + rowString).append(`<td id='${square.getName()}' data-row='${square.row}' data-col='${square.column}' class='chess-square chess-${this.colorClass(square)}'></td>`);
            }
        }
        return newBoardElement;
    };

    writeStatus(playedMoves: Move[], toMove: Player): JQuery {
        var moveList = this.statusContainer.find('#moves').html('');;
        playedMoves.forEach((move) => {
            moveList.append(`<li>${move.getNotation()}</li>`);
        });

        var colorClass = `chess-${this.colorClass(toMove)}`;
        this.statusContainer.find('#nextMove').removeClass().addClass(colorClass);
        return this.statusContainer;
    }

    constructor(boardSelector: JQuery, statusSelector: JQuery, startingPieces: Piece[]) {
        this.boardContainer = boardSelector.first();
        this.statusContainer = statusSelector.first();
        this.writeBoard();
        this.writePieces(startingPieces);
    };

    private colorClass<T>(T: IHasColor): string { return T.getColorName().toLowerCase(); }
}

interface IHasColor {
    getColorName(): string;
}

class Chess {
    board: Board;
    playedMoves: Move[];
    activeMove: Move;
    toMove: Player;
    players: Player[];
    selector: JQuery;

    startMove(piece: Piece) {
        this.board.markActive(piece.placedAt);
        piece.selected = true;
        this.activeMove = new Move(piece.placedAt, piece);
    };
    endMove(piece: Piece, newSquare: Square, piceToCapture: Piece): boolean {
        if (!newSquare && !piece && this.activeMove == null) return false;
        this.activeMove.completeMove(newSquare, piceToCapture);
        this.playedMoves.push(this.activeMove);
        this.activeMove = null;
        this.board.removeActive();
        piece.placedAt = newSquare;
        piece.moved = true;
        piece.selected = false;
        var colorToMoveNext = this.toMove.color === Color.White ? Color.Black : Color.White;
        this.toMove = this.players[colorToMoveNext];
        return true;
    };
    getPieces(): Piece[] {
        let pieces = new Array<Piece>().concat(
            this.players[Color.Black].pieces,
            this.players[Color.White].pieces
        );
        return pieces;
    }

    updateBoard(): void {
        this.board.writePieces(this.getPieces().filter((p) => !p.captured));
        this.board.writeStatus(this.playedMoves, this.toMove);
    };

    pieceClick(event: JQueryEventObject): boolean {
        var pieceId = event.target.id;
        var pieces = this.getPieces();
        var anySelected = this.anySelected(pieces);

        var piece = pieces.find((p) => p.getId() === pieceId);
        if (anySelected && this.toMove.color !== piece.color) {//capture piece 
            this.capturePiece(piece, pieces.find((p) => p.selected));
        }
        else if (this.toMove.color === piece.color) {
            pieces.forEach((p) => p.selected = false);
            this.startMove(piece);
        }
        this.updateBoard();
        return false;
    };

    squareClick(event: JQueryEventObject): boolean {

        if (event.currentTarget !== event.target) return false;
        var squareId = event.target.id;
        var pieces = this.getPieces();
        var anySelected = this.anySelected(pieces);

        var square = this.board.squares.find((s) => s.getName() == event.target.id)
        if (anySelected && this.activeMove) { //Todo: This will not work for en passant as you are not clicking a piece. 
            var currentMove = this.activeMove;
            this.endMove(currentMove.piece, square, null);
        }
        this.updateBoard();
        return false;
    }

    bindEvents(selector: JQuery): void {
        selector.on('click', '.chess-piece', (eventObject: JQueryEventObject) => {
            this.pieceClick(eventObject);
        });
        selector.on('click', '.chess-square', (eventObject: JQueryEventObject) => {
            this.squareClick(eventObject);
        });
    };
    constructor(selector: JQuery, statusSelector: JQuery) {

        this.players = [new Player(Color.White), new Player(Color.Black)];
        this.toMove = this.players[Color.White];
        this.playedMoves = new Array<Move>();
        this.board = new Board(selector, statusSelector, this.getPieces());
        this.bindEvents(selector);
        this.selector = selector;
    };
    private capturePiece(pieceToCapture: Piece, pieceToMove: Piece): boolean {
        if (pieceToCapture.color === pieceToMove.color && this.playedMoves[this.playedMoves.length])
            return false;
        pieceToCapture.captured = true;
        this.endMove(pieceToMove, pieceToCapture.placedAt, pieceToCapture);
        return false;
    };
    private anySelected(pieces: Piece[]): boolean {
        return pieces.some((p) => p.selected);
    }
    private getLastMove(): Move {
        var length = this.playedMoves.length;
        if (length === 0) return null;
        return this.playedMoves[length - 1];
    }

    private replaceLastMove(move: Move): number {
        this.playedMoves.pop();
        return this.playedMoves.push(move);
    }
}

class Move {
    start: Square;
    end: Square;
    piece: Piece;
    capture: Piece;
    isComplete: boolean;

    getNotation(): string {
        return this.piece.symbol + this.start.getName() + (this.capture ? 'x' + this.capture.symbol : '') + ' ' + this.end.getName();
    }

    completeMove(end: Square, capture: Piece): Move {
        this.isComplete = true;
        this.capture = capture;
        this.end = end;
        return this;
    }

    constructor(start: Square, piece: Piece) {
        this.isComplete = false;
        this.capture = null;
        this.piece = piece;
        this.start = start;
    }

}

/**
 * Piece
 *
 */
class Piece implements IHasColor {

    color: Color;
    placedAt: Square;
    startAt: Square;
    type: PieceType;
    moved: boolean;
    captured: boolean;
    selected: boolean;
    symbol: string;

    getId(): string {
        return this.startAt.getName() + this.symbol;
    }

    getColorName(): string {
        return Color[this.color];
    }

    constructor(
        piceType: PieceType,
        pieceColor: Color,
        startAt: Square,
        symbol: string) {
        this.type = piceType;
        this.color = pieceColor;
        this.placedAt = startAt;
        this.startAt = startAt;
        this.symbol = symbol;
        this.moved = false;
        this.captured = false;
        this.selected = false;
    }
}

class King extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♔' : '♚';
        super(PieceType.King, pieceColor, placedAt, symbol);
    }
}

class Queen extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♕' : '♛';
        super(PieceType.Queen, pieceColor, placedAt, symbol);
    }
}

class Bishop extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♗' : '♝';
        super(PieceType.Bishop, pieceColor, placedAt, symbol);
    }
}

class Knight extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♘' : '♞';
        super(PieceType.Knight, pieceColor, placedAt, symbol);

    }
}

class Rook extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♖' : '♜';
        super(PieceType.Rook, pieceColor, placedAt, symbol);
    }
}

class Pawn extends Piece {
    constructor(pieceColor: Color, placedAt: Square) {
        var symbol = pieceColor === Color.White ? '♙' : '♟';
        super(PieceType.Pawn, pieceColor, placedAt, symbol);
    }
}



/**
 * Square
 */
class Square implements IHasColor {
    row: number;
    column: Columns;

    getLetter() {
        return Columns[this.column];
    };

    getName(): string {
        return this.getLetter() + this.row;
    }

    getSelector(): string {
        return '#' + this.getName();
    }

    getColor() {
        return (this.row + this.column - 1) % 2
    }

    getColorName() {
        return Color[this.getColor()];
    }

    constructor(row: number, column: Columns) {
        this.row = row;
        this.column = column;
    }

}


/**
 * Player
 */
class Player implements IHasColor {
    color: Color;
    direction: MoveDirection;
    pieces: Piece[];

    isWhite(): boolean {
        return this.color === Color.White;
    }

    getColorName(): string {
        return Color[this.color];
    }

    constructor(color: Color) {
        this.color = color;
        this.direction = color == Color.White ? MoveDirection.Up : MoveDirection.Down;
        let startingRow = this.isWhite() ? 1 : 8;
        this.pieces = new Array<Piece>(
            new Rook(color, new Square(startingRow, Columns.A)),
            new Rook(color, new Square(startingRow, Columns.H)),
            new Knight(color, new Square(startingRow, Columns.G)),
            new Bishop(color, new Square(startingRow, Columns.C)),
            new Bishop(color, new Square(startingRow, Columns.F)),
            new Knight(color, new Square(startingRow, Columns.B)),
            new Queen(color, new Square(startingRow, Columns.D)),
            new King(color, new Square(startingRow, Columns.E))
        ).concat(this.getStartingPawns());
    }

    private getStartingPawns(): Pawn[] {
        var pawns = new Array<Pawn>();
        for (var i = 1; i <= 8; i++) {
            pawns.push(new Pawn(this.color, new Square(this.isWhite() ? 2 : 7, i)));
        }
        return pawns;
    }
}

enum PieceType { King = 1, Queen, Rook, Knight, Bishop, Tower, Pawn }
enum Color { White, Black }
enum MoveDirection { Up = 1, Down = -1 }
enum Columns { A = 1, B, C, D, E, F, G, H }


$(function() {
    var chessGame = new Chess($("#board"), $("#status"));
});
