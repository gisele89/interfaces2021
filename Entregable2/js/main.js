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

    //asigno eventos 

    document.querySelector("#play").addEventListener('click', function (e) {
        game.doCountdown();
        game.initGame();
        game.nextTurn();
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

    document.querySelector("#ficha-2").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-roja-2.png';
        game.setImageToChangeRed(img);
        game.initGame();
    });
    document.querySelector("#ficha-3").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-roja-3.png';
        game.setImageToChangeRed(img);
        game.initGame();
    });
    document.querySelector("#ficha-4").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-roja-4.png';
        game.setImageToChangeRed(img);
        game.initGame();
    });
    document.querySelector("#ficha-azul-2").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-azul-2.png';
        game.setImageToChangeBlue(img);
        game.initGame();
    });
    document.querySelector("#ficha-azul-3").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-azul-3.png';
        game.setImageToChangeBlue(img);
        game.initGame();
    });
    document.querySelector("#ficha-azul-4").addEventListener('click', function (e) {
        let img = new Image();
        img.src = 'images/ficha-azul-4.png';
        game.setImageToChangeBlue(img);
        game.initGame();
    });
    document.querySelector("#help").addEventListener('click', function (e){
        document.querySelector("#help-text").innerHTML = "Elegí el tamaño de tablero que te guste. Tené en cuenta que para ganar tendrás que alinear tantas fichas cómo filas tenga tu tablero elegido. Por ejemplo, si elegís el tablero de 6 x 5, precisarás 5 fichas alineadas para ganar. Una vez elegido el tablero, si querés personalizá tu ficha. Cuando estés listo dale a Jugar! Recordá que tenés 1 minuto para resolver el juego"
    })


    //reseteo el timer
    function resetMessageTimer() {
        document.querySelector("#timer").innerHTML = "";
    }
    //deshabilito o habilito los botones según el valor pasado por parámetro
    function disableEnableButtonsBoard(state) {
        document.querySelector("#board-5").disabled = state;
        document.querySelector("#board-6").disabled = state;
        document.querySelector("#board-7").disabled = state;
        document.querySelector("#board-8").disabled = state;
        document.querySelector("#ficha-2").disabled = state;
        document.querySelector("#ficha-3").disabled = state;
        document.querySelector("#ficha-4").disabled = state;
        document.querySelector("#ficha-azul-2").disabled = state;
        document.querySelector("#ficha-azul-3").disabled = state;
        document.querySelector("#ficha-azul-4").disabled = state;
    }


})
