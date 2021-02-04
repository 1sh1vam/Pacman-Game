const grid = document.querySelector(".grid")
const scoreCard = document.querySelector(".score")
let squares = []
let score = 0;
const width = 28;
scoreCard.textContent = score


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createBoard(){
    for(let i=0; i<layout.length; i++){
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        if(layout[i] == 0){
            squares[i].classList.add("pacdots")
        }
        else if(layout[i] == 1){
            squares[i].classList.add("wall")
        }
        else if(layout[i] == 2){
            squares[i].classList.add("ghost-lair")
        }
        else if(layout[i] == 3){
            squares[i].classList.add("power-pellet")
        }
    }
}

createBoard()

let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman")

function control(e){
    squares[pacmanCurrentIndex].classList.remove("pacman")
    console.log(e.keyCode)
    switch(e.keyCode){
        case 37:
            if(
                pacmanCurrentIndex%width !==0 &&
                !squares[pacmanCurrentIndex-1].classList.contains("wall") &&
                !squares[pacmanCurrentIndex-1].classList.contains("ghost-lair")
            )
            pacmanCurrentIndex -= 1;
            else if(pacmanCurrentIndex === 364)
                pacmanCurrentIndex = 391;
            break;

        case 38:
            if(
                pacmanCurrentIndex -width >= 0 &&
                !squares[pacmanCurrentIndex-width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex-width].classList.contains("ghost-lair")
            ) {
                pacmanCurrentIndex -= width;
            }
            break
        case 39:
            if(
                pacmanCurrentIndex %width < width-1 &&
                !squares[pacmanCurrentIndex+1].classList.contains("wall") &&
                !squares[pacmanCurrentIndex+1].classList.contains("ghost-lair")
            )
            pacmanCurrentIndex += 1;
            else if(pacmanCurrentIndex === 391)
                pacmanCurrentIndex = 364;
            break
        case 40:
            if(
                pacmanCurrentIndex+width < width*width &&
                !squares[pacmanCurrentIndex+width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex+width].classList.contains("ghost-lair")
            ){
                pacmanCurrentIndex += width
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
}
document.addEventListener('keyup', control)

function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("pacdots")){
        squares[pacmanCurrentIndex].classList.remove("pacdots")
        score++
        scoreCard.textContent = score;
    }
}

function powerPelletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        score += 50;
        scoreCard.textContent = score;
        ghosts.forEach(ghost=>ghost.isScared=true)
        setTimeout(unScareGhosts, 10000)
    }
}

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.currentIndex = startIndex
        this.speed = speed
        this.isScared = false
        this.timerId = NaN
    }
}

function unScareGhosts(){
    ghosts.forEach(ghost=>ghost.isScared=false)
}
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]
ghosts.forEach(ghost=>{
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add("ghost")
})

ghosts.forEach(ghost=>moveGhost(ghost))

function moveGhost(ghost){
    const directions = [+1, -1, +width, -width]
    let direction = directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId = setInterval(function(){
        console.log(direction);
        if(
            !squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ){
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        }
        else{
            direction = directions[Math.floor(Math.random()*directions.length)]
        }
        
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add("scared-ghost");
        }

        if(
            ghost.isScared &&
            squares[ghost.currentIndex].classList.contains("pacman")
        ){
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            scoreCard.textContent = score;
        }
        checkForGameOver()
    }, ghost.speed)

}

function checkForGameOver(){
    if(
        squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ){
        ghosts.forEach(ghost=>clearInterval(ghost.timerId))
        document.removeEventListener("keyup", control)
        document.getElementById("score-heading").textContent = "You LOST!!!!"
    }
}

function checkForWin(){
    if(score>=450){
        ghosts.forEach(ghost=>clearInterval(ghost.timerId))
        document.removeEventListener("keyup", control)
        document.getElementById("score-heading").textContent = "You WON!!!!"
    }
}