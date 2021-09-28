"use strict";
class Token {

    constructor(posx, posy, color, context) {
        this.posx = posx;
        this.posy = posy;
        this.color = color;
        this.ctx = context;
        this.redToken = new Image();
        this.redToken.src = "images/fichas-roja.png";
        this.blueToken = new Image();
        this.blueToken.src = "images/fichas-azul.png";
        this.sizeToken = 30;
        this.highlighted = false;
        this.fillHighlighted= '#c4f8f8';

    }
    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    drawToken() {
        let rt = 'red';
        this.redToken.onload, this.blueToken.onload = function() {
            if (this.color == rt) {
                this.ctx.drawImage(this.redToken, this.posx, this.posy, this.sizeToken, this.sizeToken);
            } else {
                this.ctx.drawImage(this.blueToken, this.posx, this.posy, this.sizeToken, this.sizeToken);
            }
        }.bind(this);
        
    }
    getRadius() {
        return this.sizeToken / 2;
    }
    isPointInside(x, y) {
        let _x = this.posx - x;
        let _y = this.posy - y;
        return Math.sqrt(_x * _x + _y * _y) < this.getRadius;
    }

    setPosition(x,y){
        this.posX = x - this.getRadius;
        this.posY = y - this.getRadius;
    }
    setHighlight(highlighted) {
        this.highlighted = highlighted;
    }


}
