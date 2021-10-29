class ElectricityBall extends Element{
    constructor(spaceShip){
        super(spaceShip);
        this.ball = null;
    }
    //Creo los elementos en el dom
    generateElement(randomPos) {
        this.ball = document.createElement("div");
        this.ball.setAttribute("class", "ball");
        this.ball.style.left = randomPos.x + 'px';
        this.ball.style.top = randomPos.y + 'px';
        document.querySelector("#elements").appendChild(this.ball);
        this.element = this.ball; 
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

        let spaceShipCoor = { x: spaceX, y: spaceY, width: spaceW, height: spaceH }
        let ball = { x: ballX, y: ballY, width: ballW, height: ballH }

        if (spaceShipCoor.x < ball.x + ball.width && 
            spaceShipCoor.x + spaceShipCoor.width > ball.x &&
            spaceShipCoor.y < ball.y + ball.height &&
            spaceShipCoor.height + spaceShipCoor.y > ball.y) {
            this.spaceShip.decrementCoins();
            this.spaceShip.printCoins();
            return true;
        }
        return false;
    }
    reactToColission(){
        this.ball.classList.add('shake');
    }

    
}