"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    //ctx.drawImage(cellImage, 10, 10, cellImage.width, cellImage.height);
    let game = new Game(canvas, ctx);

    document.querySelector("#canvas").addEventListener('keydown', function (e) {
        if (e.keyCode == '32') {//detecto la barra espaciadora
            game.doCountdown();
            game.initGame();
        }
    });


})
