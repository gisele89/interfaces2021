document.addEventListener("DOMContentLoaded", function () {
    function esconderNotificaciones(){
        if(document.querySelector(".popup-notificaciones").classList.contains("esconder")){
            document.querySelector(".popup-notificaciones").classList.remove("esconder");
            document.querySelector("#notifications-icon").innerHTML = "notifications_none";
            
        }else{
            document.querySelector(".popup-notificaciones").classList.add("esconder");
            document.querySelector("#notifications-icon").innerHTML = "notifications";
        }
    }
    document.querySelector("#notifications-icon").addEventListener('click', esconderNotificaciones);
});