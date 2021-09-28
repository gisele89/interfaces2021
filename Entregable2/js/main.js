"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let boardRow = 3;
    let boardCol = 4;
    let cellImage = new Image();
    cellImage.src = "images/board-image.png";
    ctx.drawImage(cellImage, 10, 10, cellImage.width, cellImage.height);
    let game = new Game(canvas, ctx, boardRow, boardCol);
    game.initGame();

    document.querySelector("#reset").addEventListener('click', function (e) {
        game.initGame;
    });
    //asigno eventos para cambiar el tamaño del tablero 
    document.querySelector("#board-4").addEventListener('click', function (e) {
        game.setBoardRow(3);
        game.setBoardCol(4);
        game.initGame();
    });

    document.querySelector("#board-5").addEventListener('click', function (e) {
        game.setBoardRow(4);
        game.setBoardCol(5);
        game.initGame();
    });
    document.querySelector("#board-6").addEventListener('click', function (e) {
        game.setBoardRow(5);
        game.setBoardCol(6);
        game.initGame();
    });
    document.querySelector("#board-7").addEventListener('click', function (e) {
        game.setBoardRow(6);
        game.setBoardCol(7);
        game.initGame();
    });

    document.querySelector("#canvas").addEventListener('mouseup', function (e) {
        game.onMouseUp();
    });
    document.querySelector("#canvas").addEventListener('mousedown', function (e) {
        game.onMouseDown();
    });
    document.querySelector("#canvas").addEventListener('mousemove', function (e) {
        game.onMouseMove();
    });
})

/*document.querySelector("#play").addEventListener('click', function (e) {
    setInterval(setTimer, 1000);
});
    function setTimer() {
        const d = new Date();
        document.querySelector("#timer").innerHTML = d.toLocaleTimeString();
    }
})
*/