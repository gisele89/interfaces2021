let listaChats = document.querySelector(".lateral-chat");
let noticias= document.querySelector(".chat-window");
let comentar = document.querySelectorAll(".comentar");
let mobileRes=1024;

if(window.screen.availWidth<mobileRes){
    console.log("hola");
    noticias.classList.add("disable-pop-up");
    for (let index = 0; index <comentar.length; index++) {
        comentar[index].classList.add("disable-pop-up");   
    }
    
    listaChats.classList.remove("disable-pop-up");
}

document.querySelector("#seleccionado-chat").addEventListener('click', function(e){
    console.log("hola2");
    if(window.screen.availWidth<mobileRes){
        listaChats.classList.add("disable-pop-up");
        for (let index = 0; index <comentar.length; index++) {
            comentar[index].classList.remove("disable-pop-up");  
        }
        noticias.classList.remove("disable-pop-up");
        //comentar.classList.remove("disable-pop-up");
    }
    
});
