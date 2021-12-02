let profileLateral = document.querySelector(".lateral");
let mobileRes=1024;
if(window.screen.availWidth<mobileRes){
    profileLateral.classList.add("disable-pop-up");
   // profileLateral.classList.remove("disable-pop-up");
}