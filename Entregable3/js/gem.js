class Gem extends Element{
    constructor(spaceShip) {
        super(spaceShip);
        this.gem = null;
    }
    generateElement(randomPos) {
        this.gem = document.createElement("div");
        this.gem.setAttribute("class", "gem");
        this.gem.style.left = randomPos.x + 'px';
        this.gem.style.top = randomPos.y + 'px';
        document.querySelector("#elements").appendChild(this.gem);
        this.element = this.gem; 

    }
    detectColission() {
        //metodo para detectar si el jugador chocó contra la moneda
        let spaceX = this.spaceShip.getPosition().top;
        let spaceY = this.spaceShip.getPosition().left;
        let spaceW = this.spaceShip.getSize().width;
        let spaceH = this.spaceShip.getSize().height;
        let gemX = this.getPosition().top;
        let gemY = this.getPosition().left;
        let gemW = this.getSize().width;
        let gemH = this.getSize().height;

        let rect1 = { x: spaceX, y: spaceY, width: spaceW, height: spaceH }//pasar a objeto
        let rect2 = { x: gemX, y: gemY, width: gemW, height: gemH }//pasar a objeto los elemnts

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
           console.log("colisión de gema detectada");
        }
        // se le pasa el jugador y se le incrementa las monedas

    }
}