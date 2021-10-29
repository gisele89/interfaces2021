//probado en desktop (1920 x 1080), en Chrome
"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let game = new Game();
    let keyDown = false;
    let keyCode = null;

    console.log("hola");

    window.addEventListener('keydown', function (e) {
        keyDown = true;
        keyCode = e.code;
        console.log(keyCode);
        if (keyCode == 'Enter') {//detecto enter
            //game.doCountdown();
            game.initGame();
            console.log("inicio juego");
        }
    });

    window.addEventListener('keyup', function (e) {
        keyCode = null;
        keyDown = false;
    });

    let start, previousTimeStamp, req;


    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }

        const elapsed = timestamp - start;
        if (previousTimeStamp !== timestamp) {
            if (keyDown && keyCode == 'Space') {
                game.upPlayer();
            } else {
                game.fallPlayer();                
            }

            previousTimeStamp = timestamp;
            if (game.detectColission()) {
                window.cancelAnimationFrame(req);
            }
            if (game.isWinner()) {
                stopGame();
            } else if(game.checkGameOver()) {
                gameOver();
                window.cancelAnimationFrame(req);
            } else {
                req = window.requestAnimationFrame(step);
            }
        }
    }


    if (document.querySelector("#back-1-button")) {
        document.querySelector("#back-1-button").addEventListener('click', changeBackground1);
    }

    if (document.querySelector("#back-2-button")) {
        document.querySelector("#back-2-button").addEventListener('click', changeBackground);
    }
    
    if (document.querySelector("#start-button")) {
        document.querySelector("#start-button").addEventListener('click', startGame);
    }
    
    if (document.querySelector("#restart-button-win")) {
        document.querySelector("#restart-button-win").addEventListener('click', restartGameWin);
    }

    if (document.querySelector("#restart-button-game-over")) {
        document.querySelector("#restart-button-game-over").addEventListener('click', restartGameOver);
    }

    function startGame() {
        document.querySelector("#start-modal").style.display = "none";
        game.initGame();
        startAnimation();
        req = window.requestAnimationFrame(step);
    }

    function restartGameWin() {
        document.querySelector("#start-modal").style.display = "block";
        document.querySelector("#win-modal").style.display = "none";        
    }

    function restartGameOver() {
        document.querySelector("#start-modal").style.display = "block";
        document.querySelector("#game-over-modal").style.display = "none";        
    }

    function stopGame() {
        stopAnimation();
        game.stopAnimationElements();
        game.stopAnimationSpaceShip();
        document.querySelector("#win-modal").style.display = "block";
    }

    function gameOver() {
        stopAnimation();
        game.stopAnimationElements();
        document.querySelector("#game-over-modal").style.display = "block";
    }

    function startAnimation() {
        document.querySelector("#midground").style["animation-play-state"] = "running";
        document.querySelector("#foreground").style["animation-play-state"] = "running";
    }

    function stopAnimation() {
        document.querySelector("#midground").style["animation-play-state"] = "paused";
        document.querySelector("#foreground").style["animation-play-state"] = "paused";        
    }

    function changeBackground() {
        document.querySelector("#background").classList.remove('background');
        document.querySelector("#background").classList.add('background2');
        document.querySelector("#midground").classList.remove('midground');
        document.querySelector("#midground").classList.add('midground2');
        document.querySelector("#foreground").classList.remove('foreground');
        document.querySelector("#foreground").classList.add('foreground2');
    }
    function changeBackground1() {
        document.querySelector("#background").classList.remove('background2');
        document.querySelector("#background").classList.add('background');
        document.querySelector("#midground").classList.remove('midground2');
        document.querySelector("#midground").classList.add('midground');
        document.querySelector("#foreground").classList.remove('foreground2');
        document.querySelector("#foreground").classList.add('foreground');
    }

})
