class Figure {
    constructor(posX, posY, color, context) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.ctx = context;
        this.highlighted = false;
        this.fillHighlighted = '#c4f8f8'
    }
    getRadius() {
    }
    loadImages() {

    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    getPosition() {
        return {
            x: this.getposX(),
            y: this.getposY()
        }
    }
    getposX() {
        return this.posX;
    }
    getposY() {
        return this.posY;
    }
    draw() {
        this.ctx.fillStyle = this.fill;
    }
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    isPointInside(x, y) {

    }
}