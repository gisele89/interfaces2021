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
                game.checkGameOver();
            }
            
            previousTimeStamp = timestamp;
            if(game.detectColission()){
                window.cancelAnimationFrame(req);
            }
            
            req = window.requestAnimationFrame(step);
        }
       
        
    }
    req = window.requestAnimationFrame(step);

    document.querySelector("#back-2").addEventListener('click', changeBackground);
    document.querySelector("#back-3").addEventListener('click', changeBackground2);

    function changeBackground(){
        document.querySelector("#midground-image").src = "../images/midground2.png";
        document.querySelector("#foreground-image").src = "../images/foreground2.png";
    }
    function changeBackground2(){
        document.querySelector("#midground-image").src = "../images/midground3.png";
        document.querySelector("#foreground-image").src = "../images/foreground3.png";
    }
    
})
