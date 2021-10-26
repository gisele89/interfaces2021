class playerSpaceShip {
    constructor(spaceShip) {
        this.avatar = new Image();
        this.avatar.src = "";
        this.coins = 0;
        this.lives = 1;
        this.spaceShip = spaceShip;
        this.countCoins = document.querySelector("#count-coin");
    }

    setAvatar(avatar) {
        this.avatar = avatar;
    }
    incrementCoins() {
        this.coins += 1;
    }
    incrementLives() {
        this.lives += 1;
    }
    decrementCoins() {
        if(this.coins>=10){
            this.coins -= 10;
        }   
    }
    decrementLives() {
        this.lives -= 1;
    }
    getQuantityCoins() {
        return this.coins;
    }
    getLives() {
        return this.lives;
    }
    getPosition() {
        let top = this.spaceShip.getBoundingClientRect().top + window.scrollY;
        let left = this.spaceShip.getBoundingClientRect().left + window.scrollX;
        return {
            top: top,
            left: left
        }
    }
    getSize() {
        let width = this.spaceShip.offsetWidth;
        let height = this.spaceShip.offsetWidth;
        return {
            width: width,
            height: height
        }
    }
    printCoins() {
        this.countCoins.innerHTML = this.coins;
    }
}