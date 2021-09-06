"use strict"
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let originalImage = null;
    let imageData = ctx.createImageData(width, height);



    let pencil = false;
    let rubber = false;
    let color = "black";
    let lineWidth = 5;
    let draw = false;

    //agrego los eventos al canvas para dibujar
    canvas.addEventListener('mousedown', function (e) {
        startDraw(e)
    });
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mousemove', function (e) {
        drawLine(canvas, e);
    });
    function startDraw(e) {
        draw = true;
        drawLine(canvas, e);
    }

    function stopDraw() {
        draw = false;
        ctx.beginPath();

    }
    //dibujo según se seleccione el lapiz o la goma
    function drawLine(canvas, e) {
        if (draw && pencil) {
            color = document.querySelector("#colorpicker").value;//tomo el valor seleccionado en el color picker
            lineWidth = document.querySelector("#slider").value;//tomo el grosor seleccionado en el slider
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            let position = getPosition(canvas, e);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
        } else if (draw && rubber) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            color = 'white';
            lineWidth = document.querySelector("#slider").value;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            let position = getPosition(canvas, e);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
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
    //En esta función limpio el lienzo, asignando a cada pixel el color blanco
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
                    let aspectRatio = image.height / image.width; //calculo el aspect ratio para no deformar la imágen
                    let scaledWidth = width
                    let scaledHeight = width * aspectRatio;
                    ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
                    originalImage = ctx.getImageData(0, 0, scaledWidth, scaledHeight);
                }
            }
        }
    }
    // descargo la imágen del canvas usando dataToUrl asignandola a un anchor
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
    document.querySelector("#byn").addEventListener('click', convertToBW);
    document.querySelector("#sepia").addEventListener('click', convertToSepia);
    document.querySelector("#brillo").addEventListener('click', addBrightnees);
    document.querySelector("#saturacion").addEventListener('click', saturation);
    document.querySelector("#negativo").addEventListener('click', convertToNegative);
    document.querySelector("#slider-threshold").addEventListener('click', function (e) {
        thresholding(e);
    })
    document.querySelector("#original").addEventListener('click', restoreOriginalImage);



    //filtros de imágen
    //en ésta función calculo un promedio que luego es asignado nuevamente a cada
    function convertToBW() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;

        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function convertToSepia() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            let avg = (imageData.data[i] * 0.2 + imageData.data[i + 1] * 0.59 + imageData.data[i + 2] * 0.11);

            imageData.data[i] = avg + 100;
            imageData.data[i + 1] = avg + 50;
            imageData.data[i + 2] = avg;

        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function addBrightnees() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i++) {
            if (imageData.data[i] + 10 <= 255) {
                imageData.data[i] = imageData.data[i] + 10;
            } else {
                imageData.data[i] = 255
            }

        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function saturation() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const r = parseInt(document.querySelector("#r-saturation-input").value);
        const g = parseInt(document.querySelector("#g-saturation-input").value);
        const b = parseInt(document.querySelector("#b-saturation-input").value);

        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = imageData.data[i] + r;
            imageData.data[i + 1] = imageData.data[i + 1] + g;
            imageData.data[i + 2] = imageData.data[i + 2] + b;
        }

        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function convertToNegative() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {

            imageData.data[i] = 255 - imageData.data[i];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];

        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function thresholding(e) {
        let threshold = e.target.value;
        console.log(threshold);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (originalImage == null) {
            originalImage = imageData;
        } else {
            imageData = originalImage;
        }

        for (let i = 0; i < imageData.data.length; i += 4) {
            let avg = (imageData.data[i] * 0.2126 + imageData.data[i + 1] * 0.7152 + imageData.data[i + 2] * 0.0722 >= threshold) ? 255 : 0;
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    function restoreOriginalImage() {
        ctx.putImageData(originalImage, 0, 0);
    }

})
