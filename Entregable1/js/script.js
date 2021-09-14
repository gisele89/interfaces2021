"use strict"
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('#canvas');//se obtiene el canvas
    let ctx = canvas.getContext('2d'); //se crea el contexto
    let width = canvas.width; //seteo el ancho del canvas
    let height = canvas.height;//seteo el alto del canvas
    let originalImage = null;//variable que se usará para no perder la imagen original
    let imageData = ctx.createImageData(width, height);

    //variables usadas para dibujar
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
    //En ésta función se llama a la función que va a dibujar realmente y seteo la variable draw en true que se utiliza para controlar cuando se está dibujando y cuando no
    function startDraw(e) {
        draw = true;
        drawLine(canvas, e);
    }
    //En ésta función cuando se termina de dubujar se setea draw en false
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
            let position = getPosition(canvas, e);//obtengo la posición
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
        } else if (draw && rubber) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            color = 'white';//el valor por defecto pasa a ser blanco
            lineWidth = document.querySelector("#slider").value;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            let position = getPosition(canvas, e);//obtengo la posición
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
        }
    }
    // obtengo coordenadas del mouse del usuario 
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
    //En ésta función obtengo el input donde se carga la imágen y simulo el click
    function invokeLoad() {
        let imgInput = document.querySelector('#imageInput');
        imgInput.click();
    }
    //cargo la imágen seleccionada desde el equipo
    function uploadImage(e) {
        if (e.target.files) {
            let img = e.target.files[0];//el priemr archivo del listado
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {//para asegurarme de que la imagen ya se encuentra cargada
                    let imageSizes = resizeImage(image);//calculo el nuevo ancho y altura adaptado al canvas
                    ctx.drawImage(image, 0, 0, imageSizes.w, imageSizes.h);//dibujo en el contexto del canvas la imagen  con su nuevo tamaño
                    originalImage = ctx.getImageData(0, 0, imageSizes.w, imageSizes.h);//guardo en una variable la imagen antes de que se aplique cualquier efecto
                }
            }
        }
    }
    //En ésta función tomo el ancho y alto de la imágen original y calculo el aspect ratio para hacer el resize adaptado al canvas 
    function resizeImage(image) {
        let imageWidth = image.width
        let imageHeight = image.height
        let aspectW = imageWidth / width;//divido el ancho de la imagen por el ancho del canvas
        let aspectH = imageHeight / height;//divido la altura por la altura del canvas
        if (aspectW > 1 || aspectH > 1) {
            if (aspectW > aspectH) {//es una imágen horizontal
                imageWidth = width;
                imageHeight = (imageHeight / aspectW);
            }
            else {//es una imagen vertical
                imageHeight = height;
                imageWidth = imageWidth / aspectH;
            }
        }
        return { //devuelvo un objeto con la nueva altura y ancho de la imágen 
            w: imageWidth,
            h: imageHeight
        }
    }
    // descargo la imágen del canvas usando dataToUrl para obtener justamente la url que luego la asigno como href de un anchor
    function downloadImage() {
        let a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'image.png';
        a.click();
    }
    //En esta parte agrego los eventos  a los botones 
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
    document.querySelector("#slider-blur").addEventListener('click', blur);
    //Filtros de imágen
    //En ésta función calculo un promedio de los canales r, g y b que luego es asignado nuevamente a cada canal por igual
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

    //En ésta función multiplico los canales r, g y b por cierto valores que luego me ayudaran a obtener la tonalidad deseada, sepia
    function convertToSepia() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let multiplicationSepia = (imageData.data[i] * 0.2 + imageData.data[i + 1] * 0.59 + imageData.data[i + 2] * 0.11)
            imageData.data[i] = multiplicationSepia + 100;
            imageData.data[i + 1] = multiplicationSepia + 50;
            imageData.data[i + 2] = multiplicationSepia;
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    //Convierto cada pixel a formato hsv, agrego brillo y lo vuelvo a convertir a rgb
    function addBrightnees() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let r = imageData.data[i];
            let g = imageData.data[i + 1];
            let b = imageData.data[i + 2];

            let hsv = rgbToHsv(r, g, b);

            if (hsv.v + 0.05 <= 1) {
                hsv.v += 0.05;
            } else {
                hsv.v = 1;
            }

            const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);

            imageData.data[i] = Math.floor(rgb.r);
            imageData.data[i + 1] = Math.floor(rgb.g);
            imageData.data[i + 2] = Math.floor(rgb.b);
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }

    //Convierto cada pixel a formato hsv, agrego saturacion y lo vuelvo a convertir a rgb
    function saturation() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let r = imageData.data[i];
            let g = imageData.data[i + 1];
            let b = imageData.data[i + 2];

            let hsv = rgbToHsv(r, g, b);

            if (hsv.s + 0.05 <= 1) {
                hsv.s += 0.05;
            } else {
                hsv.s = 1;
            }
            const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
            imageData.data[i] = Math.floor(rgb.r);
            imageData.data[i + 1] = Math.floor(rgb.g);
            imageData.data[i + 2] = Math.floor(rgb.b);
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }
    //En ésta función, en cada canal le resto a 255 el valor que tiene en ese momento el canal para obtener el opuesto
    function convertToNegative() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }
    //En ésta función asigno blanco o negro dependiendo de un valor umbral proporcionado por el usuario
    function thresholding(e) {
        let threshold = e.target.value;//el umbral que el usuario eligió
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let avg = (imageData.data[i] * 0.2126 + imageData.data[i + 1] * 0.7152 + imageData.data[i + 2] * 0.0722 >= threshold) ? 255 : 0;
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    }
    //En ésta función utilizando una matriz de referencia, la recorro y voy multiplicando y sumando los valores de esos pixeles cercanos en cada canal . Una vez terminado el recorrido,El resultado de esa suma luego lo asigno en cada canal
    function blur() {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let matReference = 1/25;
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 2; y < imageData.height - 2; y++) {
                let r = 0.0;
                let g = 0.0;
                let b = 0.0;
                for (let i = -2; i <= 2; i++) { 
                for (let j = -2; j <= 2; j++) {                                      
                        let index = getPixelIndex(imageData, x + i, y + j);  
                        r += imageData.data[index + 0] * matReference ;
                        g += imageData.data[index + 1] * matReference;
                        b += imageData.data[index + 2] * matReference;
                    }
                } 
                //console.log("red -> " + r + "green -> " + g + "blue -> " + b);               
                setPixel(imageData, x, y, r , g , b , 255);
            }
        }
        ctx.putImageData(imageData, 0, 0); 
    }
    function getPixelIndex(imageData, x, y) {
        return (x + y * imageData.width) * 4;
    }
    //En ésta función coloco en el contexto del canvas la imagen original que subió el usuario que previamente fue guardada en una variable originalImage
    function restoreOriginalImage() {
        ctx.putImageData(originalImage, 0, 0);
    }

    //Dado un color en formato rgb, se hace una transformacion a formato hsv
    function rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return {
            h: h,
            s: s,
            v: v
        };
    }


    //Dado un color en formato hsv, se realiza una transformacion a formato rgb
    function hsvToRgb(h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }
})
