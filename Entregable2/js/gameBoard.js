"use strict";
class GameBoard {
    constructor(canvas, ctx, rows, cols) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellImage = new Image();
        this.cellImage.src = "images/board-image.png";
        this.sizeToken = 50;
        this.droppedTokensCount = 0;
        this.boardMatrix = [];
        this.tokenDropZone;
        this.initMatrix();
        this.initBoard();
        this.initDropZone();
    }
    //cargo con vacio la matriz para el tablero donde se colocaran las fichas
    initMatrix() {
        for (let i = 0; i < this.cols; i++) {
            this.boardMatrix[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.boardMatrix[i][j] = null;
            }
        }
    }

    initDropZone() {
        this.tokenDropZone = this.drawDropZone();
    }
    //dibujo la zona habilitada para arrojar las fichas
    drawDropZone() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y - this.sizeToken; //le resto el tamaño de la ficha de drop zone para dibujar una fila antes del tablero
        let tokenDropZone = new TokenDropZone(0, 0, this.ctx, this.cols);
        tokenDropZone.draw();
        return tokenDropZone;
    }
    initBoard() {
        this.cellImage.onload = function () {
            this.drawBoard();
        }.bind(this);
    }
    //calculo el centro para dibujar el tablero
    calculatePosition() {
        return {
            x: (this.canvas.width / 2) - ((this.cols / 2) * this.sizeToken),
            y: (this.canvas.height / 2) - ((this.rows / 2) * this.sizeToken)
        }
    }
    //dibujo el tablero
    drawBoard() {
        let x = this.calculatePosition().x;
        let y = this.calculatePosition().y
        let boardPattern = this.ctx.createPattern(this.cellImage, 'repeat');
        this.ctx.fillStyle = boardPattern;
        this.ctx.fillRect(0, 50, this.cellImage.width * this.cols, this.cellImage.height * this.rows);
    }
    //verifico si la posición de la última figura clickeada coincide con alguna posición de la drop zone
    isInTokenDropZone(lastTokenClicked) {
        if (lastTokenClicked && this.tokenDropZone.isInDropZone(lastTokenClicked)) {//cada ficha sabe si está en la drop zone
            return true;//acomodar ésto a lo nuevo
        } else {
            return false;
        }

    }
    //verifico que hay lugar en la columna de la matriz donde el usuario quiere agregar una ficha recorriendo desde abajo hacia arriba
    addToken(lastTokenClicked) {
        let x = this.tokenDropZone.getPosition().x;
        let y = this.tokenDropZone.getPosition().y + this.sizeToken;

        let radius = this.tokenDropZone.getRadius();
        let i = this.tokenDropZone.getDropZoneIndex(lastTokenClicked);
        x = x + i * this.sizeToken;

        let dropped = false;
        for (let j = this.rows - 1; j >= 0; j--) {
            if (this.boardMatrix[i][j] == null && !dropped) {
                y = y + j * this.sizeToken;
                lastTokenClicked.setPosition(x + radius, y + radius);
                this.boardMatrix[i][j] = lastTokenClicked;  //buscar posicion, hacer fórmula
                dropped = true;
                this.droppedTokensCount += 1;
                lastTokenClicked.setDisableToken();//se deshabilita la ficha jugada
            }
        }
    }

    getDroppedTokensCount() {
        return this.droppedTokensCount;
    }

    isHorizontalWinner(lastTokenClicked, maxTokensToWin) {
        let posJ;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.boardMatrix[i][j] === lastTokenClicked) {
                    posJ = j;
                }
            }
        }
        let countTokens = 1;
        for (let i = 0; i < this.cols - 1; i++) {
            if (this.boardMatrix[i + 1][posJ] && this.boardMatrix[i][posJ] && this.boardMatrix[i][posJ].getColor() == this.boardMatrix[i + 1][posJ].getColor() && countTokens < maxTokensToWin) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 1;
                }
            }
        }
        return countTokens >= maxTokensToWin;
    }

    isVerticalWinner(lastTokenClicked, maxTokensToWin) {
        let posI;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.boardMatrix[i][j] === lastTokenClicked) {
                    posI = i;
                }
            }
        }
        let countTokens = 1;
        for (let j = 0; j < this.rows - 1; j++) {
            if (this.boardMatrix[posI][j + 1] && this.boardMatrix[posI][j] && this.boardMatrix[posI][j].getColor() == this.boardMatrix[posI][j + 1].getColor() && countTokens < maxTokensToWin) {
                countTokens++;
            } else {
                if (countTokens < maxTokensToWin) {
                    countTokens = 1;
                }
            }
        }
        return countTokens >= maxTokensToWin;

    }
    isDiagonalAscWinner(lastTokenClicked, maxTokensToWin) {
        console.log("isDiagonalAscWinner");
        let posI;
        let posJ;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.boardMatrix[i][j] === lastTokenClicked) {
                    posI = i;
                    posJ = j
                    console.log("Ciclo 1 i: " + posI + "j: " + posJ);

                }
            }
        }

        for (let i = posI; i > 0; i--) {
            for (let j = posJ; j < this.rows - 1; j++) {
                if (this.boardMatrix[i][j] && this.boardMatrix[i - 1][j + 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i - 1][j + 1].getColor()) {
                    posI = i - 1;
                    posJ = j + 1;
                    console.log("Ciclo 2 i: " + posI + "j: " + posJ);
                }
            }
        }

        let countTokens = 1;
        console.log(this.boardMatrix);
        for (let i = posI; i < this.cols - 1; i++) {
            for (let j = posJ; j > 0; j--) {
                console.log("Ciclo 3 i: " + posI + "j: " + posJ);
                if (this.boardMatrix[i][j] && this.boardMatrix[i + 1][j - 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i + 1][j - 1].getColor() && countTokens < maxTokensToWin) {
                    console.log("estoy evaluando");
                    countTokens++;
                    console.log("Sumando tokens: " + countTokens);
                } else {
                    if (countTokens < maxTokensToWin) {
                        countTokens = 0;
                    }
                }
            }
        }
        return countTokens >= maxTokensToWin;
    }

    isDiagonalDescWinner(lastTokenClicked, maxTokensToWin) {
        console.log("isDiagonalDescWinner");
        let posI;
        let posJ;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.boardMatrix[i][j] === lastTokenClicked) {
                    posI = i;
                    posJ = j
                    console.log("Ciclo 1 i:" + i + " j:" + j);

                }
            }
        }
        for (let i = posI; i > 0; i--) {
            for (let j = posJ; j > 0; j--) {
                if (this.boardMatrix[i][j] && this.boardMatrix[i - 1][j - 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i - 1][j - 1].getColor()) {
                    posI = i - 1;
                    posJ = j - 1;
                    console.log("Ciclo 2 i:" + i + " j:" + j);
                }
            }
        }

        let countTokens = 1;

        for (let i = posI; i < this.cols - 1; i++) {
            for (let j = posJ; j < this.rows - 1; j++) {
                console.log("Ciclo 3 i:" + posI + " j:" + posJ);
                if (this.boardMatrix[i][j] && this.boardMatrix[i + 1][j + 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i + 1][j + 1].getColor() && countTokens < maxTokensToWin) {
                    console.log("estoy evaluando");
                    countTokens++;
                    console.log("Sumando tokens: " + countTokens);
                } else {
                    if (countTokens < maxTokensToWin) {
                        countTokens = 0;
                    }
                }
            }
        }
        return countTokens >= maxTokensToWin;


        /* for (let i = posI; i < this.cols - 1; i++) {
             for (let j = posJ; j < this.rows - 1; j++) {
                 if (this.boardMatrix[i][j] && this.boardMatrix[i + 1][j + 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i + 1][j + 1].getColor()) {
                     posI = i + 1;
                     posJ = j + 1;
                     console.log("Ciclo 2 i:" + i + " j:" + j);
                 }
             }
         }
 
         let countTokens = 1;
 
         for (let i = posI; i > 0; i--) {
             for (let j = posJ; j > 0; j--) {
                 console.log("Ciclo 3 i:" + posI + " j:" + posJ);
                 if (this.boardMatrix[i][j] && this.boardMatrix[i - 1][j - 1] && this.boardMatrix[i][j].getColor() == this.boardMatrix[i - 1][j - 1].getColor() && countTokens < maxTokensToWin) {
                     console.log("estoy evaluando");
                     countTokens++;
                     console.log("Sumando tokens: " + countTokens);
                 } else {
                     if (countTokens < maxTokensToWin) {
                         countTokens = 0;
                     }
                 }
             }
         }
         return countTokens >= maxTokensToWin;*/
    }
}
