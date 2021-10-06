"use strict";
class Token extends Figure {

    constructor(posX, posY, color, context) {
        super(posX, posY, context, color);
        this.redToken = new Image();
        this.redToken.src = "images/fichas-roja.png";
        this.blueToken = new Image();
        this.blueToken.src = "images/fichas-azul.png";
        this.sizeToken = 40;
        this.highlighted = false;
        this.fillHighlighted = '#c4f8f8';
        this.disableToken = false;
        this.setPosition(posX, posY);
        this.loadImages();
    }
    //se carga la imágen
    loadImages() {
        this.redToken.onload, this.blueToken.onload = function () {
            this.draw();
        }.bind(this);
    }

    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    draw() {
        let rt = 'red';
        if (this.color == rt) {
            this.ctx.drawImage(this.redToken, this.posX, this.posY, this.sizeToken, this.sizeToken);//dibujo rojas
        } else {
            this.ctx.drawImage(this.blueToken, this.posX, this.posY, this.sizeToken, this.sizeToken);//dibujo azules
        }
    }

    getRadius() {
        return this.sizeToken / 2;
    }
    getColor() {
        return this.color;
    }
    //calculo si estoy dentro d ela ficha
    isPointInside(x, y) {
        let radius = this.getRadius();
        let _x = (this.posX + radius) - x;
        let _y = (this.posY + radius) - y;
        return Math.sqrt(_x * _x + _y * _y) < radius;
    }
    //obtengo posición
    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }
    //deshabilito y habilito fichas
    setDisableToken() {
        this.disableToken = true;
    }
    setEnableToken() {
        this.disableToken = false;
    }
    //obtengo el estado de la ficha
    getDisableToken() {
        return this.disableToken;
    }
    //seteo una nueva posición
    setPosition(x, y) {
        let radius = this.getRadius();
        this.posX = x - radius;
        this.posY = y - radius;
    }
    setHighlight(highlighted) {
        this.highlighted = highlighted;
    }


}
