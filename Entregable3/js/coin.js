class Coin extends Element {
    constructor(spaceShip) {
        super(spaceShip);
        this.coin = null;
    }
     //Creo los elementos en el dom
    generateElement(randomPos) {
        this.coin = document.createElement("div");
        this.coin.setAttribute("class", "coin");
        this.coin.style.left = randomPos.x + 'px';
        this.coin.style.top = randomPos.y + 'px';
        document.querySelector("#elements").appendChild(this.coin);
        this.element = this.coin;        
    }
    detectColission() {
        //metodo para detectar si el jugador chocó contra la moneda
        let spaceX = this.spaceShip.getPosition().left;
        let spaceY = this.spaceShip.getPosition().top;
        let spaceW = this.spaceShip.getSize().width;
        let spaceH = this.spaceShip.getSize().height;

        let coinX = this.getPosition().left;
        let coinY = this.getPosition().top;
        let coinW = this.getSize().width;
        let coinH = this.getSize().height;

        let spaceShipCoor = { x: spaceX, y: spaceY, width: spaceW, height: spaceH }
        let coinCoor = { x: coinX, y: coinY, width: coinW, height: coinH } 

        if (spaceShipCoor.x < coinCoor.x + coinCoor.width && //agregar this
            spaceShipCoor.x + spaceShipCoor.width > coinCoor.x &&
            spaceShipCoor.y < coinCoor.y + coinCoor.height &&
            spaceShipCoor.height + spaceShipCoor.y > coinCoor.y) {
            this.spaceShip.incrementCoins();
            this.spaceShip.printCoins();
            return true;
        }
    }
    reactToColission(){
        this.coin.classList.add('disappear');
    }

}