class Game {
    constructor(canvas, ctx, boardRow, boardCol) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        this.maxTokens = 0;
        this.tokens = [];
        this.lastTokenClicked = null;
        this.isMouseDown = false;
        this.board = null;
    }
    setBoardRow(br) {
        this.boardRow = br;
    }
    setBoardCol(bc) {
        this.boardCol = bc;
    }

    initGame() {
        this.clearCanvas();
        this.createBoard();
        this.createTokens();
    }

    createTokens() {//creo las fichas para cada jugador        
        let colorPlayer1 = 'red';
        let colorPlayer2 = 'blue';
        this.tokens = [];
        this.maxTokens = this.boardCol * this.boardRow;
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = Math.round(Math.random() * 720) + 10;
            let posX = Math.round(Math.random() * 300);
            this.createToken(colorPlayer1, posX, posY);
        }
        for (let index = this.maxTokens / 2; index < this.maxTokens; index++) {
            let posY = Math.round(Math.random() * 720) + 10;//revisar
            let posX = Math.round(Math.random() * (this.canvas.width - 650)) + 750;//revisar
            //let posX = Math.round(Math.random() * this.canvas.width);//revisar
            //let posY = Math.round(Math.random() * this.canvas.heigth);//revisar            
            this.createToken(colorPlayer2, posX, posY);
        }
    }


    createToken(color, posX, posY) { //creo una ficha del color correspondiente
        let token = new Token(posX, posY, color, this.ctx);
        token.draw()
        this.tokens.push(token);//coloco las fichas en ele arreglo de fichas

    }

    createBoard() {
        this.board = new GameBoard(this.canvas, this.ctx, this.boardRow, this.boardCol);
        this.board.drawBoard();
        this.board.drawDropZone();
    }

    drawBoard() {
        this.board.drawBoard();
        this.board.drawDropZone();
    }


    clearCanvas() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    reDraw() {
        this.clearCanvas();
        this.drawBoard();
        for (let index = 0; index < this.tokens.length; index++) {
            this.tokens[index].draw();
        }
    }

    onMouseDown(e) {
        this.isMouseDown = true;
        if (this.lastTokenClicked != null) {
            this.lastTokenClicked.setHighlight(false);
            this.lastTokenClicked = null;
        }

        let clickedFigure = this.findClickedFigure(e.layerX, e.layerY);
        if (clickedFigure != null) {
            clickedFigure.setHighlight(true);
            this.lastTokenClicked = clickedFigure;
        }
        this.reDraw();
    }
    onMouseMove(e) {
        if (this.isMouseDown && this.lastTokenClicked != null) {
            this.lastTokenClicked.setPosition(e.layerX, e.layerY);
            this.reDraw();
        }
    }
    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.verifyTokenIsInDropZone()) {
            this.addTokenToGameBoard();
            this.reDraw();
            console.log("Estoy en el tablero");
        } else {
            console.log("No estoy en la zona");
        }
    }

    findClickedFigure(x, y) {
        for (let index = 0; index < this.tokens.length; index++) {
            const element = this.tokens[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    verifyTokenIsInDropZone() {
        console.log(this.lastTokenClicked);
        return this.board.isInTokenDropZone(this.lastTokenClicked);//boolean
    }
    addTokenToGameBoard() {
        this.board.addToken(this.lastTokenClicked);
        this.deleteTokenAddedToMatrix(this.lastTokenClicked);
    }
    deleteTokenAddedToMatrix(lastTokenClicked) {
        for (let index = 0; index < this.tokens.length; index++) {
            if (this.tokens[index].getPosition().x == lastTokenClicked.getPosition().x && this.tokens[index].getPosition().y == lastTokenClicked.getPosition().y) {
                this.tokens.slice(index);
            }
        }
    }

    isWinner() {
        return this.board.isHorizontalWinner() || this.board.isVerticalWinner() || this.board.isDiagonalAscWinner() || this.board.isDiagonalDescWinner();
    }
}
