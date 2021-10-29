class playerSpaceShip {
    constructor(spaceShip) {
        this.coins = 0;
        this.spaceShip = spaceShip;
        this.countCoins = document.querySelector("#count-coin");
        this.crashed = false;
    }
    //reseteo las monedas cuando se reinicia el juego y la posición de la nave
    reset() {
        this.coins = 0;
        this.crashed = false;
        this.spaceShip.style.bottom = '400px';
        this.spaceShip.style.top = '400px';
        this.spaceShip.classList.remove('ground');
        this.spaceShip.style["animation-play-state"] = "running";
    }

    incrementCoins() {
        this.coins += 1;
    }
    incrementCoinsByGem() {
        this.coins += 5;
    }
    incrementLives() {
        this.lives += 1;
    }
    decrementCoins() {
        if (this.coins >= 10) {
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
    //obtengo la posición de la nave
    getPosition() {
        let top = this.spaceShip.getBoundingClientRect().top + window.scrollY;
        let left = this.spaceShip.getBoundingClientRect().left + window.scrollX;
        return {
            top: top,
            left: left
        }
    }
    //obtengo el tamaño de la nave
    getSize() {
        let width = this.spaceShip.offsetWidth;
        let height = this.spaceShip.offsetHeight;
        return {
            width: width,
            height: height
        }
    }

    printCoins() {
        this.countCoins.innerHTML = this.coins;
    }
    stopAnimation() {
        this.spaceShip.style["animation-play-state"] = "paused"
    }
    setCrashed() {
        this.crashed = true;
    }

    isCrashed() {
        return this.crashed;
    }
    
    
}