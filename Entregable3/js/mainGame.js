"use strict";
//document.addEventListener("DOMContentLoaded", function () {
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
        //game.initGame();



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
            console.log("up");
            game.upPlayer();

        } else {
            console.log("fall");
            game.fallPlayer();
        }

        //if (elapsed < 10000) {
        previousTimeStamp = timestamp;
        window.requestAnimationFrame(step);
        // }else{

        //}
    }

}
window.requestAnimationFrame(step);

    // window.addEventListener('keydown', function (e) {
    //     console.log("hola");
    //     if(e.key == 'Escape'){
    //         game.initGame();

    //     }
    // },true);




//})
