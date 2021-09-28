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


    drawBoard() {
        this.cellImage.onload = function() {
            let miPatron = this.ctx.createPattern(this.cellImage, 'repeat');
            this.ctx.fillStyle = miPatron;
            this.ctx.fillRect(0, 0, this.cellImage.width * this.cols, this.cellImage.height * this.rows);
        }.bind(this);    
    }
}