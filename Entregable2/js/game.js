class Game {
    constructor (ctx, widht, height){

    }
    function initGame(){
        
    }

    function createTokens(){
    
    }

    function createBoard(){
        let board = new GameBoard();
    }
    isWinner(){
        return isHorizontalWinner() || isVerticalWinner() || isDiagonalAscWinner() || isDiagonalDescWinner();
        }
        
        isHorizontalWinner(){//pasarfila
        
        }
        isVerticalWinner(){//pasar columna
        
        }
        isDiagonalAscWinner(){//pasar fila y columna
        
        }
        isDiagonalDescWinner(){//pasar fila y columna
        
        }
}