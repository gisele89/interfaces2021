class Game {
    constructor(canvas, ctx, boardRow, boardCol) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        this.maxTokens = 0;
        this.tokens = [];
        this.maxTokensToWin = this.boardRow;
        this.lastTokenClicked = null;
        this.isMouseDown = false;
        this.board = null;
        this.countdown = null;
        this.player1 = null;
        this.player2 = null;
        this.turn = null;
    }
    setBoardRow(br) {
        this.boardRow = br;
    }
    setBoardCol(bc) {
        this.boardCol = bc;
    }

    initGame() {
        this.maxTokensToWin = this.boardRow;
        this.clearCanvas();
        this.createBoard();
        this.createTokens();
        this.nextTurn();
    }

    createTokens() {//creo las fichas para cada jugador        
        let colorPlayer1 = 'red';
        let colorPlayer2 = 'blue';
        this.tokens = [];
        this.maxTokens = this.boardCol * this.boardRow;
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = this.canvas.height/3 + 20 * index;
            let posX = this.canvas.width/2 - this.boardCol * 50 - 20;
            this.createToken(colorPlayer1, posX, posY);
            
        }
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = this.canvas.height/3 + 20 * index;
            let posX = this.canvas.width/2 + this.boardCol * 50 + 20;
            //let posX = Math.round(Math.random() * this.canvas.width);//revisar
            //let posY = Math.round(Math.random() * this.canvas.heigth);//revisar            
            this.createToken(colorPlayer2, posX, posY);
        }
        this.disableTokens();
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
        console.log(e);
        this.isMouseDown = true;
        if (this.lastTokenClicked != null) {
            this.lastTokenClicked.setHighlight(false);
            this.lastTokenClicked = null;
        }

        let clickedFigure = this.findClickedFigure(e.layerX, e.layerY);
        if ( clickedFigure != null && this.verifyTurn(clickedFigure) ) {
            clickedFigure.setHighlight(true);
            this.lastTokenClicked = clickedFigure;
        }
        this.reDraw();
    }
    onMouseMove(e) {
        if (this.isMouseDown && this.lastTokenClicked != null && !this.lastTokenClicked.getDisableToken()) {
            this.lastTokenClicked.setPosition(e.layerX, e.layerY);
            this.reDraw();
        }
    }
    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.verifyTokenIsInDropZone()) {
            this.addTokenToGameBoard();
            this.reDraw();
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
        return this.board.isInTokenDropZone(this.lastTokenClicked);
    }
    //se agregan las fichas que se van situando en la dropzone
    addTokenToGameBoard() {
        this.board.addToken(this.lastTokenClicked);
        let winner;
        if (this.board.getDroppedTokensCount() >= this.maxTokensToWin) {
            winner = this.isWinner(this.lastTokenClicked, this.maxTokensToWin);
            if (winner) {
                this.clearCountdown();
                document.querySelector("#msj").innerHTML = "¡Felicitaciones, Ganaste " + this.turn + "!";
                this.disableTokens();
            } else {
                this.nextTurn();
            }

        }else{
            this.nextTurn();
        }
    }
    //se resetea el mensaje a vacio cuando se presiona el botón
    resetMessage() {
        document.querySelector("#msj").innerHTML = "";
    }

    //verifico que hay un ganador
    isWinner(lastTokenClicked, maxTokensToWin) {
        return this.board.isHorizontalWinner(lastTokenClicked, maxTokensToWin) || this.board.isVerticalWinner(lastTokenClicked, maxTokensToWin) || this.board.isDiagonalAscWinner(lastTokenClicked, maxTokensToWin) || this.board.isDiagonalDescWinner(lastTokenClicked, maxTokensToWin);
    }

    disableTokens() {
        for (let index = 0; index < this.tokens.length; index++) {
            this.tokens[index].setDisableToken();
        }
    }

    enableTokens() {
        for (let index = 0; index < this.tokens.length; index++) {
            this.tokens[index].setEnableToken();
        }
    }

    doCountdown() {
        let countDownDate = new Date();
        countDownDate = countDownDate.getTime() + 61000;

        this.countdown = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.querySelector("#timer").innerHTML = "0" + minutes + ": " + ("0" + seconds).slice(-2);
            if (distance < 0) {
                clearInterval(this.countdown);
                document.querySelector("#timer").innerHTML = "¡Se acabó el tiempo!";
                this.disableTokens();
            }
        }.bind(this), 1000);
    }

    clearCountdown() {
        clearInterval(this.countdown);
    }

    //
    nextTurn() {
        this.jugador1 = 'Jugador 1';
        this.jugador2 = 'Jugador 2';
        if ( this.turn == null || this.turn == this.jugador2) {
            this.turn = this.jugador1;
        }else {
            this.turn = this.jugador2;
        }
        document.querySelector("#msj").innerHTML = "Turno " + this.turn;
    }

    //Verifico si la ficha clickeada corresponde con el turno actual
    verifyTurn( clickedElement ) {
        if ( ( clickedElement.color == 'red' && this.turn == this.jugador1 ) || ( clickedElement.color == 'blue' && this.turn == this.jugador2 ) ) {
            return true;
        } else {
            return false;
        }
    }
}
