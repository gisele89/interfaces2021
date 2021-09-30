"use strict";
class Token extends Figure{

    constructor(posX, posY, color, context) {
        super(posX, posY, color, context);
        this.redToken = new Image();
        this.redToken.src = "images/fichas-roja.png";
        this.blueToken = new Image();
        this.blueToken.src = "images/fichas-azul.png";
        this.sizeToken = 40;
        this.highlighted = false;
        this.fillHighlighted = '#c4f8f8';
        this.setPosition(posX, posY);
        this.loadImages();
    }

    loadImages() {
        this.redToken.onload, this.blueToken.onload = function () {
            this.draw();
        }.bind(this);
    }

    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    draw() {
        let rt = 'red';
        if (this.color == rt) {
            this.ctx.drawImage(this.redToken, this.posX, this.posY, this.sizeToken, this.sizeToken);
        } else {
            this.ctx.drawImage(this.blueToken, this.posX, this.posY, this.sizeToken, this.sizeToken);
        }
    }

    getRadius() {
        return this.sizeToken / 2;
    }

    isPointInside(x, y) {
        let radius = this.getRadius();
        let _x = (this.posX + radius) - x;
        let _y = (this.posY + radius) - y;
        return Math.sqrt(_x * _x + _y * _y) < radius;
    }
    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }

    setPosition(x, y) {
        let radius = this.getRadius();
        this.posX = x - radius;
        this.posY = y - radius;
    }
    setHighlight(highlighted) {
        this.highlighted = highlighted;
    }


}
