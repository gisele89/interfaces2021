"use strict"
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let imageData = ctx.createImageData(width, height);
    let pencil = false;
    let rubber = false;
    let color = "black";
    let lineWidth = 5;


    //agrego los eventos al canvas para dibujar
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mousemove', function (e) {
        drawLine(canvas, e);
    });
    let draw = false;


    function startDraw() {
        draw = true;
    }

    function stopDraw() {
        draw = false;
    }
    //dibujo según se seleccione el lapiz o la goma
    function drawLine(canvas, e) {
        console.log(pencil);
        if (draw && pencil) {
            ctx.beginPath();
            color = document.querySelector("#colorpicker").value;//tomo el valor seleccionado en el color picker
            lineWidth = document.querySelector("#slider").value;//tomo el grosor seleccionado en el slider
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            let position = getPosition(canvas, e);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.closePath();
        } else if (draw && rubber) {
            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            color = 'white';
            lineWidth = document.querySelector("#slider").value;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            let position = getPosition(canvas, e);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.closePath();
        }

    }
    // obtengo coordenadas del mouse 
    function getPosition(canvas, e) {
        let ClientRect = canvas.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - ClientRect.left),
            y: Math.round(e.clientY - ClientRect.top)
        }

    }

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    //enesta función limpio el lienzo, queda en blanco
    function cleanCanvas() {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                setPixel(imageData, 0, 0, 255, 255, 255, 255);
            }

        }
        ctx.putImageData(imageData, 0, 0);
    }

    function invokeLoad() {
        let imgInput = document.querySelector('#imageInput');
        imgInput.click();
    }
    //cargo la imágen seleccionada desde el equipo
    function uploadImage(e) {
        if (e.target.files) {
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function (ev) {
                    let aspectRatio = image.height / image.width;
                    let scaledWidth = width
                    let scaledHeight = width * aspectRatio;
                    ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
                }
            }
        }
    }

function calculateAspectRatio(){
    
}
    // descargo la imágen del canvas
    function downloadImage() {
        let a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'image.png';
        a.click();
    }

    //agrego los eventos 
    document.querySelector("#pencil").addEventListener('click', function () {
        pencil = true;
    });
    document.querySelector("#rubber").addEventListener('click', function () {
        pencil = false;
        rubber = true;
    });
    document.querySelector("#clean").addEventListener('click', cleanCanvas);
    document.querySelector("#upload").addEventListener('click', invokeLoad);
    document.querySelector("#download").addEventListener('click', downloadImage);
    document.querySelector("#imageInput").addEventListener('change', function (e) {
        uploadImage(e);
    });
})
