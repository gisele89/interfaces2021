class Game {
    constructor(canvas, ctx, width, heigth, boardRow, boardCol) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.heigth = heigth;
        this.maxTokens = boardCol * boardRow;
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        let tokens = [];
        let lastTokenClicked = null;
        let isMouseDown = false;
    }

    initGame() {
        this.createBoard();
    }

    createTokens(colorPlayer) {//creo las fichas para cada jugador
        let colorPlayer1 = 'red';
        let colorPlayer2 = 'blue';
        for (let index = 0; index < maxTokens / 2; index++) {
            createToken(colorPlayer1);
        }
        for (let index = maxToken / 2; maxToken / 2 < maxToken - 1; index++) {
            createToken(colorPlayer2);
        }
    }


    createToken(color) { //creo una ficha del color correspondiente
        let token = new Token(color);
        token.drawToken();

    }

    createBoard() {
        let board = new GameBoard(this.canvas, this.ctx, this.boardRow, this.boardCol);
        board.drawBoard();
    }
    isWinner() {
        return isHorizontalWinner() || isVerticalWinner() || isDiagonalAscWinner() || isDiagonalDescWinner();
    }

    isHorizontalWinner() {//pasarfila

    }
    isVerticalWinner() {//pasar columna

    }
    isDiagonalAscWinner() {//pasar fila y columna

    }
    isDiagonalDescWinner() {//pasar fila y columna

    }

}