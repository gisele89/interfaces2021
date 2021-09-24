"use strict";


document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    let game = new Game(ctx, width, height);
    game.initGame();


    document.querySelector("#play").addEventListener('click', function (e) {
        setInterval(setTimer, 1000);
    });

    function setTimer() {
        const d = new Date();
        document.querySelector("#timer").innerHTML = d.toLocaleTimeString();
    }
})