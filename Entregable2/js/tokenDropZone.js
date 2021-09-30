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
        let dropPattern = this.context.createPattern(this.dropImage, 'repeat');
        this.context.fillStyle = dropPattern;
        this.ccontext.fillRect(x, y, this.dropImage.width * this.cols, this.dropImage.height);
    }

    getRadius() {
        return this.sizeToken / 2;
    }

    isPointInside(tokenDropZone) {
        let x = tokenDropZone.getPosX();
        let y = tokenDropZone.getPosY();
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        if (isInside == true) {
            figure.setPosition(this.posX, this.posY);
        }
        return isInside;
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