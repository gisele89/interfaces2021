class Element {
    constructor(spaceShip) {
        this.spaceShip = spaceShip;
        this.element = null;
    }
    generateElement() {

    }

    detectColission() {
    
    }

    getPosition() {
        let top = this.element.getBoundingClientRect().top +window.scrollY; 
        let left = this.element.getBoundingClientRect().left +window.scrollX;
        return {
            top: top,
            left: left
        }
    }
    getSize() {
        let width = this.element.offsetWidth;
        let height = this.element.offsetHeight;
        return {
            width: width,
            height: height
        }
    }
    reactToColission(){

    }
}