document.addEventListener("DOMContentLoaded", function () {
    function loaderRemove(){
        let elementos = document.getElementsByClassName("esconder");
        while (elementos.length > 0){
            elementos[0].classList.remove("esconder");
        }   

        let carga = document.getElementsByClassName("centrar");
        carga[0].classList.add("esconder");
        document.querySelector(".popup-notificaciones").classList.add("esconder");
    }

    setTimeout(loaderRemove,3000);
});