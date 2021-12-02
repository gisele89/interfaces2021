let oldValue = 0
    let newValue = 0
    let oldValueButton=1100;
    let newValueButton=0;
    window.addEventListener('scroll', (e) => {
        let content = document.querySelector(".section-1-content");
        let btn = document.querySelector(".btn-floating-container");
        newValue = window.pageYOffset;
        newValueButton = window.scrollY;
        console.log(newValueButton);
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
        if(oldValueButton < newValueButton){
            btn.classList.add("disable-pop-up");
        } else if (oldValueButton > newValueButton) {
            btn.classList.remove("disable-pop-up");    
        }
        /*oldValueButton = newValueButton;*/
    });