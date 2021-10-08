class Game {
    constructor(canvas, ctx, boardRow, boardCol) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        this.maxTokens = 0;
        this.tokens = [];
        this.maxTokensToWin = boardRow - 2;
        this.lastTokenClicked = null;
        this.lastTokenPreviousPosition = null;
        this.isMouseDown = false;
        this.board = null;
        this.countdown = null;
        this.player1 = null;
        this.player2 = null;
        this.turn = null;
        this.imageToChangeRed = null;
        this.imageToChangeBlue = null;

    }
    //se setea las filas
    setBoardRow(br) {
        this.boardRow = br;
    }
    //se setea las columnas
    setBoardCol(bc) {
        this.boardCol = bc;
    }
    //se inicia el juego creando tablero, fichas, valor de X en linea y seteando turnos
    initGame() {
        this.maxTokensToWin = this.boardRow - 2;
        this.clearCanvas();
        this.createBoard();
        this.createTokens();
        // this.nextTurn();
    }
    setImageToChangeRed(img) {
        this.imageToChangeRed = img;
        console.log("seteo de imagen hecho")
    }
    setImageToChangeBlue(img) {
        this.imageToChangeBlue = img;
        console.log("seteo de imagen hecho")
    }

    createTokens() {//creo las fichas para cada jugador        
        let colorPlayer1 = 'red';
        let colorPlayer2 = 'blue';
        this.tokens = [];
        this.maxTokens = this.boardCol * this.boardRow;
        //creo las fichas rojas
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = this.canvas.height / 3 + 20 * index;
            let posX = this.canvas.width / 2 - this.boardCol * 50 - 20;
            this.createToken(colorPlayer1, posX, posY, this.imageToChangeRed);

        }
        //creo las fichas azules
        for (let index = 0; index < this.maxTokens / 2; index++) {
            let posY = this.canvas.height / 3 + 20 * index;
            let posX = this.canvas.width / 2 + this.boardCol * 50 + 20;
            this.createToken(colorPlayer2, posX, posY, this.imageToChangeBlue);
        }
        this.disableTokens();
    }


    createToken(color, posX, posY, imageToChange) { //creo una ficha del color correspondiente
        let token = new Token(posX, posY, color, this.ctx, imageToChange);
        token.draw()
        this.tokens.push(token);//coloco las fichas en ele arreglo de fichas

    }
    //cero el tablero y lo dibujo, así como también la zona d elanzamiento de fichas
    createBoard() {
        this.board = new GameBoard(this.canvas, this.ctx, this.boardRow, this.boardCol);
        this.board.drawBoard();
        this.board.drawDropZone();
    }
    //se dibuja el tablero y la zona de lanzamiento de fichas
    drawBoard() {
        this.board.drawBoard();
        this.board.drawDropZone();
    }

    //se limpian el canvas estableciendo un color blanco
    clearCanvas() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //redibujo el tablero y las fichas
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
        if (clickedFigure != null && this.verifyTurn(clickedFigure)) {
            clickedFigure.setHighlight(true);
            this.lastTokenClicked = clickedFigure;
        }
        this.reDraw();//redibujo
    }
    //con el movimiento del mouse se obtiene la posición del mismo y se va redibujando la ficha
    onMouseMove(e) {
        if (this.isMouseDown && this.lastTokenClicked != null && !this.lastTokenClicked.getDisableToken()) {
            this.lastTokenClicked.setPosition(e.layerX, e.layerY);
            this.reDraw();
        }
    }
    //cuando se suelta una ficha se verifica si se encuentra en la zona de lanzamiento, sí es así se agrega a la matriz del tablero y se redibuja
    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.verifyTokenIsInDropZone()) {
            this.addTokenToGameBoard();
            this.reDraw();
        }else {
            this.lastTokenClicked.setPosition( this.lastTokenPreviousPosition.x, this.lastTokenPreviousPosition.y );
            this.reDraw();
        }
    }

    findClickedFigure(x, y) {
        for (let index = 0; index < this.tokens.length; index++) {
            const element = this.tokens[index];
            if (element.isPointInside(x, y)) {
                this.lastTokenPreviousPosition = element.getPosition()
                return element;
            }
        }
    }
    //se verifica que última ficha clickeada esté dentro de los límites de la zona de lanzamiento
    verifyTokenIsInDropZone() {
        return this.board.isInTokenDropZone(this.lastTokenClicked);
    }
    //se agregan al tablero  las fichas que se van situando en la dropzone
    addTokenToGameBoard() {
        this.board.addToken(this.lastTokenClicked);
        let winner;
        if (this.board.getDroppedTokensCount() >= this.maxTokensToWin) {
            winner = this.isWinner(this.lastTokenClicked, this.maxTokensToWin);//se verifica si ha ganador
            if (winner) {
                this.clearCountdown();//reseteo del timer
                document.querySelector("#msj").innerHTML = "¡Felicitaciones, Ganaste " + this.turn + "!";
                this.disableTokens();
            } else {
                this.nextTurn();
            }

        } else {
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
    //deshabilito fichas
    disableTokens() {
        for (let index = 0; index < this.tokens.length; index++) {
            this.tokens[index].setDisableToken();
        }
    }
    //habilito fichas
    enableTokens() {
        for (let index = 0; index < this.tokens.length; index++) {
            this.tokens[index].setEnableToken();
        }
    }
    //se realiza la cuenta atrás de 1 minuto
    doCountdown() {
        let countDownDate = new Date();
        countDownDate = countDownDate.getTime() + 61000;//obtengo la fecha actual y le sumo 1 minuto

        this.countdown = setInterval(function () {
            let now = new Date().getTime();//fecha actual
            let distance = countDownDate - now;

            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.querySelector("#timer-title").innerHTML = "Te quedan:";
            document.querySelector("#timer").innerHTML = "0" + minutes + ": " + ("0" + seconds).slice(-2);
            if (distance < 0) {
                clearInterval(this.countdown);//reseteo
                document.querySelector("#timer").innerHTML = "¡Se acabó el tiempo!";
                this.disableTokens();
            }
        }.bind(this), 1000);
    }
    //reseteo del timer
    clearCountdown() {
        clearInterval(this.countdown);
    }

    //
    nextTurn() {
        this.jugador1 = 'Jugador 1';
        this.jugador2 = 'Jugador 2';
        if (this.turn == null || this.turn == this.jugador2) {
            this.turn = this.jugador1;
        } else {
            this.turn = this.jugador2;
        }
        document.querySelector("#msj").innerHTML = "Turno " + this.turn;
    }

    //Verifico si la ficha clickeada corresponde con el turno actual
    verifyTurn(clickedElement) {
        if ((clickedElement.color == 'red' && this.turn == this.jugador1) || (clickedElement.color == 'blue' && this.turn == this.jugador2)) {
            return true;
        } else {
            return false;
        }
    }
}
