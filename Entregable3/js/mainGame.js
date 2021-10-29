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
    

    if(document.querySelector("#back-1-button")) {
        document.querySelector("#back-1-button").addEventListener('click', changeBackground1);
    }
    
    if(document.querySelector("#back-2-button")) {
        document.querySelector("#back-2-button").addEventListener('click', changeBackground);
    }
    if(document.querySelector("#start-button")) {
        document.querySelector("#start-button").addEventListener('click', startGame);
    }
    function startGame(){
        document.querySelector("#start-modal").style.display = "none";
        document.querySelector("#midground").style["animation-play-state"] = "running";        
        document.querySelector("#foreground").style["animation-play-state"] = "running";
        game.initGame();
        req = window.requestAnimationFrame(step);
        
    }
   
    function changeBackground(){
        document.querySelector("#background").classList.remove('background');
        document.querySelector("#background").classList.add('background2');
        document.querySelector("#midground").classList.remove('midground');
        document.querySelector("#midground").classList.add('midground2');
        document.querySelector("#foreground").classList.remove('foreground');
        document.querySelector("#foreground").classList.add('foreground2');
    }
    function changeBackground1(){
        document.querySelector("#background").classList.remove('background2');
        document.querySelector("#background").classList.add('background');
        document.querySelector("#midground").classList.remove('midground2');
        document.querySelector("#midground").classList.add('midground');
        document.querySelector("#foreground").classList.remove('foreground2');
        document.querySelector("#foreground").classList.add('foreground');
    }
   
    
})
