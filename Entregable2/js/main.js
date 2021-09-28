"use strict";


document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let boardRow;
    let boardCol;
    let cellImage = new Image();
    cellImage.src = "images/board-image.png";
    ctx.drawImage(cellImage, 10, 10, cellImage.width, cellImage.height);
    let game = new Game(canvas,ctx, width, height,  6, 5);
    game.initGame();
})

 //asigno eventos para cambiar el tamaño del tablero 
/*document.querySelector("#board-4").addEventListener('click',);
document.querySelector("#board-5").addEventListener('click',);
document.querySelector("#board-6").addEventListener('click',);
document.querySelector("#board-7").addEventListener('click',);

canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function onMouseDown(e) {
    isMouseDown = true;
    if (lastFiguredClicked != null) {
        lastFiguredClicked.setResaltado(false);
        lastFiguredClicked = null;
    }
    let clickedFigure = findClickedFigure(e.layerX, e.layerY);
    if (clickedFigure != null) {
        clickedFigure.setResaltado(true);
        lastFiguredClicked = clickedFigure;
    }
    drawFigure();//seria drawtokens
}
function onMouseMove(e) {
    if (isMouseDown && lastFiguredClicked != null) {
        lastFiguredClicked.setPosition(e.layerX, e.layerY);
        drawFigure();
    }
}
function onMouseUp(e) {
    isMouseDown = false;
}

document.querySelector("#play").addEventListener('click', function (e) {
    setInterval(setTimer, 1000);
});
    function setTimer() {
        const d = new Date();
        document.querySelector("#timer").innerHTML = d.toLocaleTimeString();
    }
})
*/