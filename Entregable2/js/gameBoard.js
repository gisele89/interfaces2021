"use strict";
class GameBoard {
    constructor(canvas, ctx, rows, cols) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellImage = new Image();
        this.cellImage.src = "images/board-image.png";
    }
     //calculo el centro para dibujar el tablero
    calculatePosition() {
        const sizeToken = 48;
        return {
            x: (this.canvas.width / 2) - (this.cols / 2) * sizeToken-1.5,
            y: (this.canvas.height/2) - (this.rows/2)*sizeToken
        }
    }
    drawBoard() {
        this.cellImage.onload = function () {
            let x =this.calculatePosition().x;
            let y = this.calculatePosition().y
            let boardPattern = this.ctx.createPattern(this.cellImage, 'repeat');
            this.ctx.fillStyle = boardPattern;
            this.ctx.fillRect(x, y, this.cellImage.width * this.cols, this.cellImage.height * this.rows);
        }.bind(this);
    }
}