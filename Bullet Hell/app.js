const player = document.querySelector(".player")
const enemy = document.querySelector(".enemy")
const gameDisplay = document.querySelector(".game-container")
const start = document.querySelector(".start")


let playerLeft = 267
let playerBottom = 240
let enemyLife = 500
let playerLife = 5


function startGame() { 

    clearInterval(enemyBulletRandom)

    enemyLife = 500
    enemy.innerHTML = enemyLife

    playerLeft = 267
    playerBottom = 240
    playerLife = 5
    player.innerHTML = playerLife
    player.style.left = 267 + "px"
    player.style.bottom = 240 +"px"
    playerMove()
}
startGame()
const eBR = setInterval(enemyBulletRandom, 200)
circlePattern()

//controls direction and shooting
    //directions + shooting
function playerMove() {
    document.addEventListener("keydown", e => {
        //shooting
        if (e.keyCode === 32) {
            createPlayerBullet()
        }
        //directions
        if (e.keyCode === 38 && playerBottom < 720) { //up
            playerBottom += 3
            player.style.bottom = playerBottom + "px"
        } else if (e.keyCode === 40 && playerBottom > 170) { //down
            playerBottom -= 3
            player.style.bottom = playerBottom + "px"
        } else if (e.keyCode === 37 && playerLeft > 11) { //left
            playerLeft -= 4
            player.style.left = playerLeft + "px"
        } else if (e.keyCode === 39 && playerLeft < 542) { //right
            playerLeft += 3
            player.style.left = playerLeft + "px"
        }
    })
}  

//player bullets
function createPlayerBullet() {
    const playerBullet = document.createElement("div")
    
    let playerBulletBottom = playerBottom + 20
    let playerBulletLeft = playerLeft + 3
    let playerBulletRight = playerLeft + 43

    gameDisplay.appendChild(playerBullet)
    playerBullet.classList.add("player-bullet")

    playerBullet.style.left = playerLeft + 3 + "px"
    playerBullet.style.bottom = playerBulletBottom + "px"
    
    const enemyTop = 120
    const enemyBottom = 758
    const gap = 400

    function movePlayerBullet() {
        playerBulletBottom += 2
        playerBullet.style.bottom = playerBulletBottom + "px"
        

        
        //enemy life loss
        if (playerBulletBottom === enemyBottom && 
            playerBulletLeft > 255 && 
            playerBulletRight < 336) {
                gameDisplay.removeChild(playerBullet)
                enemyLife -= 5
                enemy.innerHTML = enemyLife
                gameWin()
            } else if (playerBulletBottom === 910)
                playerBullet.classList.remove("player-bullet")
                //gameDisplay.removeChild(playerBullet)
    }
    setInterval(movePlayerBullet, 20)
}

//enemy bullets random
function enemyBulletRandom () {
    //from Left
    function fromLeft() {
        let leftSpawnBottom = Math.floor(Math.random() * 550)

        const leftBullet = document.createElement("div")
        let leftBulletLeft = 12
        gameDisplay.appendChild(leftBullet)
        leftBullet.classList.add("bullet")

        leftBullet.style.left = leftBulletLeft + "px"
        leftBullet.style.bottom = leftSpawnBottom + 170 + "px"

        function moveBulletFromLeft() {
            leftBulletLeft += 1
            leftBullet.style.left = leftBulletLeft + "px"
            
            if (leftBulletLeft === playerLeft &&
                leftSpawnBottom + 170 > playerBottom&&
                leftSpawnBottom + 170 < playerBottom + 16) {
                    gameDisplay.removeChild(leftBullet)
                    playerLife -= 1
                    player.innerHTML = playerLife
                    gameOver()
                } else if (leftBulletLeft === 550)
                    gameDisplay.removeChild(leftBullet)
                
        }
        setInterval(moveBulletFromLeft, 10)
    }
    function fromRight() {
        let leftSpawnBottom = Math.floor(Math.random() * 550)

        const rightBullet = document.createElement("div")
        let rightBulletleft = 550

        gameDisplay.appendChild(rightBullet)
        rightBullet.classList.add("bullet")

        rightBullet.style.left = rightBulletleft + "px"
        rightBullet.style.bottom = leftSpawnBottom + 170 + "px"

        function moveBulletFromRight() {
            rightBulletleft -= 1
            rightBullet.style.left = rightBulletleft + "px"

            if (rightBulletleft === playerLeft + 16 &&
                leftSpawnBottom + 170 > playerBottom &&
                leftSpawnBottom + 170 < playerBottom + 16) {
                    gameDisplay.removeChild(rightBullet)
                    playerLife -= 1
                    player.innerHTML = playerLife
                    gameOver()
                } else if (rightBulletleft === 550)
                    gameDisplay.removeChild(rightBullet)
        }
        setInterval(moveBulletFromRight, 10)
    }
    function fromUp () {
        let leftSpawnBottom = Math.floor(Math.random() * 535)
        
        const upBullet = document.createElement("div")
        let upBulletBottom = 740

        gameDisplay.appendChild(upBullet)
        upBullet.classList.add("bullet")

        upBullet.style.left = leftSpawnBottom + 12 + "px"
        upBullet.style.bottom = upBulletBottom + "px"

        function moveBulletfromUp() {
            upBulletBottom -= 1
            upBullet.style.bottom = upBulletBottom + "px"

            if (upBulletBottom === playerBottom + 16 &&
                leftSpawnBottom + 20 > playerLeft &&
                leftSpawnBottom < playerLeft + 5) {
                    gameDisplay.removeChild(upBullet)
                    playerLife -= 1
                    player.innerHTML = playerLife   
                    gameOver()
            } else if(upBulletBottom === 170)
                gameDisplay.removeChild(upBullet)
        }
        setInterval(moveBulletfromUp, 10)
    }
    fromLeft()
    fromRight()
    fromUp()
}

//game win/over
function gameOver() {
    if (playerLife === 0 || playerLife < 0 ) {      
        const gameOver = document.createElement("div")
        
        clearInterval(eBR)
        gameDisplay.appendChild(gameOver)
        gameOver.classList.add("game-over")
        gameOver.innerHTML = "GAME OVER !"
    }
}
function gameWin() {
    if (enemyLife === 0 || enemyLife < 0) {
        const gameWin = document.createElement("div")

        clearInterval(eBR)
        gameDisplay.appendChild(gameWin)
        gameWin.classList.add("game-over")
        gameWin.innerHTML = "YOU WIN !"
    }
}