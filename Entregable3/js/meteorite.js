class Meteorite extends Element{
    constructor(spaceShip){
        super(spaceShip);
        this.meteorite = null;
    }
    //Creo los elementos en el dom
    generateElement(randomPos) {
        this.meteorite = document.createElement("div");
        this.meteorite.setAttribute("class", "meteorite");
        this.meteorite.style.left = randomPos.x + 'px';
        this.meteorite.style.top = randomPos.y + 'px';
        document.querySelector("#elements").appendChild(this.meteorite);
        this.element = this.meteorite; 
        console.log("meteoriteagregada");
    }
    detectColission() {        
        //metodo para detectar si el jugador chocó contra la moneda
        let spaceX = this.spaceShip.getPosition().left;
        let spaceY = this.spaceShip.getPosition().top;
        let spaceW = this.spaceShip.getSize().width;
        let spaceH = this.spaceShip.getSize().height;
        let meteoriteX = this.getPosition().left;
        let meteoriteY = this.getPosition().top;
        let meteoriteW = this.getSize().width;
        let meteoriteH = this.getSize().height;

        let rect1 = { x: spaceX, y: spaceY, width: spaceW, height: spaceH }//pasar a objeto
        let rect2 = { x: meteoriteX, y: meteoriteY, width: meteoriteW, height: meteoriteH }//pasar a objeto los elemnts

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            console.log("colisión de meteorito detectada");
            return true;
        }
        return false;
        // se le pasa el jugador y se le incrementa las monedas

    }
    reactToColission(){
        this.spaceShip.setCrashed();
        this.meteorite.classList.add('disappear');  
    }
    
}