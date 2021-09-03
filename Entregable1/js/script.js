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
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
    }

    function stopDraw() {
        draw = false;
    }
    //dibujo según se seleccione el lapiz o la goma
    function drawLine(canvas, e) {
        console.log(pencil);
        if (draw &&pencil) {
            color = document.querySelector("#colorpicker").value;
            lineWidth = document.querySelector("#slider").value;
            ctx.lineJoin = 'round';
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            let position = getPosition(canvas, e);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.closePath();
        } else if (draw &&rubber) {
            ctx.lineJoin = 'round';
            color = '#white';
            lineWidth = 10;
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
    //agrego los eventos al lápiz y a la goma para identificar cual se está usando
    document.querySelector("#pencil").addEventListener('click', function () {
        pencil = true;
        rubber= false;
    })
    document.querySelector("#rubber").addEventListener('click', function () {
        pencil = false;
        rubber = true;
    })


    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

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

    function uploadImage(e){
        if (e.target.files) {
            let img = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function (ev) {
                    ctx.drawImage(image, 0, 0);
                }
            }
        }
    }

        function downloadImage() {
            canvas.toDataURL();//con ésta función descargo la imágen
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
