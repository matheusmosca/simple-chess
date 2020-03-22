(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return Bishop;
}(piece_1.Piece));
exports.Bishop = Bishop;

},{"./piece":6}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return King;
}(piece_1.Piece));
exports.King = King;

},{"./piece":6}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return Knight;
}(piece_1.Piece));
exports.Knight = Knight;

},{"./piece":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var pawn_1 = require("./pawn");
var rook_1 = require("./rook");
var knight_1 = require("./knight");
var bishop_1 = require("./bishop");
var queen_1 = require("./queen");
var king_1 = require("./king");
var boardMatrix = [[], [], [], [], [], [], [], []];
function initializePieces(boardGrid) {
    // White pieces
    boardMatrix[0][0] = new rook_1.Rook(0, 0, piece_1.Color.white);
    boardMatrix[0][1] = new knight_1.Knight(0, 0, piece_1.Color.white);
    boardMatrix[0][2] = new bishop_1.Bishop(0, 0, piece_1.Color.white);
    boardMatrix[0][3] = new queen_1.Queen(0, 0, piece_1.Color.white);
    boardMatrix[0][4] = new king_1.King(0, 0, piece_1.Color.white);
    boardMatrix[0][5] = new bishop_1.Bishop(0, 0, piece_1.Color.white);
    boardMatrix[0][6] = new knight_1.Knight(0, 0, piece_1.Color.white);
    boardMatrix[0][7] = new rook_1.Rook(0, 0, piece_1.Color.white);
    // White pawns
    for (var j = 0; j < 8; j++) {
        boardMatrix[1][j] = new pawn_1.Pawn(1, j, piece_1.Color.white);
    }
    // Black pieces
    boardMatrix[7][0] = new rook_1.Rook(0, 0, piece_1.Color.black);
    boardMatrix[7][1] = new knight_1.Knight(0, 0, piece_1.Color.black);
    boardMatrix[7][2] = new bishop_1.Bishop(0, 0, piece_1.Color.black);
    boardMatrix[7][3] = new queen_1.Queen(0, 0, piece_1.Color.black);
    boardMatrix[7][4] = new king_1.King(0, 0, piece_1.Color.black);
    boardMatrix[7][5] = new bishop_1.Bishop(0, 0, piece_1.Color.black);
    boardMatrix[7][6] = new knight_1.Knight(0, 0, piece_1.Color.black);
    boardMatrix[7][7] = new rook_1.Rook(0, 0, piece_1.Color.black);
    // Black pawns    
    for (var j = 0; j < 8; j++) {
        boardMatrix[6][j] = new pawn_1.Pawn(1, j, piece_1.Color.black);
    }
}
initializePieces(boardMatrix);
var board = document.querySelector('.board');
// board.classList.length
board.addEventListener('click', function (e) {
    e.preventDefault();
    var x = parseInt(e.target.getAttribute('row'));
    var y = parseInt(e.target.getAttribute('column'));
    var obj = boardMatrix[x][y];
    console.log(obj);
    console.log("row: " + x + ", column: " + y);
});

},{"./bishop":1,"./king":2,"./knight":3,"./pawn":5,"./piece":6,"./queen":7,"./rook":8}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return Pawn;
}(piece_1.Piece));
exports.Pawn = Pawn;

},{"./piece":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color["white"] = "white";
    Color["black"] = "black";
})(Color = exports.Color || (exports.Color = {}));
var Piece = /** @class */ (function () {
    function Piece(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.row = row;
        this.column = column;
        this.color = color;
        this.Moved = false;
    }
    return Piece;
}());
exports.Piece = Piece;

},{}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return Queen;
}(piece_1.Piece));
exports.Queen = Queen;

},{"./piece":6}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(row, column, color) {
        var _this = _super.call(this, row, column, color) || this;
        _this.Moved = false;
        return _this;
    }
    return Rook;
}(piece_1.Piece));
exports.Rook = Rook;

},{"./piece":6}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYmlzaG9wLnRzIiwic3JjL2tpbmcudHMiLCJzcmMva25pZ2h0LnRzIiwic3JjL21haW4udHMiLCJzcmMvcGF3bi50cyIsInNyYy9waWVjZS50cyIsInNyYy9xdWVlbi50cyIsInNyYy9yb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsaUNBQStDO0FBRS9DO0lBQTRCLDBCQUFLO0lBRTdCLGdCQUFZLEdBQVcsRUFBRSxNQUFjLEVBQUUsS0FBWTtRQUFyRCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBRTVCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FQQSxBQU9DLENBUDJCLGFBQUssR0FPaEM7QUFQWSx3QkFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRm5CLGlDQUErQztBQUUvQztJQUEwQix3QkFBSztJQUUzQixjQUFZLEdBQVcsRUFBRSxNQUFjLEVBQUUsS0FBWTtRQUFyRCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBRTVCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFFTCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLGFBQUssR0FPOUI7QUFQWSxvQkFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmpCLGlDQUErQztBQUUvQztJQUE0QiwwQkFBSztJQUU3QixnQkFBWSxHQUFXLEVBQUUsTUFBYyxFQUFFLEtBQVk7UUFBckQsWUFDSSxrQkFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUU1QjtRQURHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztJQUN2QixDQUFDO0lBRUwsYUFBQztBQUFELENBUEEsQUFPQyxDQVAyQixh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QkFBSztJQUU1QixlQUFZLEdBQVcsRUFBRSxNQUFjLEVBQUUsS0FBWTtRQUFyRCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBRTVCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FQQSxBQU9DLENBUDBCLGFBQUssR0FPL0I7QUFQWSxzQkFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmxCLGlDQUErQztBQUUvQztJQUEwQix3QkFBSztJQUUzQixjQUFZLEdBQVcsRUFBRSxNQUFjLEVBQUUsS0FBWTtRQUFyRCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBRTVCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFFTCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLGFBQUssR0FPOUI7QUFQWSxvQkFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IFBpZWNlLCBJUGllY2UsIENvbG9yIH0gZnJvbSAnLi9waWVjZSc7XG5cbmV4cG9ydCBjbGFzcyBCaXNob3AgZXh0ZW5kcyBQaWVjZSBpbXBsZW1lbnRzIElQaWVjZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyLCBjb2xvcjogQ29sb3IpIHtcbiAgICAgICAgc3VwZXIocm93LCBjb2x1bW4sIGNvbG9yKTtcbiAgICAgICAgdGhpcy5Nb3ZlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBcbn1cbiIsImltcG9ydCB7IFBpZWNlLCBJUGllY2UsIENvbG9yIH0gZnJvbSAnLi9waWVjZSc7XG5cbmV4cG9ydCBjbGFzcyBLaW5nIGV4dGVuZHMgUGllY2UgaW1wbGVtZW50cyBJUGllY2Uge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlciwgY29sb3I6IENvbG9yKSB7XG4gICAgICAgIHN1cGVyKHJvdywgY29sdW1uLCBjb2xvcik7XG4gICAgICAgIHRoaXMuTW92ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG59XG4iLCJpbXBvcnQgeyBQaWVjZSwgSVBpZWNlLCBDb2xvciB9IGZyb20gJy4vcGllY2UnO1xuXG5leHBvcnQgY2xhc3MgS25pZ2h0IGV4dGVuZHMgUGllY2UgaW1wbGVtZW50cyBJUGllY2Uge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlciwgY29sb3I6IENvbG9yKSB7XG4gICAgICAgIHN1cGVyKHJvdywgY29sdW1uLCBjb2xvcik7XG4gICAgICAgIHRoaXMuTW92ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG59XG4iLCJpbXBvcnQgeyBJUGllY2UsIENvbG9yLCBQaWVjZSB9IGZyb20gJy4vcGllY2UnXG5pbXBvcnQgeyBQYXduIH0gZnJvbSAnLi9wYXduJ1xuaW1wb3J0IHsgUm9vayB9IGZyb20gJy4vcm9vaydcbmltcG9ydCB7IEtuaWdodCB9IGZyb20gJy4va25pZ2h0J1xuaW1wb3J0IHsgQmlzaG9wIH0gZnJvbSAnLi9iaXNob3AnXG5pbXBvcnQgeyBRdWVlbiB9IGZyb20gJy4vcXVlZW4nXG5pbXBvcnQgeyBLaW5nIH0gZnJvbSAnLi9raW5nJ1xuXG52YXIgYm9hcmRNYXRyaXg6IFBpZWNlW11bXSA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUGllY2VzKGJvYXJkR3JpZDogUGllY2VbXVtdKTogdm9pZCB7XG4gICAgLy8gV2hpdGUgcGllY2VzXG4gICAgYm9hcmRNYXRyaXhbMF1bMF0gPSBuZXcgUm9vaygwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzFdID0gbmV3IEtuaWdodCgwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzJdID0gbmV3IEJpc2hvcCgwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzNdID0gbmV3IFF1ZWVuKDAsIDAsIENvbG9yLndoaXRlKTsgXG4gICAgYm9hcmRNYXRyaXhbMF1bNF0gPSBuZXcgS2luZygwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzVdID0gbmV3IEJpc2hvcCgwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzZdID0gbmV3IEtuaWdodCgwLCAwLCBDb2xvci53aGl0ZSk7IFxuICAgIGJvYXJkTWF0cml4WzBdWzddID0gbmV3IFJvb2soMCwgMCwgQ29sb3Iud2hpdGUpOyBcbiAgICAvLyBXaGl0ZSBwYXduc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgIGJvYXJkTWF0cml4WzFdW2pdID0gbmV3IFBhd24oMSwgaiwgQ29sb3Iud2hpdGUpO1xuICAgIH1cbiAgICAvLyBCbGFjayBwaWVjZXNcbiAgICBib2FyZE1hdHJpeFs3XVswXSA9IG5ldyBSb29rKDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bMV0gPSBuZXcgS25pZ2h0KDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bMl0gPSBuZXcgQmlzaG9wKDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bM10gPSBuZXcgUXVlZW4oMCwgMCwgQ29sb3IuYmxhY2spOyBcbiAgICBib2FyZE1hdHJpeFs3XVs0XSA9IG5ldyBLaW5nKDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bNV0gPSBuZXcgQmlzaG9wKDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bNl0gPSBuZXcgS25pZ2h0KDAsIDAsIENvbG9yLmJsYWNrKTsgXG4gICAgYm9hcmRNYXRyaXhbN11bN10gPSBuZXcgUm9vaygwLCAwLCBDb2xvci5ibGFjayk7IFxuICAgIC8vIEJsYWNrIHBhd25zICAgIFxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgIGJvYXJkTWF0cml4WzZdW2pdID0gbmV3IFBhd24oMSwgaiwgQ29sb3IuYmxhY2spO1xuICAgIH1cbn1cblxuaW5pdGlhbGl6ZVBpZWNlcyhib2FyZE1hdHJpeCk7XG5cbmNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkJyk7XG4vLyBib2FyZC5jbGFzc0xpc3QubGVuZ3RoXG5ib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHggPSBwYXJzZUludCgoZS50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQpLmdldEF0dHJpYnV0ZSgncm93JykpXG4gICAgY29uc3QgeSA9IHBhcnNlSW50KChlLnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudCkuZ2V0QXR0cmlidXRlKCdjb2x1bW4nKSlcbiAgICBjb25zdCBvYmogPSBib2FyZE1hdHJpeFt4XVt5XTtcbiAgICBjb25zb2xlLmxvZyhvYmopO1xuICAgIGNvbnNvbGUubG9nKGByb3c6ICR7eH0sIGNvbHVtbjogJHt5fWApO1xufSlcbiIsImltcG9ydCB7IFBpZWNlLCBJUGllY2UsIENvbG9yIH0gZnJvbSAnLi9waWVjZSc7XG5cbmV4cG9ydCBjbGFzcyBQYXduIGV4dGVuZHMgUGllY2UgaW1wbGVtZW50cyBJUGllY2Uge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlciwgY29sb3I6IENvbG9yKSB7XG4gICAgICAgIHN1cGVyKHJvdywgY29sdW1uLCBjb2xvcik7XG4gICAgICAgIHRoaXMuTW92ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG59XG4iLCJleHBvcnQgZW51bSBDb2xvciB7XG4gICAgd2hpdGUgPSAnd2hpdGUnLFxuICAgIGJsYWNrID0gJ2JsYWNrJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQaWVjZSB7XG4gICAgcm93OiBudW1iZXJcbiAgICBjb2x1bW46IG51bWJlclxuICAgIGNvbG9yOiBDb2xvclxuICAgIE1vdmVkOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBQaWVjZSBpbXBsZW1lbnRzIElQaWVjZSB7XG4gICAgcHVibGljIE1vdmVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJvdzogbnVtYmVyLCBwdWJsaWMgY29sdW1uOm51bWJlciwgcHVibGljIGNvbG9yOiBDb2xvcikge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5Nb3ZlZCA9IGZhbHNlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQaWVjZSwgSVBpZWNlLCBDb2xvciB9IGZyb20gJy4vcGllY2UnO1xuXG5leHBvcnQgY2xhc3MgUXVlZW4gZXh0ZW5kcyBQaWVjZSBpbXBsZW1lbnRzIElQaWVjZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyLCBjb2xvcjogQ29sb3IpIHtcbiAgICAgICAgc3VwZXIocm93LCBjb2x1bW4sIGNvbG9yKTtcbiAgICAgICAgdGhpcy5Nb3ZlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBcbn1cbiIsImltcG9ydCB7IFBpZWNlLCBJUGllY2UsIENvbG9yIH0gZnJvbSAnLi9waWVjZSc7XG5cbmV4cG9ydCBjbGFzcyBSb29rIGV4dGVuZHMgUGllY2UgaW1wbGVtZW50cyBJUGllY2Uge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlciwgY29sb3I6IENvbG9yKSB7XG4gICAgICAgIHN1cGVyKHJvdywgY29sdW1uLCBjb2xvcik7XG4gICAgICAgIHRoaXMuTW92ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG59XG4iXX0=
