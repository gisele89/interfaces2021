let oldValue = 0
    let newValue = 0
    let oldValueButton=1545;
    let newValueButton=0;
    window.addEventListener('scroll', (e) => {
        let content = document.querySelector(".section-1-content");
        let btn = document.querySelector(".btn-floating");
        newValue = window.pageYOffset;
        newValueButton = window.scrollY;
        if (oldValue < newValue) {
            content.classList.remove("appear-animation");
            content.classList.add("dissapear-animation");
            console.log("Up");
           
        } else if (oldValue > newValue) {
            content.classList.remove("dissapear-animation");
            content.classList.add("appear-animation");
            console.log("Down");
            
        }
        oldValue = newValue;
       /* if(oldValueButton < newValueButton){
            btn.classList.add("disable-pop-up");
        } else if (oldValueButton > newValueButton) {
            content.classList.remove("disable-pop-up");    
        }*/
        oldValueButton = newValueButton;
    });