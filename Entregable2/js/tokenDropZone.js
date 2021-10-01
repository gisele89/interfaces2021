"use strict"
class TokenDropZone extends Figure {
    constructor(posX, posY, context, cols) {
        super(posX, posY, context);
        this.cols = cols;
        this.dropImage = new Image();
        this.dropImage.src = "images/drop-image.png";
        this.sizeToken = 50;
        this.highlighted = false;
        this.fillHighlighted = '#c4f8f8';
        this.setPosition(posX, posY);
        this.loadImages();
    }

    loadImages() {
        this.dropImage.onload = function () {
            this.draw();
        }.bind(this);
    }

    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    draw() {
        let dropPattern = this.ctx.createPattern(this.dropImage, 'repeat');
        this.ctx.fillStyle = dropPattern;
        this.ctx.fillRect(this.posX, this.posY, this.dropImage.width * this.cols, this.dropImage.height);
    }

    getRadius() {
        return this.sizeToken / 2;
    }

    isPointInside(tokenDropZone) {
        let x = tokenDropZone.getPosX();
        let y = tokenDropZone.getPosY();
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {
            tokenDropZone.setPosition(this.posX, this.posY);
        }
        return isInside;
    }
    //verifico si estoy en la drop zone
    isInDropZone(lastTokenClicked) {
        let posXLastToken = lastTokenClicked.getPosition().x
        let posYLastToken = lastTokenClicked.getPosition().y
        let posDropInit, posDropEnd, posDropInitY, posDropEndY;
        posDropInit = this.getPosition().x;
        posDropEnd = this.getPosition().x + this.sizeToken * this.cols;
        posDropInitY = this.getPosition().y;
        posDropEndY = this.getPosition().y + this.sizeToken;
        if (posXLastToken > posDropInit && posXLastToken < posDropEnd && posYLastToken > posDropInitY && posYLastToken < posDropEndY) {//comparo a partir de los límites de la drop zone
            console.log("está en la drop zone")
            return true;
        } else {
            return false;
        }
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