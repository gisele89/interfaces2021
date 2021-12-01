//import M from './sass/materialize-css';
//const M = require('./js/bin/materialize.js');
//M.AutoInit();

//import {  Parallax } from '../sass/components/materialize-css';
//import '../sass/components/materialize-css/';

//var elems = document.querySelectorAll('.parallax');
//var instances = M.Parallax.init(elems, options);
let img = document.querySelector("#image-gallery");
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#escribir-post").addEventListener('click', activatePopupPublish);
    document.querySelector("#gallery-1").addEventListener('click', activatePopupImage);
    document.querySelector(".close-pop-up").addEventListener('click', deactivatePopupPublish);
    document.querySelector(".close-pop-up-image").addEventListener('click', deactivatePopupImage);
    document.querySelector("#chevron-right").addEventListener('click', changeImageGalleryRight);
    document.querySelector("#chevron-left").addEventListener('click', changeImageGalleryLeft);
    let post = document.querySelector("#publicar-post-modal");
    if (post) {
        post.addEventListener('input', verifyPost);
    }
    function verifyPost() {
        let post = document.querySelector("#publicar-post-modal");
        let bt = document.querySelector('#publicar-btn');
        if (post.value != '') {
            bt.classList.remove('disabled');
        }
    }
    
    function activatePopupPublish() {
        let modal = document.querySelector(".modal-publicar");
        let overlay = document.querySelector("#overlay");
        modal.classList.remove("disable-pop-up");
        modal.classList.add("enable-pop-up");
        overlay.classList.add("overlay");

    }
    function activatePopupImage() {
        let modal = document.querySelector(".modal-photo-row");
        let overlay = document.querySelector("#overlay-dark");
        modal.classList.remove("disable-pop-up");
        modal.classList.add("enable-pop-up");
        overlay.classList.add("overlay-dark");
        enableChevron();
    }

    function deactivatePopupPublish() {
        let modal = document.querySelector(".modal-publicar");
        let overlay = document.querySelector("#overlay");
        modal.classList.remove("enable-pop-up");
        overlay.classList.remove("overlay");
        modal.classList.add("disable-pop-up");

    }
    function deactivatePopupImage() {
        let modal = document.querySelector(".modal-photo-row");
        let overlay = document.querySelector("#overlay-dark");
        modal.classList.remove("enable-pop-up");
        overlay.classList.remove("overlay-dark");
        modal.classList.add("disable-pop-up");
    }
    function changeImageGalleryRight() {
        if (img.src.indexOf('images/gallery3-big.png') != -1) {
            img.src = 'images/gallery2-big.jpg';
        } else if (img.src.indexOf('images/gallery2-big.jpg') != -1) {
            img.src = 'images/gallery1-big.jpg';
        }
        enableChevron();
    }

    function changeImageGalleryLeft() {
        if (img.src.indexOf('images/gallery2-big.jpg') != -1) {
            img.src = 'images/gallery3-big.png';
        } else if (img.src.indexOf('images/gallery1-big.jpg') != -1) {
            img.src = 'images/gallery2-big.jpg';
        }
        enableChevron();
    }

    function enableChevron() {
        let chevronLeft = document.querySelector('#chevron-left');
        let chevronRight = document.querySelector('#chevron-right');

        if (img.src.indexOf('images/gallery3-big.png') != -1) {
            disableChevronElement(chevronLeft);
            enableChevronElement(chevronRight);
        } else if (img.src.indexOf('images/gallery2-big.jpg') != -1) {
            console.log("voy a habilitar left");
            enableChevronElement(chevronLeft);
            enableChevronElement(chevronRight);
        } else if (img.src.indexOf('images/gallery1-big.jpg') != -1) {
            console.log("voy a deshabilitar right");
            disableChevronElement(chevronRight);
            enableChevronElement(chevronLeft);
        }
    }

    function enableChevronElement(chevron) {
        chevron.classList.remove("disable-pop-up");
        chevron.classList.add("enable-pop-up");
    }

    function disableChevronElement(chevron) {
        chevron.classList.remove("enable-pop-up");
        chevron.classList.add("disable-pop-up");
    }


   
})