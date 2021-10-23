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

    let start, previousTimeStamp;

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
            game.detectColission();
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
})
