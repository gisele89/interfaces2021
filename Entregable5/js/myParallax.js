let oldValue = 0
    let newValue = 0
    console.log("estoy acá");
    window.addEventListener('scroll', (e) => {
        console.log("estoy acá");
        let content = document.querySelector(".section-1-content");
        newValue = window.pageYOffset;
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
    });