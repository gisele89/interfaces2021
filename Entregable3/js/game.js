class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.lastTokenClicked = null;
        this.isMouseDown = false;
        this.board = null;
        this.countdown = null;
        this.player = null;
        this.avatarToChange = null;

    }

    initGame() {

    }

    createBackground() {

    }
    createPlayer() {

    }
    createElements() {

    }

    drawBackground() {

    }
    drawPlayer() {

    }

    drawElements() {

    }
    reDraw() {

    }
    onKeyDown(e) {

    }

    isWinner() {

    }

    //se realiza la cuenta atrás de 1 minuto //ver duración de juego
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