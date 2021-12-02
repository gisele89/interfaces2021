document.addEventListener("DOMContentLoaded", function () {
    
    
    let yaVoto = false;
    function addLike(){
        let cantidadReacciones = parseInt(document.querySelector(".cant-reacciones").innerText);
        if (!yaVoto){
            cantidadReacciones++;
            yaVoto = true;
        }else{
            cantidadReacciones--;
            yaVoto = false;
        }

        document.querySelector(".cant-reacciones").innerHTML = cantidadReacciones;
    }

    document.querySelector(".emo-like").addEventListener('click', addLike);
    document.querySelector(".emo-dislike").addEventListener('click', addLike);
});