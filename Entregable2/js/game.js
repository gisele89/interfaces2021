class Game {
    constructor(canvas, ctx, boardRow, boardCol) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maxTokens = boardCol * boardRow;
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        this.tokens = [];
        this.lastTokenClicked = null;
        this.isMouseDown = false;
    }
    setBoardRow(br) {
        this.boardRow = br;
        console.log(br);
    }
    setBoardCol(bc) {
        this.boardCol = bc;
        console.log(bc);
    }

    initGame() {
        this.clearCanvas();
        this.createBoard();
        this.createTokens();
    }

    createTokens() {//creo las fichas para cada jugador
        this.clearCanvas();
        let colorPlayer1 = 'red';
        let colorPlayer2 = 'blue';
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = Math.round(Math.random() * 720) + 100;
            let posX = Math.round(Math.random() * 300);
            this.createToken(colorPlayer1, posX, posY);
            console.log("hola ficha roja");
        }
        for (let index = this.maxTokens / 2; index < this.maxTokens; index++) {
            let posY = Math.round(Math.random() * 720) + 100;//revisar
            let posX = Math.round(Math.random() * (this.canvas.width - 650) + 650);//revisar
            this.createToken(colorPlayer2, posX, posY);
            console.log("hola ficha azul");
        }
    }


    createToken(color, posX, posY) { //creo una ficha del color correspondiente
        let token = new Token(posX, posY, color, this.ctx,);
        token.drawToken()
        this.tokens.push(token);//donde va?

    }

    createBoard() {
        this.clearCanvas();
        console.log("Me llega" + this.boardRow);
        console.log("Me llega" + this.boardCol);
        let board = new GameBoard(this.canvas, this.ctx, this.boardRow, this.boardCol);
        board.drawBoard();
    }
    clearCanvas() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.heigth);
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        if (this.lastFiguredClicked != null) {
            this.lastFiguredClicked.setHighlight(false);
            this.lastFiguredClicked = null;
        }
        let clickedFigure = this.findClickedFigure(e.layerX, e.layerY);
        if (clickedFigure != null) {
           clickedFigure.setHighlight(true);
            this.lastFiguredClicked = clickedFigure;
        }
        this.drawToken();//seria drawtokens
    }
    onMouseMove(e) {
        if (this.isMouseDown && this.lastFiguredClicked != null) {
            this.lastFiguredClicked.setPosition(e.layerX, e.layerY);
            this.drawToken();
        }
    }
    onMouseUp(e) {
        this.isMouseDown = false;
    }
     findClickedFigure(x, y) {
        for (let index = 0; index < tokens.length; index++) {
            const element = tokens[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
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