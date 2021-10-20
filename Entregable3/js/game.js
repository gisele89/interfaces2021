class Game {
    constructor() {
        this.player = new playerSpaceShip();
        this.avatarToChange = null;
        this.spaceship = document.querySelector('#spaceShip');
        this.quantiyCoins = 50;


    }

    initGame() {
        this.generateGems();
        this.generateCoins();
        this.generateMeteorites();
        this.generateElectricityBalls();
    }


    createPlayer() {

    }
    createElements() {

    }


    onKeyDown(e) {

    }

    isWinner() {
        //si llega al final sin perder


    }

    //se chequea si junta todas las monedas del nivel entonces se le da una vida
    checkCoins() {
        if (this.player.getQuantityCoins() == this.quantiyCoins) {
            this.player.setLives();
        }
    }

    changePositionUp() {
        let actualPos;
        actualPos = this.spaceship.getBoundingClientRect().top;
        if (actualPos > 0) {
            actualPos -= 5;
            this.spaceship.style.top = actualPos + 'px';
        }

    }

    changePositionFall() {
        let actualPos;
        actualPos = this.spaceship.getBoundingClientRect().top + window.scrollY;        
        console.log("Bajando" +actualPos);
        if (actualPos < 840) {
            actualPos += 5;
            this.spaceship.style.top = actualPos + 'px'
        }
    }

    fallPlayer() {
        this.spaceship.classList.add('static-fall');
        this.spaceship.classList.remove('up');
        this.changePositionFall();
        console.log("Caída hecha");
        //dejar caer
    }

    upPlayer() {
        this.spaceship.classList.remove('static-fall');
        this.spaceship.classList.add('up');
        this.changePositionUp();
        console.log("Subida hecha");
        //hacer subir
    }

    generateGems() {
        let max = 3;
        let quantiyGems = Math.floor(Math.random() * max);
        for (let index = 0; index < quantiyGems; index++) {
            let gem;
            gem = document.createElement("div");
            gem.setAttribute("class", "gem");
            let randomPos = this.generateRandomPosition();
            gem.style.left = randomPos.x + 'px';
            gem.style.top = randomPos.y + 'px';
            document.querySelector("#elements").appendChild(gem);
        }
    }

    generateCoins() {
        for (let index = 0; index < this.quantiyCoins; index++) {
            let coin;
            coin = document.createElement("div");
            coin.setAttribute("class", "coin");
            let randomPos = this.generateRandomPosition();
            coin.style.left = randomPos.x + 'px';
            coin.style.top = randomPos.y + 'px';
            document.querySelector("#elements").appendChild(coin);
        }
    }

    generateMeteorites() {
        let max = 50;
        let min = 10;
        let quantiyMeteorites = Math.floor(Math.random() * (max - min)) + min;
        for (let index = 0; index < quantiyMeteorites; index++) {
            let meteorite;
            meteorite = document.createElement("div");
            meteorite.setAttribute("class", "meteorite");
            let randomPos = this.generateRandomPosition();
            meteorite.style.left = randomPos.x + 'px';
            meteorite.style.top = randomPos.y + 'px';
            document.querySelector("#elements").appendChild(meteorite);
        }

    }
    generateElectricityBalls() {
        let quantiyBalls = 10;
        for (let index = 0; index < quantiyBalls; index++) {
            let ball;
            ball = document.createElement("div");
            ball.setAttribute("class", "ball");
            let randomPos = this.generateRandomPosition();
            ball.style.left = randomPos.x + 'px';
            ball.style.top = randomPos.y + 'px';
            document.querySelector("#elements").appendChild(ball);
        }

    }

    generateRandomPosition() {
        let maxX = 7500;
        let minX = 1500;
        let maxY = 900;
        let minY = 100;
        let posX = Math.floor(Math.random() * (maxX - minX)) + minX;
        let posY = Math.floor(Math.random() * (maxY - minY)) + minY;
        return {
            x: posX,
            y: posY
        }
    }

    detectCollissionWithGem() {

    }
    detectCollissionWithMeteorite() {

    }
    detectCollissionWithBall() {

    }

    detectCollissionWithCoin() {

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
            document.querySelector("#timer-title").innerHTML = "Te quedan:";
            document.querySelector("#timer").innerHTML = "0" + minutes + ": " + ("0" + seconds).slice(-2);
            if (distance < 0) {
                clearInterval(this.countdown);//reseteo
                document.querySelector("#timer").innerHTML = "¡Se acabó el tiempo!";
                this.disableTokens();
            }
        }.bind(this), 1000);
    }
    //reseteo del timer
    clearCountdown() {
        clearInterval(this.countdown);
    }




}