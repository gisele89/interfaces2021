"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let game = new Game();
    

    document.addEventListener('keydown', function (e) {
        console.log("hola");
        if (e.key == 'Enter') {//detecto enter
            //game.doCountdown();
            game.initGame();
            
        }
});

    // window.addEventListener('keydown', function (e) {
    //     console.log("hola");
    //     if(e.key == 'Escape'){
    //         game.initGame();
            
    //     }
    // },true);

   


})
