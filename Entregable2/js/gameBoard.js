"use strict";
class GameBoard {
    constructor(canvas, ctx, rows, cols) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellImage = new Image();
        this.cellImage.src = "images/board-image.png";
        this.boardMatrix = [];
        this.initMatrix();
        this.initBoard();
    }
    //calculo el centro para dibujar el tablero
    initMatrix() {
        for (let i = 0; i < this.cols - 1; i++) {
            this.boardMatrix[i] = [];
            for (let j = 0; j < this.rows - 1; j++) {
                this.boardMatrix[i][j] = undefined;
            }
        }
    }
    initBoard() {
        this.cellImage.onload = function () {
            this.drawBoard();
        }.bind(this);

    }

    calculatePosition() {
        const sizeToken = 48;
        return {
            x: (this.canvas.width / 2) - (this.cols / 2) * sizeToken - 1.5,
            y: (this.canvas.height / 2) - (this.rows / 2) * sizeToken
        }
    }

    drawBoard() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y
        let boardPattern = this.ctx.createPattern(this.cellImage, 'repeat');
        this.ctx.fillStyle = boardPattern;
        this.ctx.fillRect(x, y, this.cellImage.width * this.cols, this.cellImage.height * this.rows);
    }

    isHorizontalWinner(rows) {//pasarfila

    }
    isVerticalWinner(cols) {//pasar columna

    }
    isDiagonalAscWinner(row, col) {//pasar fila y columna

    }
    isDiagonalDescWinner(row,col) {//pasar fila y columna

    }
}