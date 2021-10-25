class ElectricityBall extends Element{
    constructor(spaceShip){
        super(spaceShip);
        this.ball = null;
    }
    generateElement(randomPos) {
        this.ball = document.createElement("div");
        this.ball.setAttribute("class", "ball");
        this.ball.style.left = randomPos.x + 'px';
        this.ball.style.top = randomPos.y + 'px';
        document.querySelector("#elements").appendChild(this.ball);
        this.element = this.ball; 
        console.log("ballagregada");
    }
    detectColission() {
        //metodo para detectar si el jugador chocó contra la moneda
       let spaceX = this.spaceShip.getPosition().top;
       let spaceY = this.spaceShip.getPosition().left;
       let spaceW = this.spaceShip.getSize().width;
        let spaceH = this.spaceShip.getSize().height;
        let ballX = this.getPosition().top;
       let  ballY = this.getPosition().left;
       let  ballW = this.getSize().width;
       let ballH = this.getSize().height;

        let spaceShipCoor = { x: spaceX, y: spaceY, width: spaceW, height: spaceH }//pasar a objeto
        let ball = { x: ballX, y: ballY, width: ballW, height: ballH }//pasar a objeto los elemnts

        if (spaceShipCoor.x < ball.x + ball.width && //agregar this
            spaceShipCoor.x + spaceShipCoor.width > ball.x &&
            spaceShipCoor.y < ball.y + ball.height &&
            spaceShipCoor.height + spaceShipCoor.y > ball.y) {
            console.log("colisión de bola detectada");
        }
        // se le pasa el jugador y se le incrementa las monedas

    }
    reactToColission(){
        
    }

    
}