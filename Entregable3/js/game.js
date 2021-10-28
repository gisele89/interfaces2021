class Game {
    constructor() {
        this.spaceship = document.querySelector('#spaceShip');//pasar a objeto
        this.playerSpaceShip = new playerSpaceShip(this.spaceship);
        this.avatarToChange = null;
        this.quantityCoins = 40;
        this.elements = [];


    }

    initGame() {
        this.createElements();
        //this.doCountdown();

    }

    //genero dinámicamente los elementos
    createElements() {
        //this.generateGems();
        this.generateCoins();
        //this.generateMeteorites();
        this.generateElectricityBalls();
    }


    onKeyDown(e) {

    }

    isWinner() {
        //si llega al final sin perder


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

    generateGems() {
        let max = 3;
        let quantiyGems = Math.floor(Math.random() * max);
        for (let index = 0; index < quantiyGems; index++) {
            let gem = new Gem(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            gem.generateElement(randomPos);
            this.elements.push(gem);
        }
    }

    generateCoins() {
        for (let index = 0; index < this.quantityCoins; index++) {
            let coin = new Coin(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            coin.generateElement(randomPos);
            this.elements.push(coin);
        }
    }

    generateMeteorites() {
        let max = 20;
        let min = 10;
        let quantiyMeteorites = Math.floor(Math.random() * (max - min)) + min;
        for (let index = 0; index < quantiyMeteorites; index++) {
            let meteorite = new Meteorite(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            meteorite.generateElement(randomPos);
            this.elements.push(meteorite);
        }

    }
    generateElectricityBalls() {
        let quantiyBalls = 10;
        for (let index = 0; index < quantiyBalls; index++) {
            let ball = new ElectricityBall(this.playerSpaceShip);
            let randomPos = this.generateRandomPosition();
            ball.generateElement(randomPos);
            this.elements.push(ball);
        }

    }

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

    detectColission() {//está función estaría en la clase elements y por herencia la tienen los demás objetos y recibe como parametro la nave con su posición en ese momento
        for (let index = 0; index < this.elements.length; index++) {
            if (this.elements[index].detectColission()) {
                this.elements[index].reactToColission();
                this.elements.splice(index, 1);
                return true;
            }
        }
        return false;
    }


    //se realiza la cuenta atrás de 1:30 minuto //ver duración de juego
    doCountdown() {
        let countDownDate = new Date();
        countDownDate = countDownDate.getTime() + 61000;//obtengo la fecha actual y le sumo 1 minuto

        this.countdown = setInterval(function () {
            let now = new Date().getTime();//fecha actual
            let distance = countDownDate - now;

            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // document.querySelector("#timer-title").innerHTML = "Te quedan:";
            document.querySelector("#count").innerHTML = "0" + minutes + ": " + ("0" + seconds).slice(-2);
            if (distance < 0) {
                clearInterval(this.countdown);//reseteo
                // document.querySelector("#timer").innerHTML = "¡Se acabó el tiempo!";
            }
        }.bind(this), 1000);
    }
    //reseteo del timer
    clearCountdown() {
        clearInterval(this.countdown);
    }
    checkGameOver() {
        if (this.gameOver()) {
            console.log("Game over");
        }
    }

    gameOver() {
        let gameWindow = document.querySelector('#game');
        if (this.playerSpaceShip.getPosition().top + this.playerSpaceShip.getSize().height == gameWindow.offsetHeight) {//se termina el juego cuando se toca el piso
            console.log("tocando piso");
            this.spaceship.classList.remove('static-fall');
            this.spaceship.classList.add('ground');
            return true;
            // }else if(){

            //   }
        }
    }
   
}
