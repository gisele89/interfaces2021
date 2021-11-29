//import M from './sass/materialize-css';
//const M = require('./js/bin/materialize.js');
//M.AutoInit();

//import {  Parallax } from '../sass/components/materialize-css';
//import '../sass/components/materialize-css/';

//var elems = document.querySelectorAll('.parallax');
//var instances = M.Parallax.init(elems, options);

document.querySelector("#escribir-post").addEventListener('click', activatePopupPublish);
document.querySelector(".close-pop-up").addEventListener('click', deactivatePopupPublish);

const icon = document.querySelector('.eye-icon');
let passLogin = document.querySelector("#password");
let passRegistro = document.querySelector("#password-registro");
if (typeof passLogin === 'undefined' || passLogin === null) {
    passRegistro.addEventListener('input', verifyInputsRegistro);
} else {
    passLogin.addEventListener('input', verifyInputsLogin);
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
function deactivatePopupPublish() {
    let modal = document.querySelector(".modal-publicar");
    let overlay = document.querySelector("#overlay");
    modal.classList.remove("enable-pop-up");
    overlay.classList.remove("overlay");
    modal.classList.add("disable-pop-up");

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