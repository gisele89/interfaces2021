"use strict";
class GameBoard {
    constructor(canvas, ctx, rows, cols) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellImage = new Image();
        this.cellImage.src = "images/board-image.png";
        this.sizeToken = 50;
        this.boardMatrix = [];
        this.tokenDropZone = [];
        this.initMatrix();
        this.initBoard();
        this.initDropZone();
    }
    //cargo con vacio la matriz para el tablero donde se colocaran las fichas
    initMatrix() {
        for (let i = 0; i < this.cols - 1; i++) {
            this.boardMatrix[i] = [];
            for (let j = 0; j < this.rows - 1; j++) {
                this.boardMatrix[i][j] = undefined;
            }
        }
    }

    initDropZone() {
        for (let i = 0; i < this.cols - 1; i++) {
            this.tokenDropZone[i] = this.drawDropZone();
        }
    }
    //dibujo la zona habilitada para arrojar las fichas
    drawDropZone() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y - this.sizeToken; //le resto el tamaño de la ficha de drop zone para dibujar una fila antes del tablero
        let tokenDropZone = new TokenDropZone(x, y, this.ctx, this.cols);
        tokenDropZone.draw();
    }
    initBoard() {
        this.cellImage.onload = function () {
            this.drawBoard();
        }.bind(this);
    }
    //calculo el centro para dibujar el tablero
    calculatePosition() {
        return {
            x: (this.canvas.width / 2) - (this.cols / 2) * this.sizeToken - 1.5,
            y: (this.canvas.height / 2) - (this.rows / 2) * this.sizeToken
        }
    }
    //dibujo el tablero
    drawBoard() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y
        let boardPattern = this.ctx.createPattern(this.cellImage, 'repeat');
        this.ctx.fillStyle = boardPattern;
        this.ctx.fillRect(x, y, this.cellImage.width * this.cols, this.cellImage.height * this.rows);
    }
    //verifico si la posición de la última figura clickeada coincide con alguna posición de la drop zone
    isInTokenDropZone(lastTokenClicked) {
        let posXLastToken = lastTokenClicked.getPosition().x + (lastTokenClicked.getRadius()) / 2; //hace falta sumar el radio?
        let posYLastToken = lastTokenClicked.getPosition().y + (lastTokenClicked.getRadius()) / 2;
        for (let index = 0; index < this.cols; index++) {
            if (isPointInside(this.tokenDropZone[index]) == posXLastToken && this.tokenDropZone[index].y == posYLastToken) {
                return true;//acomodar ésto a lo nuevo
            }
            return false;
        }
    }

    isHorizontalWinner(rows) {//pasarfila

    }
    isVerticalWinner(cols) {//pasar columna

    }
    isDiagonalAscWinner(row, col) {//pasar fila y columna

    }
    isDiagonalDescWinner(row, col) {//pasar fila y columna

    }
}