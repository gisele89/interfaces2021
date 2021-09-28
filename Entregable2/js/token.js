"use strict";
class Token {

    constructor(posx, posy, color, context) {
        this.posx = posx;
        this.posy = posy;
        this.color = color;
        this.ctx = context;
        this.redToken = new Image();
        redToken.src = "images/ficha-roja.png";
        this.blueToken = new Image();
        blueToken.src = "images/ficha-azul.png";
        this.sizeToken = 30;

    }
    drawToken() {
        let rt = 'red';
        if (color == rt) {
            this.ctx.drawImage(this.redToken, this.posx, this.posy, this.sizeToken, this.sizeToken);
        } else {
            this.ctx.drawImage(this.blueToken, this.posx, this.posy, this.sizeToken, this.sizeToken);
        }

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


}
