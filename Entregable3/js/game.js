class Game {
    constructor() {
        this.spaceship = document.querySelector('#spaceShip');//pasar a objeto
        this.playerSpaceShip = new playerSpaceShip(this.spaceship);
        this.avatarToChange = null;
        this.quantityCoins = 40;
        this.elements = [];
        this.winnerCoins = 20; 


    }
    //inicio el juego mediante la creación de elemntos y reseteo en caso de que ya se venga jugando previamente
    initGame() {
        for (let index = 0; index < this.elements.length; index++) {
            this.elements[index].removeElement();
        }
        this.elements = [];
        this.playerSpaceShip.reset();
        this.createElements();
        //this.doCountdown();

    }

    //genero dinámicamente los elementos
    createElements() {
        this.generateGems();
        this.generateCoins();
        this.generateMeteorites();
        this.generateElectricityBalls();
    }
    //detengo la animación de los elementos
    stopAnimationElements() {
        for (let index = 0; index < this.elements.length; index++) {
            this.elements[index].stopAnimation();
        }
    }
    //detengo la animación de la nave
    stopAnimationSpaceShip() {
        this.playerSpaceShip.stopAnimation();
    }

    //se chequea si junta todas las monedas del nivel entonces se le da una vida
    checkCoins() {
        if (this.playerSpaceShip.getQuantityCoins() == this.quantityCoins) {
            this.playerSpaceShip.setLives();
        }
    }
    //Ajusto la posición cuando se presiona la barra espaciadora
    changePositionUp() {
        let actualPos;
        actualPos = this.spaceship.getBoundingClientRect().top;
        if (actualPos > 100) {
            actualPos -= 5;
            this.spaceship.style.top = actualPos + 'px';
        }
    }
    //Ajusto la posición cuando se suelta la barra espaciadora
    changePositionFall() {
        let actualPos;
        actualPos = this.spaceship.getBoundingClientRect().top;
        if (actualPos <= 840) {
            actualPos += 5;
            this.spaceship.style.top = actualPos + 'px'
        }
    }
    //seteo la animación de caíada
    fallPlayer() {
        this.spaceship.classList.add('static-fall');
        this.spaceship.classList.remove('up');
        this.changePositionFall();
    }
    //seteo la animación de subida
    upPlayer() {
        this.spaceship.classList.remove('static-fall');
        this.spaceship.classList.add('up');
        this.changePositionUp();
    }
    //genero las bolas mediante su objeto correspondiente y una cantidad determinada de manera random según un máximo fijo
    generateGems() {
        let max = 5;
        let quantiyGems = Math.floor(Math.random() * max);
        for (let index = 0; index < quantiyGems; index++) {
            let gem = new Gem(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            gem.generateElement(randomPos);
            this.elements.push(gem);
        }
    }
    //genero las monedas mediante su objeto correspondiente y una cantidad determinada
    generateCoins() {
        for (let index = 0; index < this.quantityCoins; index++) {
            let coin = new Coin(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            coin.generateElement(randomPos);
            this.elements.push(coin);
        }
    }
    //genero los meteoritos mediante su objeto correspondiente y una cantidad establecidad random entr eun mínimo y un máximo
    generateMeteorites() {
        let max = 15;
        let min = 5;
        let quantiyMeteorites = Math.floor(Math.random() * (max - min)) + min;
        for (let index = 0; index < quantiyMeteorites; index++) {
            let meteorite = new Meteorite(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            meteorite.generateElement(randomPos);
            this.elements.push(meteorite);
        }

    }
    //genero las bolas mediante su objeto correspondiente y una cantidad determinada
    generateElectricityBalls() {
        let quantiyBalls = 10;
        for (let index = 0; index < quantiyBalls; index++) {
            let ball = new ElectricityBall(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            ball.generateElement(randomPos);
            this.elements.push(ball);
        }

    }
    //genero una posición random donde ubicar los elementos en pantalla
    generateRandomPosition() {
        let maxX = 7500;
        let minX = 1900;
        let maxY = 700;
        let minY = 150;
        let posX = Math.floor(Math.random() * (maxX - minX)) + minX;
        let posY = Math.floor(Math.random() * (maxY - minY)) + minY;
        return {
            x: posX,
            y: posY
        }
    }
    //detecto si se chocó contra algún elemento y sí es así se produce la reacción correspondiente y se elimina del arreglo de elemntos
    detectColission() {
        for (let index = 0; index < this.elements.length; index++) {
            if (this.elements[index].detectColission()) {
                this.elements[index].reactToColission();
                this.elements.splice(index, 1);
                return true;
            }
        }
        return false;
    }


    // //se realiza la cuenta atrás de 1:30 minuto //ver duración de juego
    // doCountdown() {
    //     let countDownDate = new Date();
    //     countDownDate = countDownDate.getTime() + 61000;//obtengo la fecha actual y le sumo 1 minuto

    //     this.countdown = setInterval(function () {
    //         let now = new Date().getTime();//fecha actual
    //         let distance = countDownDate - now;

    //         let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //         let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //         // document.querySelector("#timer-title").innerHTML = "Te quedan:";
    //         document.querySelector("#count").innerHTML = "0" + minutes + ": " + ("0" + seconds).slice(-2);
    //         if (distance < 0) {
    //             clearInterval(this.countdown);//reseteo
    //             // document.querySelector("#timer").innerHTML = "¡Se acabó el tiempo!";
    //         }
    //     }.bind(this), 1000);
    // }
    // //reseteo del timer
    // clearCountdown() {
    //     clearInterval(this.countdown);
    // }

    //chequeo si ganó el jugador
    checkGameOver() {
        return this.gameOver();
    }
    //el jugador gana cuando junta las monedas
    isWinner() {
        
        return this.playerSpaceShip.getQuantityCoins() >= this.winnerCoins;
    }

    //determino sí el jugador perdió de acuerdo a la posición, es decir cuando toca el piso o cuando choca con un meteorito
    gameOver() {
        let gameWindow = document.querySelector('#game');
        if (this.playerSpaceShip.getPosition().top + this.playerSpaceShip.getSize().height == gameWindow.offsetHeight) {//se termina el juego cuando se toca el piso
            console.log("tocando piso");
            this.startGameOverAnimation();
            return true;
        } else {
            if (this.playerSpaceShip.isCrashed()) {
                this.startGameOverAnimation();
                return true;
            }

        }
    }

    startGameOverAnimation() {
        this.spaceship.classList.remove('static-fall');
        this.spaceship.classList.add('ground');
    }
    showHighScore(){
        document.querySelector("#count-score").innerHTML =  this.playerSpaceShip.getQuantityCoins();  
        document.querySelector("#count-score-game-over").innerHTML =  this.playerSpaceShip.getQuantityCoins(); 
    }

}
