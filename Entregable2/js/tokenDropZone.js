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
    //se carga la imagen
    loadImages() {
        this.dropImage.onload = function () {
            this.draw();
        }.bind(this);
    }

    //dibujo la ficha con la imagen correspondiente dependiendo del color 
    draw() {
        let dropPattern = this.ctx.createPattern(this.dropImage, 'repeat');
        this.ctx.fillStyle = dropPattern;
        this.ctx.save();
        this.ctx.translate(this.posX, this.posY);
        //this.ctx.fillRect(this.posX, this.posY, this.dropImage.width * this.cols, this.dropImage.height);
        this.ctx.fillRect(0, 0, this.dropImage.width * this.cols, this.dropImage.height);
        this.ctx.restore()
    }

    getRadius() {
        return this.sizeToken / 2;
    }
    getColumn() {
        return
    }
    //verifico si estoy en la drop zone
    isInDropZone(lastTokenClicked) {
        let posXLastToken = lastTokenClicked.getPosition().x;
        let posYLastToken = lastTokenClicked.getPosition().y;
        let posDropInit, posDropEnd, posDropInitY, posDropEndY;
        posDropInit = this.getPosition().x;
        posDropEnd = this.getPosition().x + this.sizeToken * this.cols;
        posDropInitY = this.getPosition().y;
        posDropEndY = this.getPosition().y + this.sizeToken;
        if (posXLastToken > posDropInit && posXLastToken < posDropEnd && posYLastToken > posDropInitY && posYLastToken < posDropEndY) {//comparo a partir de los límites de la drop zone
            return true;
        } else {
            return false;
        }
    }
    //calculo en que columa se encuentra la ficha arrojada en la zona de lanzamiento de fichas 
    getDropZoneIndex(lastTokenClicked) {
        let posXLastToken = lastTokenClicked.getPosition().x;
        let posDropInit = this.getPosition().x;
        let posDropEnd = this.getPosition().x + this.sizeToken;
        for (let index = 0; index < this.cols; index++) {
            console.log(posDropInit,posDropEnd);
            if (posXLastToken > posDropInit && posXLastToken < posDropEnd) {
                return index;
            }
            posDropInit = posDropEnd;
            posDropEnd = posDropEnd + this.sizeToken;
        }
        return -1;
    }

    //obtengo la posición de la ficha en x y en y
    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        }
    }
    //seteo una nueva posición
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    //resaltado
    setHighlight(highlighted) {
        this.highlighted = highlighted;
    }


}