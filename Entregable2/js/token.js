"use strict";
class Token {

    constructor(posx, posy, color, context) {
        this.posx = posx;
        this.posy = posy;
        this.color = color;
        this.ctx = context;
        let redToken = new Image();
        redToken.src = "images/ficha-roja.png";
        let blueToken = new Image();
        blueToken.src = "images/ficha-azul.png";
        let sizeToken = 30;

    }
    drawToken() {
        let rt = 'red';
        if (color == rt) {
            this.ctx.drawImage(redToken, posx, posy, sizeToken, sizeToken);
        } else {
            this.ctx.drawImage(blueToken, posx, posy, sizeToken, sizeToken);
        }

    }
    getRadius() {
        return sizeToken / 2;
    }
    isPointInside(x, y) {
        let _x = this.posx - x;
        let _y = this.posy - y;
        return Math.sqrt(_x * _x + _y * _y) < this.getRadius;
    }


}
