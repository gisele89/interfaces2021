//import M from './sass/materialize-css';
//const M = require('./js/bin/materialize.js');
//M.AutoInit();

//import {  Parallax } from '../sass/components/materialize-css';
//import '../sass/components/materialize-css/';

//var elems = document.querySelectorAll('.parallax');
//var instances = M.Parallax.init(elems, options);
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#escribir-post").addEventListener('click', activatePopupPublish);
    document.querySelector("#gallery-1").addEventListener('click', activatePopupImage);
    document.querySelector(".close-pop-up").addEventListener('click', deactivatePopupPublish);
    document.querySelector(".close-pop-up-image").addEventListener('click', deactivatePopupImage);
    document.querySelector("#chevron-right").addEventListener('click', changeImageGalleryRight);
    document.querySelector("#chevron-left").addEventListener('click', changeImageGalleryLeft);

    const icon = document.querySelector('.eye-icon');
    let passLogin = document.querySelector("#password");
    let passRegistro = document.querySelector("#password-registro");
    let post = document.querySelector("#publicar-post-modal");
    let img = document.querySelector("#image-gallery");

    if (passRegistro) {
        passRegistro.addEventListener('input', verifyInputsRegistro);
    }

    if (passLogin) {
        passLogin.addEventListener('input', verifyInputsLogin);
    }

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

    function verifyInputsLogin() {
        let pass = document.querySelector("#password");
        let email = document.querySelector("#email");
        let bt = document.getElementById('inicio-btn');
        if ((pass.value != '') && (email.value != '')) {
            bt.classList.remove('disabled');
            icon.classList.remove('disabled-icon');
        }
    }

    function verifyInputsRegistro() {
        let nombre = document.querySelector("#nombre");
        let apellido = document.querySelector("#apellido");
        let pass = document.querySelector("#password-registro");
        let email = document.querySelector("#email-registro");
        let bt = document.getElementById('registro-btn');

        if ((pass.value != '') && (email.value != '') && (nombre.value != '') && (apellido.value != '')) {
            bt.classList.remove('disabled');
            icon.classList.remove('disabled-icon');
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
        } else if(img.src.indexOf('images/gallery1-big.jpg') != -1){
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


    icon.addEventListener('click', (event) => {
        event.preventDefault();
        if (typeof passLogin === 'undefined' || passLogin === null) {
            const type = (passRegistro.getAttribute('type') === 'text') ? 'password' : 'text';
            passRegistro.setAttribute('type', type);
            if (icon.innerText == 'visibility_off') {
                icon.textContent = 'visibility';
            } else {
                icon.textContent = 'visibility_off';
            }
        } else {
            const type = (passLogin.getAttribute('type') === 'text') ? 'password' : 'text';
            passLogin.setAttribute('type', type);
            if (icon.innerText == 'visibility_off') {
                icon.textContent = 'visibility';
            } else {
                icon.textContent = 'visibility_off';
            }
        }
    });
    document.querySelector("#notifications-icon").addEventListener('click', function(){
        console.log("entra");
        if(document.querySelector(".popup-notificaciones").classList.contains("esconder")){
            document.querySelector(".popup-notificaciones").classList.remove("esconder");
            document.querySelector("#notifications-icon").innerHTML = "notifications";
        }else{
            document.querySelector(".popup-notificaciones").classList.add("esconder");
            document.querySelector("#notifications-icon").innerHTML = "notifications_none";
        }
    });
})