"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let boardRow = 4;
    let boardCol = 5;
    let cellImage = new Image();
    cellImage.src = "images/board-image.png";
    ctx.drawImage(cellImage, 10, 10, cellImage.width, cellImage.height);
    let game = new Game(canvas, ctx, boardRow, boardCol);

    document.querySelector("#play").addEventListener('click', function (e) {
        game.doCountdown();
        game.initGame();
        game.enableTokens();
        disableEnableButtonsBoard(true);
    });

    document.querySelector("#reset").addEventListener('click', function (e) {
        game.initGame();
        game.resetMessage();
        resetMessageTimer();
        disableEnableButtonsBoard(false);
        game.clearCountdown();
    });
    //asigno eventos para cambiar el tamaño del tablero 

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

    document.querySelector("#board-8").addEventListener('click', function (e) {
        game.setBoardRow(7);
        game.setBoardCol(8);
        game.initGame();
    });

    document.querySelector("#canvas").addEventListener('mouseup', function (e) {
        game.onMouseUp(e);
    });
    document.querySelector("#canvas").addEventListener('mousedown', function (e) {
        game.onMouseDown(e);
    });
    document.querySelector("#canvas").addEventListener('mousemove', function (e) {
        game.onMouseMove(e);
    });

    function resetMessageTimer() {
        document.querySelector("#timer").innerHTML = "";
    }
    //deshabilito o habilito los botones según el valor pasado por parámetro
    function disableEnableButtonsBoard(state) {
        document.querySelector("#board-5").disabled = state;
        document.querySelector("#board-6").disabled = state;
        document.querySelector("#board-7").disabled = state;
        document.querySelector("#board-8").disabled = state;
    }


})
