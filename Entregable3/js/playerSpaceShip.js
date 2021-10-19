class playerSpaceShip {
    constructor() {
        this.avatar = new Image();
        this.avatar.src = "";
        this.coins = 0;
        this.lives = 1;
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
        this.coins -= 1;
    }
    decrementLives() {
        this.lives -= 1;
    }
    getQuantityCoins(){
        return this.coins;
    }
    setLives(){
        this.lives +=1;
    }


}